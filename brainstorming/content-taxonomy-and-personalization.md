# Taxonomy nội dung & cá nhân hoá theo mục tiêu — big picture

> Brainstorm tầm nhìn hệ thống, rộng hơn phạm vi MVP hiện tại. File này ghi lại **ý tưởng và hướng đi đã thảo luận**, KHÔNG phải quyết định phạm vi MVP — phạm vi MVP vẫn theo `mvp-scope.md` (5 category cố định) cho tới khi có quyết định khác.

## Vấn đề / insight xuất phát

Onboarding hiện tại (theo `mvp-scope.md`) chỉ thu thập tên/tuổi/sở thích con. Nhưng nhu cầu của phụ huynh khác nhau không chỉ khác ở "con thích gì" mà còn khác ở **mục đích gửi thư là gì** — có người chỉ cần công cụ hỗ trợ gom tài liệu học tập cho con, có người chỉ muốn một công cụ gửi thư yêu thương đều đặn. Đây không phải cùng một loại nhu cầu, nên hệ thống cần cho phụ huynh chọn "mục tiêu/loại nội dung" muốn gửi, không chỉ dựa vào 5 category cố định như hiện tại.

## Mental model — 3 lớp của hệ thống

1. **Taxonomy / content-engine layer** — category + topic, do admin (founder) sở hữu và quản lý, có thể mở rộng liên tục.
2. **Personalization layer** — mỗi phụ huynh/con chọn tập con category nào áp dụng cho mình, với tỉ lệ mix riêng.
3. **Delivery layer** — email (hiện tại) / in ấn-bưu điện (dài hạn) — đã ghi ở `product-vision.md`, không đổi bởi brainstorm này.

## Quyết định/ghi nhận từ buổi brainstorm

- **Cách phụ huynh chọn mục tiêu ở onboarding**: multi-select từ một danh sách category/purpose **do admin công bố sẵn**. KHÔNG dùng ô nhập tự do, KHÔNG dùng AI diễn giải free text ở bước chọn này — giữ đơn giản, tường minh.
- **Category không còn giới hạn ở 5 category cố định** như bản MVP đang seed. Admin có thể **tạo category/purpose mới bất kỳ lúc nào**, không giới hạn số lượng, cùng với các topic con bên trong mỗi category — toàn bộ quản lý qua admin, không cần sửa code (khác với `TOPICS` hardcode trong legacy script).
- **Mỗi category có một "chiến lược sinh nội dung" (generation strategy)**:
  - Mặc định: AI compose chung theo pipeline hiện có (prompt 3 phần greeting/main/closing, xem `tech-decisions.md`).
  - Một số category có thể cần **thuật toán/pipeline riêng** để soạn nội dung và/hoặc thu thập resource — ví dụ category "tài liệu học tập" có thể cần tìm/curate resource thật (khác hẳn với category chỉ cần AI sinh văn bản thuần như "thư yêu thương").
  - Đã có tiền lệ cho việc này trong legacy script: một số topic có `resources` là link video hướng dẫn thật, một số topic `resources: []`. Ý tưởng ở đây là **formalize** sự khác biệt đó thành một thuộc tính rõ ràng của category (generation strategy), thay vì là chuyện ngẫu nhiên theo từng topic như hiện tại.
- **Trộn nhiều category cho 1 trẻ**: khi phụ huynh chọn nhiều mục tiêu cho con, tần suất phân bổ giữa các category cần **cả hai** cơ chế — mặc định chia đều tỉ trọng giữa các category đã chọn, và cho phép phụ huynh **tự chỉnh tỉ lệ ưu tiên** sau đó nếu muốn. Chưa chốt nơi thao tác chỉnh tỉ lệ này nằm ở đâu trong sản phẩm (dashboard là gợi ý hợp lý, chưa quyết).

## Liên hệ với các phần khác

- Category mới không chỉ do admin nghĩ ra top-down — còn có thể được **phát hiện từ dưới lên** thông qua hành vi viết thư thủ công của phụ huynh (AI phân loại nội dung viết tay, phát hiện pattern không khớp category nào hiện có). Xem `manual-writing-and-voice.md`.
- Đây là brainstorm tầm nhìn hệ thống — **không thay đổi** phạm vi 5 category cố định đang ghi trong `mvp-scope.md`/`tech-decisions.md` cho bản MVP hiện tại. Khi nào chốt đưa phần nào vào MVP sẽ cập nhật lại các file đó.

## Câu hỏi/nhánh đã nêu nhưng chưa đào sâu (ghi lại để không quên)

- Multi-child, đa phụ huynh trong 1 tài khoản — đã note ở `mvp-scope.md` là ngoài phạm vi MVP, chưa liên hệ cụ thể với hệ thống taxonomy này.
- Monetization gắn với category/pack nào đó (ví dụ category trả phí riêng) — được nhắc tới khi thảo luận nhưng chưa bàn sâu.
- UI cụ thể cho phụ huynh tự chỉnh tỉ lệ ưu tiên category — chưa thiết kế.
- Thu thập địa chỉ nhà / chuẩn bị dữ liệu cho kênh in ấn ngay từ onboarding — đã nêu ở `mvp-scope.md`, chưa liên hệ cụ thể với lớp taxonomy/personalization này.
