import type { Metadata } from "next";
import { Be_Vietnam_Pro, Noto_Serif, Caveat } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500"],
});

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
});

// Chữ ký tay — chỉ dùng cho chữ ký "Ba" (không dấu) nên subset latin là đủ
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600"],
});

export const metadata: Metadata = {
  title: "ConOi — Mỗi ngày một lá thư cho con",
  description:
    "Email hàng ngày viết riêng cho con bạn, bằng đúng giọng văn của ba hoặc mẹ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} ${notoSerif.variable} ${caveat.variable} antialiased`}
    >
      <body className="min-h-dvh flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
