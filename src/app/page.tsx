import { LetterStack } from "./letter-stack";
import { landingLetters } from "@/data/letters";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center bg-[radial-gradient(120%_120%_at_50%_0%,#fdf6f1_0%,#f9e8e0_55%,#f3d6c8_100%)] px-6 py-4 sm:py-20">
      {/* Vầng sáng ấm phía sau, gợi nắng sớm */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,224,196,0.55)_0%,rgba(255,224,196,0)_70%)] blur-2xl"
      />

      <div className="relative flex w-full max-w-sm flex-col items-center text-center">
        {/* Headline */}
        <h1 className="font-serif text-[1.75rem] font-semibold leading-[1.25] text-coral-900 sm:text-[2.6rem]">
          Con ơi, hôm nay
          <br />
          ba có chuyện muốn kể
        </h1>

        {/* Câu giải thích duy nhất */}
        <p className="mt-4 text-[14px] leading-relaxed text-coral-800/80 sm:text-[15px] sm:mt-5">
          Mỗi sáng, con bạn nhận một lá thư viết riêng cho con — bằng đúng
          giọng văn của ba hoặc mẹ, không phải một bản tin gửi cho hàng nghìn
          đứa trẻ khác.
        </p>

        {/* Lá thư — trung tâm thị giác, lật/vuốt được */}
        <div className="mt-6 w-full overflow-hidden sm:mt-8">
          <LetterStack letters={landingLetters} />
        </div>

        {/* CTA */}
        <a
          href="#bat-dau"
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-coral-900 px-6 text-sm font-medium text-cream-50 shadow-[0_10px_25px_-10px_rgba(74,27,12,0.7)] transition-all hover:-translate-y-0.5 hover:bg-coral-800 sm:mt-10 sm:h-12 sm:px-7"
        >
          Bắt đầu gửi cho con
          <span aria-hidden="true">→</span>
        </a>
        <p className="mt-3 text-[11px] text-coral-800/55 sm:mt-4 sm:text-xs">
          Miễn phí cho 1 con · Thiết lập trong 2 phút
        </p>
      </div>
    </main>
  );
}
