# Master Plan — ConOi

> Nhìn file này 1 lần là biết: đã làm gì, đang ở đâu, tiếp theo làm gì, và bức tranh tổng thể dẫn tới đâu. Cập nhật liên tục (tick checkbox, đổi trạng thái phase). Đây KHÔNG phải file quyết định phạm vi — nếu phạm vi đổi, sửa `mvp-scope.md`/`tech-decisions.md` trước rồi mới cập nhật lại đây.

## Bức tranh tổng thể

ConOi là app gửi "lá thư" cá nhân hoá hàng ngày từ cha mẹ đến con, khởi đầu từ nhu cầu cá nhân (gửi cho Suti), mục tiêu dài hạn thương mại hoá cho nhiều phụ huynh. **Kênh chính dài hạn là in ấn A4 + gửi bưu điện** — MVP hiện tại dùng email để chạy thử vòng lặp cá nhân hoá + AI content trước khi đầu tư vào in ấn. Chi tiết: `product-vision.md`.

## Lộ trình & trạng thái

| # | Phase | Trạng thái |
|---|---|---|
| 0 | Brainstorm & quyết định nền tảng (product vision, tech stack, design system, kiến trúc admin) | ✅ Xong |
| 1 | **MVP — Landing page** (branding, value proposition) | 🟡 Đang làm |
| 2 | **MVP — Onboarding flow** (nhập info con → đăng ký cuối) | ⬜ Chưa bắt đầu |
| 3 | **MVP — Dashboard tối giản** | ⬜ Chưa bắt đầu |
| 4 | **MVP — Backend cron** (sinh nội dung AI + gửi email hàng ngày) | ⬜ Chưa bắt đầu |
| 5 | Admin/founder app + tách monorepo | ⬜ Chưa bắt đầu, chỉ làm khi thật sự cần code admin |
| 6 | Kênh in ấn + gửi bưu điện (kênh chính dài hạn) | 💭 Ý tưởng, chưa thiết kế kỹ thuật |
| 7 | Taxonomy mở rộng + cá nhân hoá đa category | 💭 Ý tưởng (`content-taxonomy-and-personalization.md`) |
| 8 | Viết tay thủ công + học giọng văn riêng | 💭 Ý tưởng (`manual-writing-and-voice.md`) |

Phase 1-4 = phạm vi MVP đã chốt (`mvp-scope.md`). Phase 5-8 = sau MVP, thứ tự ưu tiên giữa chúng chưa quyết định.

## Đã xong

- [x] Next.js scaffold + Tailwind
- [x] Landing: component "letter-stack" + data thư mẫu (`src/app/letter-stack.tsx`, `src/data/letters.ts`)
- [x] Brainstorm + quyết định kiến trúc admin/founder (`tech-decisions.md`)

## Đang làm / tiếp theo (backlog chi tiết — Phase 1-2)

- [ ] **1 · Phase 1** — Hoàn thiện landing page: copy đầy đủ theo cấu trúc `competitor-research.md`, headline variant (`landing-content-variants.md`), responsive, check lại theo `design-system.md`
- [ ] **2 · Chốt câu hỏi mở** — Quyết Auth + email provider: Auth.js v5 + Resend magic-link, xác nhận UX phù hợp phụ huynh VN, tạo tài khoản Resend
- [ ] **3 · Nền tảng dữ liệu** — Setup Neon + Drizzle schema đầu tiên (`users`, `children`, `topics`, `email_logs` — schema sơ bộ trong `tech-decisions.md`). Làm trong repo hiện tại, chưa tách `packages/db`
- [ ] **4 · Phase 2** — Onboarding UI (multi-step: tên/tuổi/sở thích con → đăng ký ở bước cuối), theo `design-system.md`
- [ ] **5 · Nối dữ liệu** — Wire onboarding submit → ghi `users`/`children` vào Neon, kích hoạt magic-link ở bước cuối

## Sau MVP (chưa cần chi tiết hoá)

- [ ] Phase 3 — Dashboard tối giản (xem/sửa thông tin đã đăng ký)
- [ ] Phase 4 — Backend cron hàng ngày (topic rotation, gọi OpenAI, gửi Resend, port logic từ `scripts/legacy-google-apps-script/`)
- [ ] Phase 5 — Tách monorepo `apps/web` + `apps/admin` (xem "Kiến trúc admin/founder" trong `tech-decisions.md`)

## Tham khảo khi cần biết "tại sao"

- Phạm vi MVP chi tiết → `mvp-scope.md`
- Quyết định công nghệ + kiến trúc → `tech-decisions.md`
- Guideline UI bắt buộc → `design-system.md`
