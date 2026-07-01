import { CONFIG } from "@/lib/config";
import { CATEGORY_STYLES, type Category } from "@/lib/content/category-styles";
import type { EmailContent } from "@/lib/content/generate";

// Port từ scripts/legacy-google-apps-script/suti_daily_email.gs (buildEmailHtml)
export function buildEmailHtml(
  topic: { title: string; category: Category },
  content: EmailContent,
  resource: { label: string; url: string } | null,
  dateStr: string
) {
  const style = CATEGORY_STYLES[topic.category] ?? CATEGORY_STYLES.drawing;

  const resourceBlock = resource
    ? `
    <h2 style="color:${style.color}; border-bottom: 2px solid ${style.light}; padding-bottom: 8px;">📺 Tham Khảo Thêm</h2>
    <p style="font-size:15px; line-height:1.8;">
      👉 <a href="${resource.url}" style="color:${style.color}; font-weight:bold;">${resource.label}</a>
    </p>
  `
    : "";

  return `<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; background: #fff;">

  <div style="background: linear-gradient(135deg, ${style.color}, ${style.light}); padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
    <p style="color: white; margin: 0 0 4px 0; font-size: 13px; opacity: 0.9;">${style.emoji} ${style.label}</p>
    <h1 style="color: white; margin: 0; font-size: 20px;">${topic.title}</h1>
    <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0 0; font-size: 13px;">${dateStr}</p>
  </div>

  <div style="padding: 24px; background: ${style.light}; border-left: 4px solid ${style.color};">
    <p style="font-size: 15px; line-height: 1.8; margin: 0; white-space: pre-line;">${content.greeting}</p>
  </div>

  <div style="padding: 24px;">

    <h2 style="color:${style.color}; border-bottom: 2px solid ${style.light}; padding-bottom: 8px;">💡 Hôm Nay Mình Nói Về...</h2>
    <p style="font-size: 15px; line-height: 1.8; background: ${style.light}; padding: 16px; border-radius: 8px; white-space: pre-line;">${content.main}</p>

    ${resourceBlock}

    <div style="background: ${style.light}; border-radius: 8px; padding: 20px; margin-top: 24px; text-align: center; border-top: 3px solid ${style.color};">
      <p style="font-size: 15px; line-height: 1.8; margin: 0; color: #555; white-space: pre-line;">${content.closing}</p>
      <p style="margin: 12px 0 0 0; font-size: 18px; color: ${style.color}; font-weight: bold;">${CONFIG.parentName} yêu ${CONFIG.childName} nhiều lắm! ❤️</p>
    </div>

  </div>

  <div style="background: #f5f5f5; padding: 12px; text-align: center; border-radius: 0 0 12px 12px;">
    <p style="color: #aaa; font-size: 11px; margin: 0;">Email này được ${CONFIG.parentName} gửi tự động mỗi tối cho ${CONFIG.childName} 💌</p>
  </div>

</body>
</html>`;
}

export function getFormattedDate() {
  const today = new Date();
  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(today);
}
