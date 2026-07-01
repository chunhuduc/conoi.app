import { OnboardingWizard } from "./onboarding-wizard";

export default function BatDauPage() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center bg-[radial-gradient(120%_120%_at_50%_0%,#fdf6f1_0%,#f9e8e0_55%,#f3d6c8_100%)] px-6 pt-10 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,224,196,0.55)_0%,rgba(255,224,196,0)_70%)] blur-2xl"
      />
      <OnboardingWizard />
    </main>
  );
}
