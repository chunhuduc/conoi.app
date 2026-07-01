# Findings — ConOi

> Nơi lưu phát hiện có giá trị (kỹ thuật + cách tiếp cận) để không phải dò lại từ đầu khi gặp vấn đề tương tự. Khác với `tech-decisions.md` (quyết định "chọn gì") — file này là "đã từng vướng gì, học được gì". Thêm mục mới khi giải quyết xong 1 bug không hiển nhiên, hoặc khi 1 cách tiếp cận được xác nhận đúng/sai qua thực tế.

## Kỹ thuật

### `??` không fallback được giá trị chuỗi rỗng từ env var
Biến env để trống trong `.env.local` (`RESEND_FROM_EMAIL=`) là chuỗi rỗng `""`, không phải `undefined`. `process.env.X ?? fallback` KHÔNG áp dụng fallback vì `""` không phải nullish. Resend nhận `from: ""` → lỗi "domain is invalid" khó đoán nguyên nhân từ message.
**Bài học**: dùng `||` (không phải `??`) khi fallback cho env var optional có thể là chuỗi rỗng. Chỉ dùng `??` khi phân biệt `0`/`false` hợp lệ với "chưa set" thực sự quan trọng.
Xem `src/app/api/send-daily/route.ts`.

### npm scripts gọi `drizzle-kit`/`tsx` trực tiếp KHÔNG tự load `.env.local`
Chỉ `next dev`/`next build` tự động đọc `.env.local`. Script chạy qua `tsx` hay `drizzle-kit push` thẳng thì không — phải tự gọi `dotenv.config({ path: ".env.local" })` trong file (`drizzle.config.ts`, `src/lib/db/seed.ts`).
**Bẫy đi kèm**: nếu file đó có `import` tĩnh một module khác đọc `process.env` ngay ở top-level (ví dụ `src/lib/db/client.ts` gọi `neon(process.env.DATABASE_URL)` khi module được nạp), import tĩnh bị hoist và chạy TRƯỚC dòng `config()` cùng file → biến env vẫn `undefined`. Phải dùng `import()` động (dynamic import) SAU khi `config()` đã chạy.

### Resend sandbox sender (`onboarding@resend.dev`)
Không cần verify domain để gửi thật, nhưng chỉ gửi được tới đúng email chủ tài khoản Resend. Đủ cho giai đoạn validate 1 người dùng (founder), không đủ khi có nhiều phụ huynh thật — lúc đó phải verify domain riêng (`RESEND_FROM_EMAIL`).

### `flex-1` bên trong container `justify-center` sẽ vô hiệu hoá việc căn giữa
Nếu component con có `flex-1` bên trong 1 flex container cha dùng `justify-center` để căn giữa theo trục dọc, con sẽ tự giãn hết khoảng trống (vì nó là item flex duy nhất) → nội dung bị đẩy lên đầu thay vì căn giữa. Chỉ thêm `flex-1` khi thật sự cần nội dung con lấp đầy khoảng trống còn lại (ví dụ `LetterStack` trên landing, cần chiếm không gian giữa headline và CTA); form/onboarding ngắn thì bỏ `flex-1`, để `justify-center` của cha tự lo.

## Cách tiếp cận (approach)

### Xây luồng core end-to-end trước khi làm UI onboarding/dashboard đầy đủ
Với sản phẩm bắt đầu từ 1 người dùng thật (founder), validate core value prop (chất lượng nội dung AI + gửi được thật) rẻ và nhanh hơn nhiều so với đầu tư UI đa người dùng trước. Cách làm: hardcode config 1 user (`src/lib/config.ts`), bỏ qua bảng `users`/`children` cho tới khi UI onboarding thật sự cần. Xem `master-plan.md` mục "Đổi thứ tự tạm thời (2026-07-01)".

### Preview cá nhân hoá ở onboarding nên là template tĩnh, không gọi AI thật
Bước "xem trước lá thư mẫu" trong onboarding chèn tên/tuổi/sở thích vào 1 câu chuẩn bị sẵn (string interpolation), KHÔNG gọi OpenAI. Vẫn tạo được "aha moment" cá nhân hoá mà không tốn tiền/độ trễ cho mỗi khách ghé xem (kể cả bot). Nội dung AI thật chỉ nên sinh sau khi đã đăng ký, qua cron thật.
