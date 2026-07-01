# Product Vision — ConOi

## Nguồn gốc ý tưởng

Bắt đầu từ một nhu cầu rất cụ thể: tự động hoá việc gửi email hàng ngày cho con gái (Suti, 9 tuổi, học lớp 3 tại Việt Nam), nội dung xoay quanh vẽ manga, đọc truyện (Doraemon, Miko), kỹ năng sống, và học tập. Ban đầu chỉ định làm bằng Google Apps Script (miễn phí, không cần hạ tầng), sau đó quyết định mở rộng thành web app thật để dễ thương mại hoá.

## Vấn đề đang giải quyết

Phụ huynh bận rộn (đặc biệt người làm việc xa nhà, đi công tác, hoặc đơn giản là muốn duy trì kết nối tình cảm đều đặn với con) thường khó duy trì một thói quen giao tiếp nhất quán, có chiều sâu, và mang tính giáo dục với con cái mỗi ngày. ConOi tự động hoá việc này nhưng vẫn giữ được cảm giác "thật", "ấm áp", không giống nội dung được auto-generate vô hồn.

## Kênh gửi nội dung (delivery channel)

**Email không phải kênh chính.** Đối tượng nhận nội dung là trẻ em (tiểu học), phần lớn không dùng điện thoại riêng hoặc bị hạn chế dùng internet — email gửi vào hộp thư mà con không mở được thì vô nghĩa.

**Kênh chính: bản in (printable) khổ A4, in màu, gửi về địa chỉ nhà qua đường bưu điện.** Con nhận một lá thư vật lý thật, giống như thư tay — đúng tinh thần "giọng nói ấm áp, thật" mà sản phẩm hướng tới, thậm chí còn thật hơn email.

Email (nếu có) đóng vai trò kênh phụ — ví dụ để phụ huynh xem trước nội dung, lưu trữ, hoặc làm kênh dự phòng/nhanh trước khi bản in tới tay.

Các câu hỏi vận hành còn bỏ ngỏ, sẽ quyết định sau khi cần:
- In ấn qua đâu (tự in tại nhà, dịch vụ in-and-mail như một API, hay đối tác in ấn địa phương)
- Tần suất gửi bưu điện (hàng ngày là không thực tế cho bưu điện — có thể gộp thành tuần/tháng)
- Thu thập & xác thực địa chỉ nhà trong onboarding
- Chi phí in + cước gửi ảnh hưởng thế nào đến mô hình kinh doanh (freemium khó áp dụng nếu mỗi lần gửi đều tốn chi phí vật lý)

## Đối tượng người dùng

**Giai đoạn 1 (hiện tại):** Chỉ 1 người dùng — chính người sáng lập, gửi cho con gái Suti.

**Giai đoạn 2 (mở rộng):** Phụ huynh Việt Nam có con trong độ tuổi tiểu học (6-11 tuổi), quan tâm đến việc nuôi dưỡng con qua công nghệ nhưng vẫn muốn giữ chất "con người" trong nội dung.

**Giai đoạn 3 (tiềm năng dài hạn):** Mở rộng quốc tế, đa ngôn ngữ.

## Giá trị cốt lõi của sản phẩm

1. **Cá nhân hoá thật sự** — nội dung biết tên con, biết sở thích, biết độ tuổi, không phải newsletter chung chung
2. **Giọng văn con người** — đọc như cha/mẹ thật viết, không như bot
3. **Cân bằng giải trí và phát triển** — không chỉ là nội dung vui (vẽ, truyện) mà còn có kỹ năng sống và học tập, nhưng không bị giáo điều
4. **Không trùng lặp** — hệ thống đảm bảo tài nguyên/link tham khảo không gửi lại 2 lần cho cùng một đứa trẻ

## Mô hình kinh doanh dự kiến (chưa chốt, cần brainstorm thêm)

Ý tưởng ban đầu: freemium — miễn phí cho 1 con, trả phí nếu muốn thêm nhiều con hoặc nhiều tính năng cá nhân hoá hơn (chọn giọng văn, chọn tần suất, thêm chủ đề tuỳ chỉnh).

Cần thảo luận thêm: định giá, đối thủ cạnh tranh trực tiếp/gián tiếp, kênh tiếp cận người dùng đầu tiên. Lưu ý: vì kênh chính là bản in gửi bưu điện (xem mục "Kênh gửi nội dung" ở trên), mô hình freemium thuần cần cân nhắc lại — mỗi lần gửi tốn chi phí in + cước thật, khác hẳn email (gần như miễn phí).
