# Tech Decisions — ConOi

## Đã chốt

| Hạng mục | Lựa chọn | Lý do |
|---|---|---|
| Frontend + Backend framework | Next.js | API routes built-in, không cần backend riêng để gọi OpenAI, dễ mở rộng sang mobile sau (Expo gọi chung API) |
| Hosting | Vercel | Tích hợp tốt với Next.js, có Vercel Cron cho việc gửi email hàng ngày, free tier đủ dùng giai đoạn đầu |
| Database | Neon (Postgres serverless) | Người dùng chủ động chọn thay vì Supabase, tích hợp native với Vercel dashboard |
| AI content generation | OpenAI API, model gpt-4o-mini | Chi phí cực thấp (~$0.002/email), đã có API key sẵn sàng |
| Scheduling | Vercel Cron | Thay thế cho Google Apps Script trigger ở bản proof-of-concept cũ |

## Chưa chốt — cần quyết định trước khi code phần liên quan

| Hạng mục | Lựa chọn đang cân nhắc | Ghi chú |
|---|---|---|
| Dịch vụ gửi email | Resend vs Gmail API | Resend phổ biến với Next.js, free tier ~100 email/ngày, dễ tích hợp. Gmail API đã từng dùng ở bản test thủ công nhưng không phù hợp cho gửi tự động quy mô lớn (giới hạn quota, không thiết kế cho transactional email) |
| Authentication | Tự build vs NextAuth/Auth.js vs Clerk | Cần cân nhắc giữa độ phức tạp setup và chi phí (Clerk có free tier nhưng giới hạn user) |

## Ý tưởng kiến trúc đã nêu trong brainstorm, chưa chốt

Đã thảo luận sơ bộ khi bàn tech stack/kiến trúc, nhưng buổi brainstorm chuyển hướng sang bàn feature trước khi chốt — ghi lại để không mất ý, chưa phải quyết định:

- **Auth + email gộp lại thành 1 quyết định**: dùng Auth.js (NextAuth v5) với Resend làm email provider cho magic-link — giải quyết cả 2 dòng "chưa chốt" ở trên cùng lúc, ít vendor hơn Gmail API. Chưa chốt, cần xác nhận UX magic-link có phù hợp với đối tượng phụ huynh Việt Nam không.
- **DB access layer**: đề xuất Drizzle ORM thay vì Prisma — nhẹ hơn, hợp với Neon serverless driver, phù hợp schema đơn giản hiện tại. Chưa chốt.
- **Cron flow sơ bộ** (chỉ để tham khảo, chưa chốt): Vercel Cron gọi `/api/cron/send-daily`, lặp qua từng trẻ — chọn topic theo `current_topic_index` → chọn resource chưa dùng từ `sent_resources` → gọi OpenAI theo prompt đã có → build email bằng `@react-email/components` theo `design-system.md` (khác màu category cứng của legacy script) → gửi qua Resend → ghi `sent_resources` + tăng `current_topic_index`.
- Các ý tưởng lớn hơn về category/taxonomy (do admin sở hữu, mở rộng được, chiến lược sinh nội dung riêng theo category) và viết thư thủ công + học giọng văn được bàn riêng, xem `content-taxonomy-and-personalization.md` và `manual-writing-and-voice.md` — sẽ ảnh hưởng tới schema ở mục dưới khi chốt.

## Đã loại bỏ và lý do

| Lựa chọn | Lý do loại bỏ |
|---|---|
| Lovable (no-code/low-code builder) | Free tier quá hạn chế (5 credit/ngày, cap 30 credit/tháng), không đủ cho automation chạy hàng ngày thật sự. Chi phí cộng dồn qua nhiều dịch vụ (Lovable + Supabase + hosting) không kiểm soát được |
| Supabase | Người dùng chủ động chọn Neon thay thế |
| Claude API cho việc sinh nội dung | Người dùng muốn dùng ngân sách đã có sẵn ở OpenAI API key, tránh phát sinh chi phí mới. Có thể cân nhắc lại sau nếu muốn so sánh chất lượng output |

## Logic đã có sẵn từ bản proof-of-concept (Google Apps Script)

Xem `scripts/legacy-google-apps-script/suti_daily_email.gs`. Các phần logic cần port sang Next.js + Neon:

1. **Topic rotation theo day index** — thay vì lưu 1 số nguyên trong PropertiesService, lưu trong bảng Neon, tính theo `(ngày hiện tại - ngày bắt đầu) % tổng số topic`, hoặc đơn giản hơn là lưu `current_topic_index` trực tiếp theo từng user/child trong database
2. **Tracking URL đã gửi** — thay vì lưu chuỗi comma-separated trong PropertiesService, dùng bảng riêng `sent_resources` (user_id, url, sent_at) trong Neon, query để loại trừ URL đã dùng
3. **OpenAI prompt structure** — giữ nguyên cấu trúc prompt (3 phần greeting/main/closing, tone theo category), chỉ đổi từ gọi `UrlFetchApp.fetch()` (Apps Script) sang `fetch()` chuẩn trong Next.js API route
4. **Category styling (màu sắc theo category)** — giữ nguyên bảng màu, port từ JS object sang TypeScript/CSS-in-JS hoặc Tailwind config

## Database schema sơ bộ (cần refine khi code thật)

Gợi ý các bảng tối thiểu cho MVP:

- `users` — id, email, created_at
- `children` — id, user_id, name, age, interests (jsonb hoặc text), relationship_label (Bố/Mẹ/...)
- `topics` — id, title, category, angle, resources (jsonb array gồm label + url)
- `email_logs` — id, child_id, topic_id, sent_resource_url, sent_at (dùng để tránh trùng resource)
- `child_topic_progress` — child_id, current_topic_index (hoặc tính toán từ email_logs thay vì lưu riêng, cần cân nhắc)
