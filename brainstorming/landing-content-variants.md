# Landing page — content variants cho headline

> Ý tưởng nảy ra khi nhìn lại landing page hiện tại (`src/app/page.tsx`): các dòng text (headline, subline, CTA, microcopy) đang hardcode cố định, sẽ tạo cảm giác "cũ" nếu để mãi một bản. Ghi lại quyết định phạm vi cho vòng đầu tiên của tính năng — chưa động vào tech stack/kiến trúc, chỉ chốt behaviour.

## Vấn đề

Landing page chỉ có một bản copy duy nhất cho mỗi vị trí text, không thay đổi theo thời gian → cảm giác tĩnh, không "sống". Muốn có nhiều biến thể (variant) cho từng vị trí, luân chuyển thay vì luôn hiện đúng một câu.

## Phạm vi đã chốt cho vòng đầu tiên

- **Chỉ áp dụng cho headline chính** ("Con ơi, hôm nay ba có chuyện muốn kể"). Các vị trí khác (subline, CTA label/microcopy, lá thư preview trong `LetterStack`) **chưa** làm ở vòng này — để sau khi vòng đầu chạy ổn.
- **Cơ chế chọn**: random 1 variant từ pool đang active mỗi khi có visitor mới, **không** phải rotation theo lịch (không phải "đổi mỗi ngày" hay "mỗi 3 ngày" theo thời gian toàn site — đã cân nhắc và bỏ hướng này vì phức tạp hơn cần thiết).
- **Tính nhất quán trong session**: một khi visitor đã thấy 1 headline, họ **giữ nguyên** headline đó cho các lần load lại trang trong cùng session, không random lại liên tục (tránh cảm giác thiếu nhất quán). Cơ chế lưu (cookie/session storage/khác) quyết định ở giai đoạn kiến trúc, chưa chốt ở đây.
- **Quản lý nội dung**: qua một trang admin riêng (ví dụ `/admin/content`), **chỉ founder truy cập được** — tách biệt hoàn toàn với dashboard của phụ huynh dùng sản phẩm.
- **Nguồn nội dung**: nhập tay hoàn toàn qua form trong trang admin. **Không** tích hợp nút "sinh bằng AI" ở vòng này — để ngỏ, làm sau nếu cần.

## Liên hệ với logic đã có

Đây thực chất là một biến thể nhẹ của pattern "chọn 1 trong nhiều, không lặp/không cứng nhắc" đã có trong core product (topic rotation + tránh trùng resource cho thư hàng ngày — xem `tech-decisions.md`). Khi thiết kế schema/kiến trúc, nên cân nhắc dùng cùng một tư duy "content pool" cho cả hai, thay vì hai hệ thống tách biệt — nhưng đây là quyết định kỹ thuật, để dành cho giai đoạn thiết kế kiến trúc.

## Ngoài phạm vi (chưa làm, ghi lại để không quên)

- Rotation cho các vị trí text khác ngoài headline
- AI sinh variant mới (nút "Generate bằng AI" trong admin)
- Rotation theo lịch/thời gian toàn site (đã xem xét, chọn hướng random-per-session thay thế)
- Weighting/ưu tiên variant nào hiện nhiều hơn
