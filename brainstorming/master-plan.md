# Master Plan — ConOi

> Nhìn file này 1 lần là biết: đã làm gì, đang ở đâu, tiếp theo làm gì, và bức tranh tổng thể dẫn tới đâu. Cập nhật liên tục (tick checkbox, đổi trạng thái phase). Đây KHÔNG phải file quyết định phạm vi — nếu phạm vi đổi, sửa `mvp-scope.md`/`tech-decisions.md` trước rồi mới cập nhật lại đây.

## Bức tranh tổng thể

ConOi là app gửi "lá thư" cá nhân hoá hàng ngày từ cha mẹ đến con, khởi đầu từ nhu cầu cá nhân (gửi cho Suti), mục tiêu dài hạn thương mại hoá cho nhiều phụ huynh. **Kênh chính dài hạn là in ấn A4 + gửi bưu điện** — MVP hiện tại dùng email để chạy thử vòng lặp cá nhân hoá + AI content trước khi đầu tư vào in ấn. Chi tiết: `product-vision.md`.

## Lộ trình & trạng thái

| # | Phase | Trạng thái |
|---|---|---|
| 0 | Brainstorm & quyết định nền tảng (product vision, tech stack, design system, kiến trúc admin) | ✅ Xong |
| 1 | **MVP — Landing page** (branding, value proposition) | ✅ Xong |
| 2 | **MVP — Onboarding flow** (nhập info con → đăng ký cuối) | 🟡 Đang làm — UI/UX 4 bước xong, chưa nối Auth/DB thật |
| 3 | **MVP — Dashboard tối giản** | ⬜ Chưa bắt đầu |
| 4 | **MVP — Backend cron** (sinh nội dung AI + gửi email hàng ngày) | 🟡 Đang làm — luồng thủ công đã chạy được thật, còn thiếu deploy + xác nhận cron tự động (xem ghi chú dưới) |
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
- [x] `.env.local` điền key thật (Neon, OpenAI, Resend) — quyết luôn **Resend** làm email provider, chốt câu hỏi mở trong `tech-decisions.md`
- [x] `npm run db:push` + `npm run db:seed` — 35 topic đã nằm trong Neon thật
- [x] Test local `/api/send-daily` thành công — email đầu tiên ("Cách vẽ mắt manga") gửi thật tới chunhuduc@gmail.com, nội dung AI + resource đúng như kỳ vọng
- [x] Fix bug: `RESEND_FROM_EMAIL=""` (chuỗi rỗng) không fallback đúng qua `??`, đổi sang `||` (`src/app/api/send-daily/route.ts`)
- [x] Commit + push lên `main` (`b1f70db`)

## Đã xong (thêm — Phase 2, onboarding UI/UX)

- [x] Route `/bat-dau` — wizard 4 bước: (1) tên/tuổi con + quan hệ Ba-Mẹ, (2) sở thích (chip + free text), (3) preview 1 lá thư cá nhân hoá, (4) email đăng ký → màn hình cảm ơn
- [x] Preview thư ở bước 3 là **template tĩnh** (chèn tên/tuổi/sở thích), KHÔNG gọi OpenAI thật — tránh chi phí/độ trễ cho mỗi khách ghé onboarding (`buildPreviewLetter` trong `onboarding-wizard.tsx`)
- [x] Component pattern mới bổ sung vào `design-system.md`: input text, chip lựa chọn, nút quay lại (text button), step-dots dùng cho flow nhiều bước
- [x] Sửa CTA landing `#bat-dau` (anchor chết) → `/bat-dau` (route thật)
- [x] Test tay toàn bộ 4 bước qua preview — chạy đúng, không lỗi console
- [ ] **Chưa làm** (cố tình, để Phase sau): nối `handleSubmit` vào API tạo `users`/`children` thật + kích hoạt Auth — hiện chỉ là trạng thái UI (xem comment trong `onboarding-wizard.tsx`)

## Đang làm / tiếp theo (backlog chi tiết)

- [ ] **1 · Chốt Auth + email login** — Auth.js v5 + Resend magic-link, quyết định trước khi nối `handleSubmit` ở bước 4 onboarding vào backend thật
- [ ] **2 · Thêm bảng `users`/`children` thật** vào `src/lib/db/schema.ts`, nối submit onboarding → ghi Neon + kích hoạt magic-link, thay dần `src/lib/config.ts` hardcode
- [ ] **3 · Deploy lên Vercel** — connect repo, set env var thật trên Vercel dashboard (`DATABASE_URL`, `OPENAI_API_KEY`, `RESEND_API_KEY`, `CRON_SECRET`)
- [ ] **4 · Xác nhận cron tự động chạy thật** — theo dõi 1-2 ngày liên tiếp lúc 19h GMT+7, kiểm tra không trùng resource, rotation topic đúng thứ tự
- [ ] **5 · Đánh giá chất lượng nội dung qua vài ngày** — đọc email thật gửi cho Suti, tinh chỉnh prompt/tone nếu cần

## Sau MVP (chưa cần chi tiết hoá)

- [ ] Phase 3 — Dashboard tối giản (xem/sửa thông tin đã đăng ký)
- [ ] Phase 5 — Tách monorepo `apps/web` + `apps/admin` (xem "Kiến trúc admin/founder" trong `tech-decisions.md`)

## Tham khảo khi cần biết "tại sao"

- Phạm vi MVP chi tiết → `mvp-scope.md`
- Quyết định công nghệ + kiến trúc → `tech-decisions.md`
- Guideline UI bắt buộc → `design-system.md`
