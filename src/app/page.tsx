import { LetterStack } from "./letter-stack";
import { landingLetters } from "@/data/letters";

export default function Home() {
  return (
    <main className="relative flex flex-1 items-center justify-center overflow-hidden bg-[radial-gradient(120%_120%_at_50%_0%,#fdf6f1_0%,#f9e8e0_55%,#f3d6c8_100%)] px-6 py-20">
      {/* Vầng sáng ấm phía sau, gợi nắng sớm */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,224,196,0.55)_0%,rgba(255,224,196,0)_70%)] blur-2xl"
      />

      <div className="relative flex w-full max-w-xl flex-col items-center text-center">
        {/* Wordmark */}
        <div className="mb-9 flex items-center gap-2 text-coral-800">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2.5" />
            <path d="m3.5 6.5 8.5 6 8.5-6" />
          </svg>
          <span className="text-sm font-medium tracking-wide">conoi.app</span>
        </div>

        {/* Headline */}
        <h1 className="max-w-md font-serif text-[2.1rem] font-semibold leading-[1.25] text-coral-900 sm:text-[2.6rem]">
          Con ơi, hôm nay
          <br />
          ba có chuyện muốn kể
        </h1>

        {/* Câu giải thích duy nhất */}
        <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-coral-800/80">
          Mỗi sáng, con bạn nhận một lá thư viết riêng cho con — bằng đúng
          giọng văn của ba hoặc mẹ, không phải một bản tin gửi cho hàng nghìn
          đứa trẻ khác.
        </p>

        {/* Lá thư — trung tâm thị giác, lật/vuốt được */}
        <LetterStack letters={landingLetters} />

        {/* CTA */}
        <a
          href="#bat-dau"
          className="mt-14 inline-flex h-12 items-center gap-2 rounded-full bg-coral-900 px-7 text-sm font-medium text-cream-50 shadow-[0_10px_25px_-10px_rgba(74,27,12,0.7)] transition-all hover:-translate-y-0.5 hover:bg-coral-800"
        >
          Bắt đầu gửi cho con
          <span aria-hidden="true">→</span>
        </a>
        <p className="mt-4 text-xs text-coral-800/55">
          Miễn phí cho 1 con · Thiết lập trong 2 phút
        </p>
      </div>
    </main>
  );
}
