# ConOi — Context cho Claude Code

> File này được Claude Code tự động đọc khi mở project. Giữ ngắn gọn, trỏ tới các file chi tiết trong `brainstorming/`.

## Sản phẩm là gì

ConOi là app gửi "lá thư" hàng ngày từ cha mẹ đến con cái, nội dung được cá nhân hoá theo tên, độ tuổi, sở thích của con. Bắt đầu từ nhu cầu cá nhân (gửi cho con gái Suti, 9 tuổi, lớp 3, thích vẽ manga và đọc Doraemon/Miko), mục tiêu dài hạn là thương mại hoá cho nhiều phụ huynh khác.

**Quan trọng — kênh gửi:** Email KHÔNG phải kênh chính. Trẻ em (đối tượng nhận nội dung) thường không dùng điện thoại/hạn chế dùng internet. Kênh chính là **bản in (printable) khổ A4, in màu, gửi về địa chỉ nhà qua đường bưu điện**. Email chỉ là 1 kênh deliver phụ (ví dụ để phụ huynh xem trước/lưu trữ). Quy trình in ấn + gửi bưu điện cụ thể (nhà in, tần suất, chi phí...) chưa chốt, sẽ quyết định sau.

Đọc chi tiết tại `brainstorming/product-vision.md`.

## Tech stack đã chốt

- Frontend + Backend: Next.js, deploy trên Vercel
- Database: Neon (Postgres serverless) — KHÔNG dùng Supabase
- AI content generation: OpenAI API (gpt-4o-mini)
- Email sending: chưa chốt — cân nhắc Resend hoặc Gmail API (xem `brainstorming/tech-decisions.md`); lưu ý đây là kênh phụ, không phải kênh chính
- Kênh in ấn/gửi bưu điện (kênh chính): chưa chốt bất kỳ quyết định kỹ thuật nào (nhà cung cấp in/gửi, format PDF, thu thập địa chỉ nhà...)

## Thứ tự triển khai MVP

1. Landing page (branding, value proposition)
2. Onboarding flow (nhập tên con, tuổi, sở thích, tần suất gửi) → đăng ký tài khoản ở bước cuối
3. Dashboard tối giản (xem lại thông tin đã đăng ký)
4. Backend: cron job hàng ngày gọi OpenAI sinh nội dung + gửi email

Chi tiết tại `brainstorming/mvp-scope.md`.

## Logic cốt lõi đã có sẵn (tham khảo, không phải code production)

Thư mục `scripts/legacy-google-apps-script/` chứa bản proof-of-concept ban đầu viết bằng Google Apps Script, đã test thực tế và gửi được email. Logic ở đây (topic rotation, tránh trùng resource, prompt cho OpenAI, category styling) nên được port sang Next.js API routes, KHÔNG copy nguyên xi vì khác ngôn ngữ và khác model lưu trữ (Properties Service → Neon).

## Nguyên tắc khi code

- Ngôn ngữ giao tiếp trong code comment: tiếng Việt hoặc tiếng Anh đều được, ưu tiên tiếng Anh cho biến/hàm, tiếng Việt cho comment giải thích business logic
- Nội dung email luôn bằng tiếng Việt, xưng hô cha/mẹ - con
- Không dùng Supabase, dùng Neon
- Tránh gửi trùng resource/link cho cùng một user, dù chủ đề (topic) được phép lặp lại
- **UI/thiết kế: BẮT BUỘC theo `brainstorming/design-system.md`** (palette san hô/kem ấm, font serif cho "giọng nói" + sans cho UI + script cho chữ ký, tối giản, lá thư là trung tâm, animation gợi ý tương tác). Đọc file đó trước khi làm bất kỳ màn hình/feature UI mới nào.

## File brainstorming khác

- `brainstorming/product-vision.md` — bối cảnh, mission, đối tượng người dùng
- `brainstorming/mvp-scope.md` — phạm vi MVP chi tiết
- `brainstorming/branding.md` — tên thương hiệu, domain, các tên đã cân nhắc và loại bỏ
- `brainstorming/content-tone-guide.md` — quy tắc giọng văn cho từng category nội dung
- `brainstorming/tech-decisions.md` — các quyết định kỹ thuật và lý do
- `brainstorming/competitor-research.md` — nghiên cứu đối thủ cạnh tranh, landing page UX patterns, phác thảo cấu trúc landing page
- `brainstorming/design-system.md` — **guideline thiết kế UI** (màu, font, component pattern, animation, bẫy kỹ thuật); đọc trước khi làm UI mới
- `brainstorming/landing-content-variants.md` — quyết định phạm vi cho tính năng luân chuyển nội dung (variant) trên landing page, bắt đầu từ headline
