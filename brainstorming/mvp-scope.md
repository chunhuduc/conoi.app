# MVP Scope — ConOi

## Thứ tự triển khai đã chốt

1. **Landing page** — giới thiệu sản phẩm, value proposition, branding
2. **Onboarding flow** — nhập thông tin con (tên, tuổi, sở thích) → đăng ký tài khoản ở bước cuối cùng (không phải form đăng ký riêng biệt từ đầu)
3. **Dashboard tối giản** — phụ huynh xem lại thông tin đã đăng ký, có thể chỉnh sửa
4. **Backend tự động** — cron job hàng ngày: chọn topic → gọi OpenAI sinh nội dung → chọn resource chưa từng gửi → build email → gửi qua dịch vụ email

## Lý do chọn thứ tự này

Landing page trước giúp chốt branding/copy/định vị sản phẩm trước khi đụng vào code phức tạp. Gộp đăng ký vào cuối onboarding (thay vì form riêng) giúp người dùng đầu tư cảm xúc vào sản phẩm (đã nhập tên con, sở thích con) trước khi bị yêu cầu tạo tài khoản — tỷ lệ chuyển đổi (conversion) thường cao hơn so với "đăng ký trước, dùng sau".

## Trong phạm vi MVP

- 1 trẻ / 1 tài khoản phụ huynh (chưa cần multi-child)
- 5 category nội dung cố định: Vẽ & Truyện Tranh, Đọc Sách & Tưởng Tượng, Kỹ Năng Sống, Học Tập, Khám Phá Thế Giới
- Tần suất gửi: cố định 1 email/ngày (chưa cho tuỳ chỉnh)
- Giờ gửi: cố định 19h GMT+7 (chưa cho tuỳ chỉnh theo từng user)
- Topic rotation: danh sách topic tĩnh, được seed sẵn trong database (xem `scripts/legacy-google-apps-script/` để tham khảo logic cũ)
- Tránh trùng resource: track theo user, theo URL đã gửi

## Ngoài phạm vi MVP (để sau)

- Multi-child trong 1 tài khoản
- Tuỳ chỉnh tần suất/giờ gửi
- Tuỳ chỉnh giọng văn (ví dụ chọn "Bố" / "Mẹ" / tên gọi khác)
- Thanh toán/subscription
- App mobile (Next.js trước, mobile sau qua API chung)
- Đa ngôn ngữ
- Cho phép phụ huynh tự thêm topic tuỳ chỉnh
- Multi-tenant thật sự (hiện tại có thể seed cứng cho 1 user là chủ dự án trước)

## Câu hỏi mở cần quyết định trước khi code

- Dịch vụ gửi email: Resend hay Gmail API? (xem `tech-decisions.md`)
- Xác thực người dùng (auth): tự build hay dùng dịch vụ có sẵn (NextAuth, Clerk, Auth.js)?
- Lưu trữ OpenAI API key: server-side env var, không expose ra client (mặc định, không cần bàn thêm nhưng ghi chú lại để không quên)
