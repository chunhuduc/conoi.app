# Master Plan — ConOi

> Nhìn file này 1 lần là biết: đã làm gì, đang ở đâu, tiếp theo làm gì, và bức tranh tổng thể dẫn tới đâu. Cập nhật liên tục (tick checkbox, đổi trạng thái phase). Đây KHÔNG phải file quyết định phạm vi — nếu phạm vi đổi, sửa `mvp-scope.md`/`tech-decisions.md` trước rồi mới cập nhật lại đây.

## Bức tranh tổng thể

ConOi là app gửi "lá thư" cá nhân hoá hàng ngày từ cha mẹ đến con, khởi đầu từ nhu cầu cá nhân (gửi cho Suti), mục tiêu dài hạn thương mại hoá cho nhiều phụ huynh. **Kênh chính dài hạn là in ấn A4 + gửi bưu điện** — MVP hiện tại dùng email để chạy thử vòng lặp cá nhân hoá + AI content trước khi đầu tư vào in ấn. Chi tiết: `product-vision.md`.

## Lộ trình & trạng thái

| # | Phase | Trạng thái |
|---|---|---|
| 0 | Brainstorm & quyết định nền tảng (product vision, tech stack, design system, kiến trúc admin) | ✅ Xong |
| 1 | **MVP — Landing page** (branding, value proposition) | ✅ Xong |
| 2 | **MVP — Onboarding flow** (nhập info con → đăng ký cuối) | ⬜ Chưa bắt đầu |
| 3 | **MVP — Dashboard tối giản** | ⬜ Chưa bắt đầu |
| 4 | **MVP — Backend cron** (sinh nội dung AI + gửi email hàng ngày) | 🟡 Đang làm — làm trước Phase 2/3 (xem ghi chú dưới) |
| 5 | Admin/founder app + tách monorepo | ⬜ Chưa bắt đầu, chỉ làm khi thật sự cần code admin |
| 6 | Kênh in ấn + gửi bưu điện (kênh chính dài hạn) | 💭 Ý tưởng, chưa thiết kế kỹ thuật |
| 7 | Taxonomy mở rộng + cá nhân hoá đa category | 💭 Ý tưởng (`content-taxonomy-and-personalization.md`) |
| 8 | Viết tay thủ công + học giọng văn riêng | 💭 Ý tưởng (`manual-writing-and-voice.md`) |

Phase 1-4 = phạm vi MVP đã chốt (`mvp-scope.md`). Phase 5-8 = sau MVP, thứ tự ưu tiên giữa chúng chưa quyết định.

**Đổi thứ tự tạm thời (2026-07-01)**: làm Phase 4 (backend cron) trước Phase 2/3, để validate core feature (chất lượng nội dung AI + gửi email thật) cho đúng mục đích ban đầu — gửi Suti mỗi tối — trước khi đầu tư vào UI onboarding/dashboard cho nhiều user. Vì vậy Phase 4 hiện **chưa dùng bảng `users`/`children`** như schema đã phác trong `tech-decisions.md`, mà hardcode cấu hình 1 user trong `src/lib/config.ts` (đúng tinh thần "seed cứng cho 1 user là chủ dự án trước" đã ghi trong `mvp-scope.md`). Bảng `users`/`children` thật sẽ làm khi tới Phase 2 (onboarding).

## Đã xong

- [x] Next.js scaffold + Tailwind
- [x] Landing: component "letter-stack" + data thư mẫu (`src/app/letter-stack.tsx`, `src/data/letters.ts`)
- [x] Brainstorm + quyết định kiến trúc admin/founder (`tech-decisions.md`)
- [x] **Phase 1 — Landing page chốt xong**: 1 màn hình Hero (headline + lá thư mẫu trung tâm + CTA), KHÔNG làm thêm section 2-6 đã phác thảo ban đầu. Xem "Cấu trúc landing page đã chốt" trong `competitor-research.md`

## Đã xong (thêm — Phase 4, luồng validate cá nhân)

- [x] Schema Drizzle: `topics`, `email_logs` (`src/lib/db/schema.ts`) — chưa có `users`/`children`, xem ghi chú đổi thứ tự ở trên
- [x] Seed data: 35 topic port nguyên từ `scripts/legacy-google-apps-script/suti_daily_email.gs` (`src/lib/db/seed-data.ts`, `src/lib/db/seed.ts`)
- [x] Category styles + tone guide port sang TS (`src/lib/content/category-styles.ts`)
- [x] Logic sinh nội dung OpenAI port nguyên prompt cũ (`src/lib/content/generate.ts`)
- [x] Email template HTML port nguyên (`src/lib/email/template.ts`)
- [x] API route `/api/send-daily` — chọn topic theo rotation, tránh trùng resource, gọi OpenAI, gửi qua Resend, ghi `email_logs`
- [x] `vercel.json` cron 19h GMT+7 (12:00 UTC) hàng ngày trỏ vào `/api/send-daily`
- [x] `.env.local` khung sẵn (cần điền key thật)

## Đang làm / tiếp theo (backlog chi tiết)

- [ ] **1 · Cần user điền key** — Tạo Neon project + Resend account, điền `DATABASE_URL`/`OPENAI_API_KEY`/`RESEND_API_KEY` vào `.env.local` (xem comment trong file)
- [ ] **2 · Chạy DB lần đầu** — `npm run db:push` (tạo bảng) rồi `npm run db:seed` (seed 35 topic)
- [ ] **3 · Test local** — chạy `npm run dev`, gọi `http://localhost:3000/api/send-daily`, kiểm tra email nhận được + chất lượng nội dung AI
- [ ] **4 · Deploy validate thật** — deploy Vercel, set `CRON_SECRET` + các env var trên Vercel dashboard, xác nhận cron 19h chạy đúng 1-2 ngày liên tiếp (không trùng resource, rotation đúng)
- [ ] **5 · Sau khi validate ổn** — quay lại Phase 2: chốt Auth + email login (Auth.js/Resend magic-link), thêm bảng `users`/`children` thật, chuyển từ hardcode `config.ts` sang dữ liệu từ onboarding

## Sau MVP (chưa cần chi tiết hoá)

- [ ] Phase 3 — Dashboard tối giản (xem/sửa thông tin đã đăng ký)
- [ ] Phase 5 — Tách monorepo `apps/web` + `apps/admin` (xem "Kiến trúc admin/founder" trong `tech-decisions.md`)

## Tham khảo khi cần biết "tại sao"

- Phạm vi MVP chi tiết → `mvp-scope.md`
- Quyết định công nghệ + kiến trúc → `tech-decisions.md`
- Guideline UI bắt buộc → `design-system.md`
