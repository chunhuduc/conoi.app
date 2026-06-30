# Competitor Research & Landing Page UX Study

> Nghiên cứu ngày 2026-06-30. Không có đối thủ trùng khớp 1:1 (gửi email hàng ngày, nội dung AI cá nhân hoá theo tên/tuổi/sở thích con, từ cha mẹ). Tài liệu này map các đối thủ gần nhất theo từng trục, rút ra pattern UX nên học, và phác thảo cấu trúc landing page cho ConOi.

## Bản đồ đối thủ

### Gần nhất về concept (parent → child, qua email thật)

**[Dear Future You](https://dearfutureyou.org/)** — cha mẹ viết thư gửi vào inbox thật của con, mở ra trong tương lai (time-delayed). Khác biệt lớn: viết tay, không phải hàng ngày, không AI. Miễn phí. Thông điệp tin cậy mạnh: "không bán/lưu dữ liệu của con".

**[FutureMe](https://www.futureme.org/)** — "thư gửi tương lai" nói chung, không riêng cho trẻ em, nhưng quy mô lớn (20M+ thư từ 2002). Đã chuyển từ free sang gói $9–36/năm — tín hiệu tốt rằng người dùng sẵn sàng trả tiền cho nội dung cảm xúc/time-delayed.

### Gần về hình thức subscription nội dung cho trẻ (khác kênh giao hàng)

**[The Adventure Letters](https://www.theadventureletters.com/)** — gửi thư giấy qua bưu điện, nội dung truyện phiêu lưu giáo dục. $12.99/tháng hoặc $150/năm. UX đáng học: quy trình 4 bước có icon, testimonial trích lời phản ứng của trẻ, FAQ theo khối lớp, nhắm cả nhóm homeschool.

**[LettersLetter](https://www.lettersletter.com/)** — subscription truyện, định vị bằng nỗi lo cụ thể của phụ huynh ("Beat the Summer Slide" — chống quên kiến thức hè) thay vì pitch "nội dung vui chung chung".

### Pattern-setter về UX cá nhân hoá (không phải đối thủ nội dung, nhưng là chuẩn tham khảo onboarding)

**[Wonderbly](https://www.wonderbly.com/)** — sách cá nhân hoá cho trẻ, 10M+ khách hàng, hậu thuẫn bởi Penguin Random House. Trang chủ:
- Headline cảm xúc, gắn với khoảnh khắc ("Bottle the baby stage forever")
- Hành trình cá nhân hoá 4 bước có icon: Find → Personalize (tên/chi tiết con) → Add a message → Give
- Nút "Personalize" lặp lại trên từng sản phẩm thay vì 1 nút "Sign up" chung chung
- Trust: Trustpilot reviews, số liệu quy mô ("đã giúp 10 triệu người"), tên thương hiệu lớn đứng sau
- Tông màu ấm, mềm; thông điệp về sự lưu giữ/kỷ niệm lâu dài

### Thị trường Việt Nam — không có đối thủ trực tiếp

Tìm kiếm "app nuôi dạy con Việt Nam", "newsletter cá nhân hoá cho trẻ em Việt Nam" chỉ ra:
- **KidsOnline** — sổ liên lạc điện tử cho trường mầm non (giáo viên → phụ huynh), không phải cha mẹ → con
- **POH/Easy, Kids A-Z, KidsUP, Vkids** — app học tập có lộ trình cá nhân hoá theo trình độ, không phải nội dung tình cảm/thư hàng ngày

**Kết luận:** chưa có ai làm "thư/email hàng ngày, nội dung AI cá nhân hoá theo sở thích cụ thể của từng con, giọng văn cha mẹ" tại Việt Nam. Đây là khoảng trống thật — hoặc dấu hiệu chưa ai validate được nhu cầu này tại thị trường nội địa. Không phải lý do để trì hoãn, chỉ là điểm cần lưu ý khi viết landing page (không có đối thủ để dẫn chiếu/so sánh, phải tự giáo dục thị trường).

## Pattern UX nên áp dụng cho ConOi

1. **Onboarding dạng hành trình cá nhân hoá** (theo Wonderbly) thay vì form khô khan: tên con → tuổi → sở thích → tần suất gửi, mỗi bước có hình minh hoạ/icon ấm áp, không giống điền form đăng ký dịch vụ.
2. **Testimonial cảm xúc** (theo Adventure Letters) — khi có 1-2 người dùng thật, trích phản ứng cụ thể của trẻ khi nhận email, mạnh hơn liệt kê tính năng.
3. **Thông điệp tin cậy về dữ liệu trẻ em** (theo Dear Future You) — nói rõ "không bán/dùng dữ liệu con bạn cho mục đích khác". Phụ huynh nhạy cảm với dữ liệu liên quan đến con, nêu rõ điều này loại bỏ một rào cản thật.
4. **Định vị bằng nỗi lo/nhu cầu cụ thể** (theo LettersLetter) thay vì "nội dung vui cho con chung chung" — ví dụ: cha mẹ đi công tác xa, muốn duy trì kết nối đều đặn nhưng không có thời gian nghĩ nội dung mỗi ngày.

## Phác thảo cấu trúc landing page ConOi

1. **Hero** — headline cảm xúc gắn với vấn đề cụ thể (cha mẹ bận rộn/xa nhà muốn duy trì kết nối với con mỗi ngày), không phải mô tả tính năng. CTA: "Bắt đầu gửi cho con" hoặc tương tự.
2. **Hành trình cá nhân hoá (3-4 bước, có icon)** — Nhập tên & tuổi con → Chọn sở thích (vẽ, truyện, kỹ năng sống...) → Chọn tần suất → Xem trước email mẫu được cá nhân hoá. Bước cuối nên render 1 đoạn nội dung mẫu thật với tên con vừa nhập để tạo "aha moment" trước khi yêu cầu đăng ký tài khoản (đúng với thứ tự MVP đã chốt: onboarding trước, đăng ký ở bước cuối).
3. **Giải thích "tại sao khác"** — nhấn cá nhân hoá thật (không phải newsletter chung), giọng văn con người, không trùng lặp tài nguyên.
4. **Trust/dữ liệu trẻ em** — cam kết về quyền riêng tư dữ liệu con.
5. **Social proof** — ban đầu có thể dùng chính câu chuyện founder (gửi cho con gái Suti) làm "testimonial" thay vì chờ user thật.
6. **CTA cuối + form đăng ký**.

## Đối thủ/tham khảo chưa khai thác sâu — có thể nghiên cứu thêm nếu cần

- Maily, Tocomail, KidsEmail — app email riêng cho trẻ (trẻ tự dùng), khác use-case nhưng đáng xem flow "parental control" nếu ConOi sau này cho trẻ phản hồi lại.
- "Extra" (AI-powered email app, gọi vốn $9.5M) — chưa rõ có liên quan đến trẻ em hay không, đáng kiểm tra lại nếu muốn định vị theo hướng "AI email app" rộng hơn.
