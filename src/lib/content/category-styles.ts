// Port từ scripts/legacy-google-apps-script/suti_daily_email.gs (CATEGORY_STYLES + toneGuide)
export const CATEGORY_STYLES = {
  drawing: { emoji: "🎨", label: "Vẽ & Truyện Tranh", color: "#e05c8a", light: "#fff0f5" },
  reading: { emoji: "📖", label: "Đọc Sách & Tưởng Tượng", color: "#5c8ae0", light: "#f0f5ff" },
  lifeskill: { emoji: "🌱", label: "Kỹ Năng Sống", color: "#5cb85c", light: "#f0fff0" },
  study: { emoji: "📚", label: "Học Tập", color: "#e09a5c", light: "#fff8f0" },
  explore: { emoji: "🌍", label: "Khám Phá Thế Giới", color: "#9a5ce0", light: "#f8f0ff" },
} as const;

export type Category = keyof typeof CATEGORY_STYLES;

export const TONE_GUIDE: Record<Category, string> = {
  drawing: "vui vẻ, hào hứng, như đang cùng con khám phá một trò chơi mới",
  reading: "tò mò, kích thích trí tưởng tượng, như đang mở cánh cửa vào một thế giới mới",
  lifeskill: "nhẹ nhàng, khôn ngoan, như chia sẻ một bí quyết cuộc sống từ trái tim",
  study: "kiên nhẫn, động viên, như một người thầy thương học trò",
  explore: "ngạc nhiên, thú vị, như đang cùng nhau khám phá điều kỳ diệu",
};
