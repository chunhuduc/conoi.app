# ConOi

App gửi email hàng ngày từ cha mẹ đến con cái, nội dung cá nhân hoá theo tên, độ tuổi, sở thích của con (vẽ manga, đọc truyện, kỹ năng sống, học tập, khám phá thế giới).

<!-- chunhuduc.com:showcase:start -->
```yaml
summary: "ConOi personalizes a daily 'letter' from parent to child, matched to the child's name, age, and interests, and delivers it however the family reads: email today, with a printed A4 letter mailed to the door as the primary long-term channel. Families onboard in a guided wizard, then an AI content engine rotates topics and resources so no letter repeats, writing and sending on a daily schedule without a human in the loop."
tags: [Next.js, Neon, Drizzle, OpenAI, Resend]
outcome: "AI writer that never repeats a topic or resource, running on a daily schedule from one family to many"
complexityScore: 7
motif: { from: "#f59e0b", to: "#ec4899", icon: creator }
architecture:
  from: "#f59e0b"
  to: "#ec4899"
  nodes:
    - { id: onboarding, label: "Family onboarding", x: 18, y: 15, kind: primary }
    - { id: cron, label: "Daily cron", x: 55, y: 15, kind: default }
    - { id: db, label: "Neon (families, topics, logs)", x: 18, y: 55, kind: store }
    - { id: ai, label: "OpenAI content engine", x: 55, y: 55, kind: default }
    - { id: email, label: "Resend email", x: 88, y: 38, kind: default }
    - { id: print, label: "Print + mail fulfillment", x: 88, y: 72, kind: store }
  edges:
    - { from: onboarding, to: db, flow: true }
    - { from: cron, to: db, flow: true }
    - { from: db, to: ai, flow: true }
    - { from: ai, to: email, flow: true }
    - { from: ai, to: print, flow: true, curve: 4 }
    - { from: email, to: db, curve: -6 }
```
<!-- chunhuduc.com:showcase:end -->

## Trạng thái hiện tại

🟡 Landing page tĩnh đầu tiên (Next.js + Tailwind) đã có trong `src/app/`. Backend (onboarding, cron gửi email, Neon) chưa làm. Repo này hiện chứa:

- `CLAUDE.md` — context để Claude Code đọc khi mở project
- `brainstorming/` — toàn bộ tài liệu định hướng sản phẩm, branding, tech decisions, nghiên cứu đối thủ
- `src/app/` — landing page Next.js (App Router + Tailwind)
- `scripts/legacy-google-apps-script/` — bản thử nghiệm đầu tiên (Google Apps Script), đã test thực tế, dùng làm tham khảo logic khi port sang Next.js

## Tech stack dự kiến

Next.js (Vercel) + Neon (Postgres) + OpenAI API (gpt-4o-mini)

## Cách bắt đầu code

1. Đọc `CLAUDE.md` để nắm context tổng quan
2. Đọc các file trong `brainstorming/` theo thứ tự: `product-vision.md` → `mvp-scope.md` → `branding.md` → `content-tone-guide.md` → `tech-decisions.md`
3. Tham khảo logic cũ tại `scripts/legacy-google-apps-script/suti_daily_email.gs` trước khi viết Next.js API routes tương đương

## Lưu ý bảo mật

Các script trong `scripts/legacy-google-apps-script/` chỉ chứa placeholder cho API key (`YOUR_OPENAI_API_KEY_HERE`), không chứa key thật. Khi setup `.env.local` cho Next.js, KHÔNG commit file đó lên git (đã có trong `.gitignore`).
