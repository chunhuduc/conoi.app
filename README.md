# ConOi

App gửi email hàng ngày từ cha mẹ đến con cái, nội dung cá nhân hoá theo tên, độ tuổi, sở thích của con (vẽ manga, đọc truyện, kỹ năng sống, học tập, khám phá thế giới).

## Trạng thái hiện tại

🟡 Giai đoạn brainstorm + proof-of-concept. Chưa có code production (Next.js) trong repo này. Repo này hiện chứa:

- `CLAUDE.md` — context để Claude Code đọc khi mở project
- `brainstorming/` — toàn bộ tài liệu định hướng sản phẩm, branding, tech decisions
- `scripts/legacy-google-apps-script/` — bản thử nghiệm đầu tiên (Google Apps Script), đã test thực tế, dùng làm tham khảo logic khi port sang Next.js

## Tech stack dự kiến

Next.js (Vercel) + Neon (Postgres) + OpenAI API (gpt-4o-mini)

## Cách bắt đầu code

1. Đọc `CLAUDE.md` để nắm context tổng quan
2. Đọc các file trong `brainstorming/` theo thứ tự: `product-vision.md` → `mvp-scope.md` → `branding.md` → `content-tone-guide.md` → `tech-decisions.md`
3. Tham khảo logic cũ tại `scripts/legacy-google-apps-script/suti_daily_email.gs` trước khi viết Next.js API routes tương đương

## Lưu ý bảo mật

Các script trong `scripts/legacy-google-apps-script/` chỉ chứa placeholder cho API key (`YOUR_OPENAI_API_KEY_HERE`), không chứa key thật. Khi setup `.env.local` cho Next.js, KHÔNG commit file đó lên git (đã có trong `.gitignore`).
