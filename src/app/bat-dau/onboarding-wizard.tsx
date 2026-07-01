"use client";

import { useState } from "react";
import { LetterCardBody } from "@/app/letter-stack";
import type { Letter } from "@/data/letters";

const AGES = [6, 7, 8, 9, 10, 11];
const RELATIONSHIPS = ["Ba", "Mẹ"] as const;
const INTEREST_PRESETS = [
  "Vẽ & manga",
  "Đọc truyện",
  "Khoa học",
  "Thể thao",
  "Âm nhạc",
  "Động vật",
  "Xếp hình/Lego",
  "Nấu ăn",
];

type FormState = {
  relationship: (typeof RELATIONSHIPS)[number];
  childName: string;
  childAge: number | null;
  interests: string[];
  interestsOther: string;
  parentEmail: string;
};

const STEP_TITLES = [
  "Con của bạn tên gì?",
  "Con thích điều gì nhất?",
  "Đây là một lá thư ba/mẹ có thể gửi",
  "Bắt đầu gửi mỗi tối",
];

// Ghép danh sách sở thích đã chọn thành 1 câu tự nhiên để chèn vào thư mẫu.
function joinInterests(list: string[]) {
  if (list.length === 0) return "những điều con thích khám phá mỗi ngày";
  if (list.length === 1) return list[0].toLowerCase();
  return `${list.slice(0, -1).join(", ").toLowerCase()} và ${list[list.length - 1].toLowerCase()}`;
}

// Thư mẫu ở bước preview là TEMPLATE TĨNH (chèn tên/tuổi/sở thích vừa nhập),
// KHÔNG gọi OpenAI thật — tránh chi phí + độ trễ cho mỗi khách ghé onboarding.
// Nội dung AI thật chỉ bắt đầu sau khi đăng ký, qua /api/send-daily.
function buildPreviewLetter(form: FormState): Letter {
  const name = form.childName.trim() || "con";
  const interestsLine = joinInterests(form.interests);

  return {
    id: "preview",
    sender: form.relationship,
    childName: name,
    childMeta: form.childAge ? `${form.childAge} tuổi` : "​",
    dayLabel: "Hôm nay",
    time: "19:00",
    category: "explore",
    body: `${name} ơi, ${form.relationship.toLowerCase()} biết con thích ${interestsLine}, nên tối nay ${form.relationship.toLowerCase()} muốn kể con nghe một điều nho nhỏ liên quan tới nó. Mỗi tối, ${form.relationship.toLowerCase()} sẽ viết cho con một lá thư như thế này — chỉ riêng cho con thôi, không giống ai khác. Ngủ ngon nhé, mai ${form.relationship.toLowerCase()} lại kể tiếp.`,
  };
}

function StepDots({ step, total }: { step: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === step ? "w-5 bg-coral-600" : "w-1.5 bg-coral-200"
          }`}
        />
      ))}
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-coral-900 px-6 text-[13px] font-medium text-cream-50 shadow-[0_10px_25px_-10px_rgba(74,27,12,0.7)] transition-all hover:-translate-y-0.5 hover:bg-coral-800 disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none disabled:hover:translate-y-0 sm:h-12 sm:px-7 sm:text-sm"
    >
      {children}
      <span aria-hidden="true">→</span>
    </button>
  );
}

function BackLink({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-1 text-xs text-coral-800/55 transition-colors hover:text-coral-800/80"
    >
      ← Quay lại
    </button>
  );
}

// Input text dùng chung cho các bước nhập liệu — pattern mới, xem
// brainstorming/design-system.md mục 5 "Input text".
function TextField({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block w-full text-left">
      <span className="mb-1.5 block text-xs font-medium text-coral-800/70">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-2xl border border-coral-900/10 bg-white px-4 py-3 font-sans text-[15px] text-coral-900 placeholder:text-coral-800/35 focus:outline-none focus:ring-2 focus:ring-coral-400"
      />
    </label>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-4 py-2 text-[13px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-400 ${
        active
          ? "bg-coral-900 text-cream-50"
          : "bg-white text-coral-800/70 ring-1 ring-coral-900/10 hover:bg-coral-50"
      }`}
    >
      {children}
    </button>
  );
}

export function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>({
    relationship: "Ba",
    childName: "",
    childAge: null,
    interests: [],
    interestsOther: "",
    parentEmail: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = STEP_TITLES.length;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function toggleInterest(item: string) {
    setForm((f) => ({
      ...f,
      interests: f.interests.includes(item)
        ? f.interests.filter((i) => i !== item)
        : [...f.interests, item],
    }));
  }

  const canGoStep1 = form.childName.trim().length > 0 && form.childAge !== null;
  const canGoStep2 = form.interests.length > 0 || form.interestsOther.trim().length > 0;

  function goNext() {
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  }
  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  // Nối API tạo user/child + kích hoạt magic-link ở đây khi tới Phase "nối dữ liệu"
  // (xem brainstorming/master-plan.md). Hiện tại chỉ là trạng thái UI.
  function handleSubmit() {
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="relative flex w-full max-w-sm flex-col items-center text-center">
        <p className="font-serif text-xl font-semibold leading-[1.3] text-coral-900 sm:text-2xl">
          Cảm ơn {form.relationship.toLowerCase()}!
        </p>
        <p className="mt-3 text-[13.5px] leading-relaxed text-coral-800/80 sm:text-[15px]">
          Kiểm tra hộp thư <span className="font-medium text-coral-900">{form.parentEmail}</span> để
          xác nhận — tối nay {form.childName || "con"} sẽ nhận lá thư đầu tiên.
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex w-full max-w-sm flex-col items-center text-center">
      <StepDots step={step} total={totalSteps} />

      <h1 className="mt-4 font-serif text-xl font-semibold leading-[1.3] text-coral-900 sm:mt-6 sm:text-[1.9rem]">
        {STEP_TITLES[step]}
      </h1>

      {/* Bước 1 — tên, tuổi, quan hệ */}
      {step === 0 && (
        <div className="mt-7 flex w-full flex-col items-center gap-5 sm:mt-9">
          <TextField
            label="Tên con"
            placeholder="Ví dụ: Suti"
            value={form.childName}
            onChange={(e) => update("childName", e.target.value)}
            autoFocus
          />

          <div className="w-full text-left">
            <span className="mb-1.5 block text-xs font-medium text-coral-800/70">
              Con mấy tuổi?
            </span>
            <div className="flex flex-wrap gap-2">
              {AGES.map((age) => (
                <Chip key={age} active={form.childAge === age} onClick={() => update("childAge", age)}>
                  {age} tuổi
                </Chip>
              ))}
            </div>
          </div>

          <div className="w-full text-left">
            <span className="mb-1.5 block text-xs font-medium text-coral-800/70">
              Bạn là
            </span>
            <div className="flex gap-2">
              {RELATIONSHIPS.map((r) => (
                <Chip key={r} active={form.relationship === r} onClick={() => update("relationship", r)}>
                  {r}
                </Chip>
              ))}
            </div>
          </div>

          <PrimaryButton onClick={goNext} disabled={!canGoStep1}>
            Tiếp tục
          </PrimaryButton>
        </div>
      )}

      {/* Bước 2 — sở thích */}
      {step === 1 && (
        <div className="mt-7 flex w-full flex-col items-center gap-5 sm:mt-9">
          <div className="flex flex-wrap justify-center gap-2">
            {INTEREST_PRESETS.map((item) => (
              <Chip key={item} active={form.interests.includes(item)} onClick={() => toggleInterest(item)}>
                {item}
              </Chip>
            ))}
          </div>
          <TextField
            label="Sở thích khác (không bắt buộc)"
            placeholder="Ví dụ: đọc Doraemon, chơi với mèo..."
            value={form.interestsOther}
            onChange={(e) => update("interestsOther", e.target.value)}
          />

          <BackLink onClick={goBack} />
          <PrimaryButton onClick={goNext} disabled={!canGoStep2}>
            Xem thử một lá thư
          </PrimaryButton>
        </div>
      )}

      {/* Bước 3 — preview lá thư cá nhân hoá (template tĩnh, không gọi AI) */}
      {step === 2 && (
        <div className="mt-7 flex w-full flex-col items-center sm:mt-9">
          <div className="w-full rounded-2xl bg-white p-5 text-left shadow-[0_20px_50px_-20px_rgba(120,50,20,0.4)] ring-1 ring-coral-900/5 sm:p-7">
            <LetterCardBody letter={buildPreviewLetter(form)} />
          </div>

          <BackLink onClick={goBack} />
          <PrimaryButton onClick={goNext}>
            Đúng vậy, bắt đầu thôi
          </PrimaryButton>
        </div>
      )}

      {/* Bước 4 — đăng ký bằng email */}
      {step === 3 && (
        <div className="mt-7 flex w-full flex-col items-center gap-5 sm:mt-9">
          <TextField
            label="Email của bạn"
            type="email"
            placeholder="ban@vidu.com"
            value={form.parentEmail}
            onChange={(e) => update("parentEmail", e.target.value)}
            autoFocus
          />
          <p className="text-[11px] leading-relaxed text-coral-800/55">
            ConOi không bán hay dùng dữ liệu của con bạn cho mục đích khác.
          </p>

          <BackLink onClick={goBack} />
          <PrimaryButton
            onClick={handleSubmit}
            disabled={!form.parentEmail.includes("@")}
          >
            Gửi lá thư đầu tiên cho {form.childName || "con"}
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}
