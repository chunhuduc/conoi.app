"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { categoryLabel, type Letter } from "@/data/letters";

type Dir = "left" | "right";

interface Card {
  uid: number;
  letter: Letter;
  tilt: number; // góc nghiêng ngẫu nhiên, gắn khi lá vào chồng, giữ tới khi bị lật đi
  enter?: boolean; // true ngay khi mới được nạp → để chạy hiệu ứng xuất hiện
  exiting?: Dir; // hướng đang bay ra
}

// Làm tròn 3 chữ số thập phân cho MỌI số đưa vào transform. Float dài kiểu
// 0.9249999999999999 khi in ra inline-style sẽ bị trình duyệt chuẩn hoá lại
// (→ 0.925) lúc parse HTML SSR, khiến giá trị client (đầy đủ) lệch với DOM đã
// chuẩn hoá → hydration mismatch. Chuỗi ngắn như "0.925" thì round-trip y hệt.
const snap = (n: number) => Math.round(n * 1000) / 1000;

const VISIBLE = 3; // luôn render sẵn 3 lá
const LEAVE_MS = 420; // thời gian lá trên cùng bay ra
const RESIZE_MS = 360; // thời gian container co giãn theo nội dung mới
const SWIPE_THRESHOLD = 70; // px vuốt tối thiểu để tính là "lật"

interface LetterStackProps {
  letters: Letter[];
  // Dãy chấm chỉ báo "đang xem lá thứ mấy". Pattern đẹp, để dành dùng ở chỗ
  // khác (ví dụ trang xem lại toàn bộ thư) — landing page hiện không cần.
  showIndicator?: boolean;
}

export function LetterStack({
  letters,
  showIndicator = false,
}: LetterStackProps) {
  // Con trỏ "ưu tiên" trong nguồn thư. Hiện tại chỉ cuộn vòng theo thứ tự mảng;
  // sau này thay bằng nguồn chọn lọc từ DB mà không phải đổi phần render.
  const cursor = useRef(0);
  const uidSeq = useRef(0);

  // Góc nghiêng "ngẫu nhiên" nhưng TẤT ĐỊNH theo uid (hàm thuần) — server và
  // client render ra CÙNG giá trị nên không bị hydration mismatch. Chỉ dùng
  // phép nguyên/bitwise (Math.imul, dịch bit, +,-,*,/): các phép này bit-identical
  // mọi nền tảng theo IEEE 754. KHÔNG dùng Math.sin/cos/… vì hàm siêu việt có thể
  // lệch 1 ULP giữa Node (server) và V8 trình duyệt (client) → gây mismatch.
  function tiltFromSeed(seed: number) {
    let x = seed + 1;
    x = Math.imul(x, 2654435761);
    x ^= x >>> 15;
    x = Math.imul(x, 2246822519);
    x ^= x >>> 13;
    const frac = (x >>> 0) % 1000; // 0 … 999
    const mag = 1.4 + (frac / 1000) * 1.9; // 1.4° … 3.3°
    return snap(seed % 2 === 0 ? -mag : mag);
  }
  function makeCard(): Card {
    const letter = letters[cursor.current % letters.length];
    cursor.current += 1;
    const uid = uidSeq.current++;
    return { uid, letter, tilt: tiltFromSeed(uid), enter: true };
  }

  const [cards, setCards] = useState<Card[]>(() =>
    Array.from({ length: VISIBLE }, makeCard)
  );
  const [dragX, setDragX] = useState<number | null>(null); // null = không kéo
  const [hintX, setHintX] = useState(0); // dao động nhẹ khi idle để gợi ý vuốt
  const [interacted, setInteracted] = useState(false);
  const [containerH, setContainerH] = useState<number>();

  const phase = useRef<"idle" | "leaving">("idle");
  const drag = useRef({ startX: 0, x: 0, active: false, moved: false });
  const cardEls = useRef(new Map<number, HTMLDivElement>());
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  }, []);

  // Bỏ cờ `enter` ở frame kế tiếp → lá mới chuyển từ trạng thái "xuất hiện" về vị trí thật
  useEffect(() => {
    if (!cards.some((c) => c.enter)) return;
    const r = requestAnimationFrame(() =>
      setCards((cs) => cs.map((c) => (c.enter ? { ...c, enter: false } : c)))
    );
    return () => cancelAnimationFrame(r);
  }, [cards]);

  // Căn container vừa với lá trên cùng (lá đầu tiên không-đang-bay-ra)
  useLayoutEffect(() => {
    const top = cards.find((c) => !c.exiting);
    const el = top && cardEls.current.get(top.uid);
    if (el) setContainerH(el.offsetHeight);
  }, [cards]);

  // Idle hint: lá trên cùng khẽ nhích sang trái rồi về, báo có thể vuốt
  useEffect(() => {
    if (interacted || reduceMotion.current) return;
    let alive = true;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const nudge = () => {
      if (!alive || phase.current !== "idle") return;
      setHintX(-10);
      timers.push(
        setTimeout(() => {
          if (!alive) return;
          setHintX(0);
          timers.push(setTimeout(nudge, 3200));
        }, 620)
      );
    };
    timers.push(setTimeout(nudge, 1500));
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, [interacted]);

  function discard(dir: Dir) {
    if (phase.current !== "idle") return;
    phase.current = "leaving";
    setInteracted(true);
    setHintX(0);
    // Tạo lá mới NGAY ĐÂY (một lần) — không gọi makeCard() bên trong updater,
    // vì updater bị React StrictMode gọi 2 lần (dev) sẽ nuốt mất thư trong nguồn.
    const fresh = makeCard();
    // Đánh dấu lá trên cùng đang bay ra + nạp ngay lá mới ở đáy chồng
    setCards((cs) => {
      const [top, ...rest] = cs;
      return [{ ...top, exiting: dir }, ...rest, fresh];
    });
    setTimeout(
      () => {
        setCards((cs) => cs.filter((c) => !c.exiting));
        phase.current = "idle";
      },
      reduceMotion.current ? 240 : LEAVE_MS
    );
  }

  function onPointerDown(e: React.PointerEvent) {
    if (phase.current !== "idle") return;
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
    drag.current = { startX: e.clientX, x: 0, active: true, moved: false };
    setInteracted(true);
    setDragX(0);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    drag.current.x = dx;
    setDragX(dx);
  }
  function onPointerUp() {
    if (!drag.current.active) return;
    drag.current.active = false;
    const dx = drag.current.x;
    setDragX(null); // bỏ trạng thái kéo → nếu không lật, lá tự trượt về (transition)
    if (!drag.current.moved) discard("left"); // chạm/click → mặc định bay trái
    else if (dx <= -SWIPE_THRESHOLD) discard("left");
    else if (dx >= SWIPE_THRESHOLD) discard("right");
  }
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      discard("right");
    } else if (
      e.key === "ArrowLeft" ||
      e.key === "Enter" ||
      e.key === " "
    ) {
      e.preventDefault();
      discard("left");
    }
  }

  const dragging = dragX !== null;
  const moveTransition =
    "transform 380ms cubic-bezier(0.34,1.2,0.64,1), opacity 380ms ease";
  const leaveTransition = reduceMotion.current
    ? "opacity 240ms ease"
    : `transform ${LEAVE_MS}ms cubic-bezier(0.45,0,0.7,0.2), opacity ${LEAVE_MS}ms ease`;

  function styleFor(card: Card, slot: number): React.CSSProperties {
    if (card.exiting) {
      const off = card.exiting === "left" ? -135 : 135;
      const rot = card.exiting === "left" ? -18 : 18;
      return {
        zIndex: 60,
        opacity: 0,
        transform: `translateX(${off}%) rotate(${rot}deg)`,
        transition: leaveTransition,
      };
    }
    const z = 40 - slot * 10;
    if (slot === 0) {
      if (dragging) {
        const dx = dragX ?? 0;
        return {
          zIndex: z,
          opacity: Math.max(0.45, 1 - Math.abs(dx) / 440),
          transform: `translateX(${dx}px) rotate(${snap(card.tilt + dx * 0.03)}deg)`,
          transition: "none",
        };
      }
      if (card.enter) {
        return {
          zIndex: z,
          opacity: 0,
          transform: `translateY(14px) scale(0.97) rotate(${card.tilt}deg)`,
          transition: moveTransition,
        };
      }
      return {
        zIndex: z,
        opacity: 1,
        transform: `translateX(${hintX}px) rotate(${card.tilt}deg)`,
        transition: moveTransition,
      };
    }
    // Các lá phía sau: lùi xuống + thu nhỏ để ló ra như một chồng thư
    const ty = slot * 10 + (card.enter ? 16 : 0);
    const sc = snap(1 - slot * 0.045 - (card.enter ? 0.03 : 0));
    return {
      zIndex: z,
      opacity: card.enter ? 0 : 1,
      transform: `translateY(${ty}px) scale(${sc}) rotate(${card.tilt}deg)`,
      transition: moveTransition,
    };
  }

  const topLetterId = cards.find((c) => !c.exiting)?.letter.id;
  const activeIndex = letters.findIndex((l) => l.id === topLetterId);

  let slot = 0;
  return (
    <div className="mt-12 w-full max-w-sm">
      <div
        role="button"
        tabIndex={0}
        aria-label="Lá thư mẫu. Vuốt trái/phải hoặc dùng phím mũi tên để đọc lá thư khác."
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onKeyDown={onKeyDown}
        style={{
          height: containerH,
          transition: `height ${RESIZE_MS}ms cubic-bezier(0.4,0,0.2,1)`,
        }}
        className="relative w-full cursor-pointer touch-pan-y select-none outline-none [perspective:1400px] focus-visible:rounded-2xl focus-visible:ring-2 focus-visible:ring-coral-400"
      >
        {cards.map((card) => {
          const s = card.exiting ? -1 : slot++;
          return (
            <div
              key={card.uid}
              ref={(el) => {
                if (el) cardEls.current.set(card.uid, el);
                else cardEls.current.delete(card.uid);
              }}
              aria-hidden={s !== 0}
              style={{
                ...styleFor(card, s),
                transformOrigin: "center bottom",
                willChange: "transform, opacity",
              }}
              className="absolute inset-x-0 top-0 rounded-2xl bg-white p-7 text-left shadow-[0_20px_50px_-20px_rgba(120,50,20,0.4)] ring-1 ring-coral-900/5"
            >
              <div className="mb-4 flex items-center justify-between border-b border-coral-900/8 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-coral-50 text-sm font-medium text-coral-600">
                    {card.letter.sender.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-coral-900">
                      {card.letter.sender} gửi {card.letter.childName}
                    </p>
                    <p className="text-xs text-coral-800/50">
                      {card.letter.childMeta}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-coral-50 px-3 py-1.5 text-coral-600">
                  <span className="text-[10px] font-medium uppercase tracking-wide">
                    {card.letter.dayLabel}
                  </span>
                  <span className="text-base font-semibold leading-none">
                    {card.letter.time}
                  </span>
                </div>
              </div>

              <p className="mb-3 text-[11px] font-medium uppercase tracking-wide text-coral-400">
                {categoryLabel[card.letter.category]}
              </p>

              <p className="font-serif text-[15px] leading-loose text-coral-900/90">
                {card.letter.body}
              </p>

              <p className="mt-5 font-script text-2xl leading-none text-coral-600">
                — {card.letter.sender}
              </p>
            </div>
          );
        })}
      </div>

      {/* Gợi ý thao tác (+ chỉ báo lá đang xem, ẩn mặc định — xem prop showIndicator) */}
      <div className="mt-6 flex flex-col items-center gap-3">
        {showIndicator && (
          <div className="flex items-center gap-1.5">
            {letters.map((l, i) => (
              <span
                key={l.id}
                aria-hidden="true"
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-5 bg-coral-600" : "w-1.5 bg-coral-200"
                }`}
              />
            ))}
          </div>
        )}
        <p
          className={`flex items-center gap-1.5 text-xs text-coral-800/55 transition-opacity duration-500 ${
            interacted ? "opacity-0" : "letter-hint-pulse opacity-100"
          }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 11V6a2 2 0 0 1 4 0v5" />
            <path d="M13 7a2 2 0 0 1 4 0v6a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-3l-2-3a1.5 1.5 0 0 1 2.5-1.6L7 13" />
          </svg>
          Vuốt hoặc chạm để đọc thư khác
        </p>
      </div>
    </div>
  );
}
