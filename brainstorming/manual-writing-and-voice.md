# Viết thư thủ công & học giọng văn phụ huynh (voice learning)

> Ghi lại ý tưởng/hướng đi từ buổi brainstorm — KHÔNG phải quyết định phạm vi MVP. Xem `mvp-scope.md` cho phạm vi MVP đã chốt.

## Vấn đề / motivation

- Không phải phụ huynh nào cũng muốn dùng AI để viết thư cho con — cần có lựa chọn **viết tay**, đơn giản, dễ dùng, không bắt buộc dùng AI.
- Insight quan trọng hơn phát sinh trong lúc brainstorm: nội dung viết tay không chỉ là một content path thay thế cho AI — nó còn là **dữ liệu để học giọng văn/phong cách của phụ huynh**, dùng để cải thiện chất lượng nội dung do AI soạn sau này cho đúng gia đình đó. Điều này hiện thực hoá mạnh hơn giá trị cốt lõi "giọng văn con người" đã ghi ở `product-vision.md` (hiện tại chỉ có tone-guide chung theo category, xem `content-tone-guide.md`, chưa cá nhân hoá theo từng phụ huynh).

## Quyết định/ghi nhận từ buổi brainstorm

### Viết thủ công

- **Không giới hạn thời điểm**: phụ huynh có thể viết thư bất kỳ lúc nào, không chỉ một lần ở bước onboarding.
- **Trộn tự do** với thư do AI soạn cho cùng một đứa trẻ — không cần chọn hẳn 1 mode cố định (toàn AI hoặc toàn thủ công) cho cả đứa trẻ; mỗi ngày có thể là AI hoặc thủ công tuỳ phụ huynh.
- **Không cần chọn category khi viết tay.** Thay vào đó, AI phân tích nội dung sau khi viết để tự động phân loại:
  - Khớp với category đã có → tính vào rotation/mix chung của đứa trẻ đó, giống như thư do AI soạn.
  - Không khớp category nào hiện có → được ghi nhận là **candidate cho category mới**, thu thập dần theo thời gian để admin đánh giá xem có nên chính thức bổ sung vào danh sách category hay không (xem `content-taxonomy-and-personalization.md` cho phần admin sở hữu taxonomy). Đây là kênh **phát hiện category từ dưới lên** (bottom-up, dựa trên hành vi thật), khác với cách category được admin định nghĩa top-down.

### Học giọng văn (voice profile)

- Thư viết tay của phụ huynh được dùng để rút ra một **voice profile** riêng cho gia đình đó, dùng để định hướng văn phong khi AI soạn thư cho cùng gia đình — mục tiêu là nội dung do AI soạn nghe giống đúng phụ huynh đó hơn, không chỉ theo tone chung của category.
- **Phạm vi riêng tư**: mặc định dữ liệu này chỉ ảnh hưởng tới đầu ra AI cho chính gia đình đó. Có để ngỏ khả năng **tổng hợp ẩn danh** dữ liệu này sau này để cải thiện sản phẩm chung cho mọi người dùng — đây là hướng mở, **chưa** thiết kế cơ chế ẩn danh hoá/consent cụ thể, cần làm kỹ (opt-in rõ ràng, minh bạch với phụ huynh) trước khi triển khai thật.

## Liên hệ với các phần khác

- Auto-classification + candidate-category discovery liên hệ trực tiếp tới việc admin sở hữu taxonomy — xem `content-taxonomy-and-personalization.md`.
- Voice profile là cách hiện thực hoá giá trị "giọng văn con người" ở `product-vision.md`, mạnh hơn cách làm hiện tại (chỉ có tone-guide chung theo category).

## Câu hỏi/nhánh đã nêu nhưng chưa đào sâu

- Cơ chế kỹ thuật để "học" giọng văn (few-shot prompt bằng ví dụ thư cũ, fine-tune riêng, hay phân tích style rồi tổng hợp thành mô tả dùng trong prompt...) — chưa bàn, để dành cho giai đoạn kiến trúc.
- Cần tối thiểu bao nhiêu lá thư viết tay trước khi bắt đầu áp dụng voice profile — chưa bàn.
- Luồng UI cụ thể để phụ huynh viết thư thủ công trong sản phẩm (chọn ngày gửi, soạn trước bao lâu...) — chưa bàn, mới thảo luận ở mức hành vi/khái niệm.
- Cơ chế ẩn danh hoá + consent cho việc tổng hợp voice data across users — chưa bàn.
