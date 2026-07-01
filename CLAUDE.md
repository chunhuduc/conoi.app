# ConOi — Context cho Claude Code

> File này được Claude Code tự động đọc khi mở project. Giữ ngắn gọn, trỏ tới các file chi tiết trong `brainstorming/`.

## Sản phẩm là gì

ConOi là app gửi "lá thư" hàng ngày từ cha mẹ đến con cái, nội dung được cá nhân hoá theo tên, độ tuổi, sở thích của con. Bắt đầu từ nhu cầu cá nhân (gửi cho con gái Suti, 9 tuổi, lớp 3, thích vẽ manga và đọc Doraemon/Miko), mục tiêu dài hạn là thương mại hoá cho nhiều phụ huynh khác.

**Quan trọng — kênh gửi:** Email KHÔNG phải kênh chính. Trẻ em (đối tượng nhận nội dung) thường không dùng điện thoại/hạn chế dùng internet. Kênh chính là **bản in (printable) khổ A4, in màu, gửi về địa chỉ nhà qua đường bưu điện**. Email chỉ là 1 kênh deliver phụ (ví dụ để phụ huynh xem trước/lưu trữ). Quy trình in ấn + gửi bưu điện cụ thể (nhà in, tần suất, chi phí...) chưa chốt, sẽ quyết định sau.

Đọc chi tiết tại `brainstorming/product-vision.md`.

## Quy trình: luôn biết việc tiếp theo là gì

Khi được giao việc mà không rõ nên làm gì trước/tiếp theo, đọc theo thứ tự:

1. **`brainstorming/master-plan.md`** — nguồn DUY NHẤT cho "đã làm gì / đang ở đâu / tiếp theo làm gì" + bức tranh tổng thể (bảng phase), cập nhật liên tục. Luôn đọc file này trước khi bắt đầu việc mới nếu user không chỉ định rõ task.
2. **`brainstorming/mvp-scope.md`** — tra khi cần biết thứ tự phase lớn / cái gì trong-ngoài phạm vi MVP (ít đổi hơn master-plan).
3. **`brainstorming/tech-decisions.md`** — tra khi cần biết "tại sao chọn công nghệ X" hoặc còn câu hỏi kỹ thuật nào chưa chốt.
4. Các file brainstorming còn lại — chỉ là ý tưởng/research, xem mục "File brainstorming khác" bên dưới để biết file nào đã là quyết định (📌) và file nào chưa chốt (💭). KHÔNG tự ý coi ý tưởng trong file 💭 là đã được duyệt đưa vào scope trừ khi `mvp-scope.md` hoặc `tech-decisions.md` xác nhận lại.

Sau khi hoàn thành một việc, tick checkbox và cập nhật trạng thái phase trong `brainstorming/master-plan.md` (thêm việc mới vào đúng mục nếu phát sinh) trước khi kết thúc phiên — để lần sau việc "tiếp theo" và bức tranh tổng thể luôn đúng mà không cần hỏi lại user.

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

> 📌 = đã chốt/quyết định, coi là ràng buộc khi code. 💭 = brainstorm/tầm nhìn, chưa chốt phạm vi — tham khảo, không tự ý code theo cho tới khi được xác nhận trong `mvp-scope.md`/`tech-decisions.md`.

- 📌 `brainstorming/product-vision.md` — bối cảnh, mission, đối tượng người dùng
- 📌 `brainstorming/mvp-scope.md` — phạm vi MVP chi tiết
- 📌 `brainstorming/branding.md` — tên thương hiệu, domain, các tên đã cân nhắc và loại bỏ
- 📌 `brainstorming/content-tone-guide.md` — quy tắc giọng văn cho từng category nội dung
- 📌 `brainstorming/tech-decisions.md` — các quyết định kỹ thuật và lý do (một số dòng trong file này vẫn đánh dấu "chưa chốt" — đọc kỹ mục tương ứng)
- 💭 `brainstorming/competitor-research.md` — nghiên cứu đối thủ cạnh tranh, landing page UX patterns, phác thảo cấu trúc landing page (tham khảo, không phải quyết định)
- 📌 `brainstorming/design-system.md` — **guideline thiết kế UI** (màu, font, component pattern, animation, bẫy kỹ thuật); đọc trước khi làm UI mới
- 📌 `brainstorming/landing-content-variants.md` — quyết định phạm vi cho tính năng luân chuyển nội dung (variant) trên landing page, bắt đầu từ headline
- 💭 `brainstorming/content-taxonomy-and-personalization.md` — brainstorm tầm nhìn hệ thống: category/topic do admin sở hữu và mở rộng được, chiến lược sinh nội dung theo category, cá nhân hoá mix category theo từng con (chưa phải quyết định phạm vi MVP)
- 💭 `brainstorming/manual-writing-and-voice.md` — brainstorm: phụ huynh viết thư thủ công, tự động phân loại bằng AI, học giọng văn riêng cho từng gia đình (chưa phải quyết định phạm vi MVP)
- 🔄 `brainstorming/master-plan.md` — **bức tranh tổng thể + tiến độ**: bảng phase (đã xong/đang làm/chưa bắt đầu) + backlog chi tiết, cập nhật liên tục (không phải file quyết định phạm vi, nhưng là nguồn duy nhất cho "đã làm gì / tiếp theo làm gì")
