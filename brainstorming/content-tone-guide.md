# Content & Tone Guide — ConOi

## Nguyên tắc chung khi viết/sinh nội dung email

- Xưng hô cha mẹ - con tự nhiên, không sáo rỗng, không nghe như văn mẫu
- Luôn có 3 phần: lời chào mở đầu ấm áp → nội dung chính kèm thử thách nhỏ cụ thể → lời kết yêu thương
- Không dùng markdown trong văn bản do AI sinh ra
- Không dùng emoji trong phần văn bản do AI sinh ra (emoji được thêm ở tầng template/giao diện, tách biệt khỏi nội dung AI)
- Mỗi email đọc trong khoảng 1 phút (ngắn gọn, không lan man)
- Tuyệt đối không giáo điều, không nghe như đang "dạy đời"

## Tone theo từng category

| Category | Tone | Mô tả |
|---|---|---|
| Vẽ & Truyện Tranh (drawing) | Vui vẻ, hào hứng | Như đang cùng con khám phá một trò chơi mới |
| Đọc Sách & Tưởng Tượng (reading) | Tò mò, kích thích trí tưởng tượng | Như đang mở cánh cửa vào một thế giới mới |
| Kỹ Năng Sống (lifeskill) | Nhẹ nhàng, khôn ngoan | Như chia sẻ một bí quyết cuộc sống từ trái tim |
| Học Tập (study) | Kiên nhẫn, động viên | Như một người thầy thương học trò |
| Khám Phá Thế Giới (explore) | Ngạc nhiên, thú vị | Như đang cùng nhau khám phá điều kỳ diệu |

## Cấu trúc prompt cho AI (tham khảo từ bản proof-of-concept)

Prompt cần cung cấp cho AI: tên người gửi (Bố/Mẹ), tên con, tuổi, sở thích, chủ đề hôm nay, category, góc tiếp cận gợi ý (angle), resource tham khảo (nếu có). Yêu cầu output chia 3 phần rõ ràng (greeting/main/closing) để dễ parse và đưa vào template HTML.

Xem chi tiết cách implement tại `scripts/legacy-google-apps-script/suti_daily_email.gs`, hàm `generateEmailContent()`.

## Ví dụ thực tế đã test (cho Suti, từ Bố)

**Chủ đề: Cách vẽ mắt manga**
Tone: vui vẻ, hào hứng. Liên hệ Doraemon/Nobita để minh hoạ. Thử thách cụ thể: vẽ 5 đôi mắt với 5 cảm xúc khác nhau.

**Chủ đề: Cách xin lỗi thật lòng**
Tone: nhẹ nhàng, khôn ngoan. Chia nhỏ thành 3 bước cụ thể (nhận lỗi, hiểu lý do sai, hứa cụ thể). Kết thúc bằng lời khẳng định tin tưởng con.

## Lưu ý khi mở rộng cho nhiều gia đình (giai đoạn 2+)

- Tên người gửi cần là biến số (Bố/Mẹ/Ông/Bà/tên riêng), không hardcode "Bố"
- Tên con là biến số bắt buộc
- Cần cho phép tuỳ chỉnh "quan hệ xưng hô" theo văn hoá vùng miền (Bắc/Trung/Nam có thể khác nhau về cách gọi)
