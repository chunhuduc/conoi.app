# Design System — ConOi

> Guideline thiết kế đã chốt, rút ra từ landing page hiện tại (`src/app/page.tsx`, `src/app/letter-stack.tsx`, `src/app/globals.css`, `src/app/layout.tsx`). **Mọi feature/màn hình mới phải tuân theo file này để giữ tính nhất quán.** Khi cần lệch khỏi guideline, ghi rõ lý do và cập nhật lại file này.

## 1. Tinh thần thiết kế (đọc trước khi code UI)

ConOi là lá thư hằng ngày từ cha mẹ gửi con. Giao diện phải cho cảm giác **ấm áp, thật, như thư tay**, KHÔNG giống dashboard SaaS hay newsletter công nghiệp.

Năm nguyên tắc cốt lõi:

1. **Ấm & con người** — palette màu đất/san hô ấm, nền có chiều sâu nhẹ (gradient), bo góc mềm. Không xám lạnh, không xanh tech, không gradient sặc sỡ.
2. **Tối giản, để cảm xúc dẫn dắt** — mỗi màn hình một thông điệp/hành động chính. Cắt chữ thừa. Không liệt kê tính năng dày đặc. Khoảng trắng rộng rãi.
3. **Lá thư là nhân vật chính** — nội dung thư (giọng cha mẹ) là trung tâm thị giác, mọi thứ khác là bệ đỡ.
4. **Chạm được, có "vật lý"** — nghiêng nhẹ, xếp chồng, bóng đổ ấm, animation gợi ý tương tác. Giao diện như giấy đặt trên bàn.
5. **Tiếng Việt, sentence case, xưng hô cha mẹ – con** — không Title Case, không ALL CAPS (trừ nhãn nhỏ uppercase có chủ đích), không giọng "dạy đời".

## 2. Màu sắc (đã khai báo trong `globals.css` qua `@theme inline`)

Dùng qua Tailwind utility (`bg-coral-600`, `text-cream-50`…). **KHÔNG hardcode hex trong JSX.** Khi cần màu mới, thêm token vào `@theme` trước.

| Token | Hex | Vai trò |
|---|---|---|
| `cream-50` | `#fdf6f1` | Nền sáng nhất; chữ trên nền tối (CTA) |
| `cream-100` | `#fbeee6` | Lá thư phía sau trong chồng |
| `coral-50` | `#faece7` | Nền chip/avatar/con dấu; nền lá thư phụ |
| `coral-100` | `#f6ddd1` | Nền nhấn nhẹ |
| `coral-200` | `#f0997b` | Dot chỉ báo (chưa active) |
| `coral-400` | `#d85a30` | Nhãn category, chi tiết phụ |
| `coral-600` | `#993c1d` | Chữ phụ đậm, dot active, chữ ký |
| `coral-800` | `#712b13` | Wordmark, chữ phụ; dùng kèm opacity (`/80`, `/55`, `/50`) cho chữ mờ |
| `coral-900` | `#4a1b0c` | Headline, chữ chính, nền CTA |
| `--foreground` | `#2c2c2a` | Body text mặc định (nâu gần đen) |

Nền trang: gradient ấm `radial-gradient(120% 120% at 50% 0%, #fdf6f1 0%, #f9e8e0 55%, #f3d6c8 100%)`. Thêm một "vầng sáng" tròn mờ phía trên gợi nắng sớm (xem `page.tsx`).

Quy tắc chữ trên nền màu: chữ trên nền san hô/kem luôn dùng `coral-900`/`coral-800`/`coral-600`, **không bao giờ** đen thuần hay xám. Tạo độ mờ bằng opacity của coral (`text-coral-800/80`) — KHÔNG dùng màu xám riêng.

## 3. Typography

Ba họ chữ, mỗi họ một vai trò rõ ràng (khai báo ở `layout.tsx`, subset `latin` + `vietnamese`):

| Biến | Font | Dùng cho | Weights |
|---|---|---|---|
| `font-sans` | Be Vietnam Pro | UI chrome: nút, nhãn, meta, chữ phụ | 400, 500 |
| `font-serif` | Noto Serif | "Giọng nói": headline + **nội dung lá thư** | 400, 500, 600 |
| `font-script` | Caveat | Chỉ chữ ký cuối thư ("— Ba") | 500, 600 |

Thang cỡ chữ đang dùng:
- Headline: `text-[2.1rem]` (mobile) → `sm:text-[2.6rem]`, `font-semibold`, `leading-[1.25]`, `font-serif`, màu `coral-900`.
- Câu dẫn (subline): `text-[15px]`, `leading-relaxed`, `text-coral-800/80`, giới hạn `max-w-sm`.
- Nội dung thư: `font-serif text-[15px] leading-loose text-coral-900/90`.
- Tên/nhãn UI: `text-sm font-medium`.
- Meta/phụ: `text-xs` hoặc `text-[11px]`, màu coral mờ.
- Chữ ký: `font-script text-2xl text-coral-600`.

Chỉ dùng 2 độ đậm: 400 và 500 (riêng headline 600). Sentence case mọi nơi. Nhãn uppercase nhỏ (category, ngày) thì thêm `tracking-wide` và cỡ rất nhỏ (`text-[10px]`/`text-[11px]`).

## 4. Hình khối, bóng, khoảng cách

- **Bo góc**: thẻ/lá thư `rounded-2xl`; chip/con dấu `rounded-lg`; nút và dot `rounded-full`.
- **Bóng đổ**: luôn ấm (gốc nâu `rgba(120,50,20,…)` hoặc `rgba(74,27,12,…)`), không dùng bóng xám/đen trung tính.
  - Lá thư: `shadow-[0_20px_50px_-20px_rgba(120,50,20,0.4)]`.
  - Lá phía sau: `shadow-[0_8px_30px_-12px_rgba(120,50,20,0.25)]`.
  - Nút CTA: `shadow-[0_10px_25px_-10px_rgba(74,27,12,0.7)]`.
- **Viền**: rất mảnh, dùng coral mờ: `ring-1 ring-coral-900/5`, hoặc `border-coral-900/8`.
- **Khoảng cách**: padding thẻ `p-7`; nhịp dọc rộng (`mt-5`, `mt-9`, `mt-12`, `mt-14`). Container nội dung căn giữa, `max-w-xl` cho cả khối, `max-w-sm`/`max-w-md` cho từng phần text/thẻ.

## 5. Component patterns

### Nút CTA chính
`inline-flex h-12 items-center gap-2 rounded-full bg-coral-900 px-7 text-sm font-medium text-cream-50` + bóng ấm + `transition-all hover:-translate-y-0.5 hover:bg-coral-800`. Mũi tên `→` đặt trong `<span aria-hidden>`. Mỗi màn hình chỉ **một** CTA chính. Dưới nút có thể thêm microcopy `text-xs text-coral-800/55` (ví dụ "Miễn phí cho 1 con · Thiết lập trong 2 phút").

### Wordmark
Icon outline (stroke `currentColor`, `strokeWidth ~1.8`, bo tròn đầu nét) + chữ `text-sm font-medium tracking-wide`, màu `coral-800`. Icon tự vẽ theo phong cách outline mảnh, KHÔNG dùng icon đặc/filled.

### Lá thư (letter card) — pattern chữ ký của sản phẩm
Cấu trúc cố định, tái dùng ở mọi nơi hiển thị thư:
1. Header: avatar tròn `h-9 w-9 bg-coral-50 text-coral-600` (chữ cái đầu người gửi) + tên `text-sm font-medium text-coral-900` + meta `text-xs text-coral-800/50`; bên phải là **con dấu ngày** (`rounded-lg bg-coral-50`, nhãn ngày `text-[10px] uppercase tracking-wide`, giờ `text-base font-semibold`).
2. Nhãn category: `text-[11px] font-medium uppercase tracking-wide text-coral-400`.
3. Nội dung: `font-serif text-[15px] leading-loose text-coral-900/90`.
4. Chữ ký: `font-script text-2xl text-coral-600`, dạng "— {người gửi}".

Người gửi (Ba/Mẹ/…) và tên con luôn là **biến số**, không hardcode.

### Chỉ báo nhiều mục (dots) — tuỳ chọn, KHÔNG dùng mặc định trên landing
Dãy chấm `h-1.5 rounded-full`: active `w-5 bg-coral-600`, thường `w-1.5 bg-coral-200`, `transition-all duration-300`. Landing page hiện chỉ giữ dòng hint chữ ("Vuốt hoặc chạm để đọc thư khác"), không hiện dots — bố cục gọn hơn. Pattern dots vẫn còn trong `LetterStack` qua prop `showIndicator` (mặc định `false`), dùng khi có màn hình cần biết rõ "đang ở thư thứ mấy / tổng bao nhiêu" (ví dụ trang xem lại toàn bộ thư).

## 6. Chuyển động & tương tác

- **Gợi ý tương tác khi idle**: nếu một phần tử có thể tương tác mà không hiển nhiên, thêm hint động nhẹ (lá thư khẽ "nhích/hé") + một dòng chữ gợi ý mờ dần. Tắt hint ngay khi người dùng chạm.
- **Hướng chuyển động khớp input**: vuốt/bấm trái → bay trái; phải → bay phải. Trên mobile, kéo bám theo ngón tay; thả qua ngưỡng thì hoàn tất, chưa đủ thì trượt về.
- **Easing**: vào/di chuyển dùng `cubic-bezier(0.34,1.2,0.64,1)` (~380ms, hơi nảy); thoát/bay đi dùng `cubic-bezier(0.45,0,0.7,0.2)` (~420ms). Container đổi kích thước theo nội dung mới (`height` có transition).
- **Bàn phím**: phần tử tương tác cần `role="button"`, `tabIndex={0}`, `aria-label`, hỗ trợ Enter/Space và mũi tên; có `focus-visible:ring-2 focus-visible:ring-coral-400`.
- **`prefers-reduced-motion`**: luôn có nhánh giảm chuyển động (tắt hint, rút gọn animation). Đã xử lý trong `globals.css` và `letter-stack.tsx`.

## 7. Bẫy kỹ thuật BẮT BUỘC tránh (đã từng dính)

- **Hydration mismatch từ inline-style transform**: KHÔNG dùng `Math.random()` hay `Math.sin()` trong render để sinh giá trị transform (server/client lệch nhau). Dùng hàm tất định theo seed bằng phép nguyên/bitwise (`Math.imul`, dịch bit), và **làm tròn mọi số đưa vào transform tới 3 chữ số** (`Math.round(n*1000)/1000`) để chuỗi ngắn, round-trip y hệt qua trình duyệt. Chi tiết: memory `ssr-inline-style-hydration`.
- **Tailwind v4 + Turbopack cache**: thêm token màu mới vào `@theme` mà class không ăn màu → `rm -rf .next` rồi khởi động lại dev server (hot reload không đủ). Chi tiết: memory `tailwind-turbopack-cache`.
- **State trong gesture nhanh**: đọc giá trị mới nhất từ `ref`, đừng dựa vào React state (có thể chưa re-render giữa các event move/up).
- **Side effect trong updater**: không gọi hàm có side effect (cấp phát id, lấy phần tử kế tiếp) bên trong updater của `setState` — StrictMode gọi 2 lần ở dev. Tính sẵn ngoài updater.

## 8. Stack & quy ước code (nhắc lại từ CLAUDE.md)

- Next.js (App Router) + Tailwind v4 (config-less, `@theme inline` trong `globals.css`) + TypeScript.
- Server Component mặc định; chỉ `"use client"` khi cần tương tác (như `LetterStack`).
- Dữ liệu seed tách module riêng (`src/data/`), kiểu hoá rõ ràng, comment chỗ sẽ thay bằng DB — UI không phụ thuộc nguồn.
- Comment giải thích business logic bằng tiếng Việt; tên biến/hàm tiếng Anh.
