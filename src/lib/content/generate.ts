import { CONFIG } from "@/lib/config";
import { CATEGORY_STYLES, TONE_GUIDE, type Category } from "./category-styles";

export type EmailContent = {
  greeting: string;
  main: string;
  closing: string;
};

// Port nguyên cấu trúc prompt từ scripts/legacy-google-apps-script/suti_daily_email.gs (generateEmailContent)
export async function generateEmailContent(
  topic: { title: string; category: Category; angle: string },
  resource: { label: string; url: string } | null
): Promise<EmailContent> {
  const categoryName = CATEGORY_STYLES[topic.category]?.label ?? topic.category;
  const tone = TONE_GUIDE[topic.category] ?? "ấm áp và khuyến khích";

  const resourceLine = resource
    ? `Có thể tham khảo thêm tại: "${resource.label}" (${resource.url})`
    : "Không có link tham khảo hôm nay, chỉ dựa vào lời khuyên thực tế.";

  const prompt = `
Bạn là một người cha Việt Nam tên ${CONFIG.parentName}, đang viết email hàng ngày cho con gái ${CONFIG.childAge} tuổi tên ${CONFIG.childName}, học lớp 3.
Con gái thích vẽ manga, đọc truyện Doraemon và Miko.

Hôm nay chủ đề là: "${topic.title}" (thuộc mảng: ${categoryName})
Góc độ tiếp cận gợi ý: ${topic.angle}
${resourceLine}

Yêu cầu:
- Viết bằng tiếng Việt, xưng hô: ${CONFIG.parentName} - con
- Giọng điệu: ${tone}
- Viết 3 phần riêng biệt, mỗi phần cách nhau bằng dấu ---:
  1. LỜI CHÀO: 2-3 câu mở đầu ấm áp, tự nhiên như ${CONFIG.parentName.toLowerCase()} đang nói chuyện với con gái
  2. NỘI DUNG CHÍNH: 3-4 câu về chủ đề hôm nay, có thể liên hệ Doraemon/Miko nếu phù hợp, kèm một thử thách nhỏ cụ thể cho con
  3. LỜI KẾT: 1-2 câu kết thúc yêu thương, không sáo rỗng
- Không dùng emoji trong output, sẽ thêm sau
- Không dùng markdown, chỉ văn xuôi thuần
- Giữ ngắn gọn, đọc không quá 1 phút
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: CONFIG.model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400,
      temperature: 0.85,
    }),
  });

  const json = await response.json();
  if (json.error) {
    throw new Error("OpenAI error: " + json.error.message);
  }

  const text: string = json.choices[0].message.content.trim();
  const parts = text.split("---").map((p: string) => p.trim());

  return {
    greeting: parts[0] ?? "",
    main: parts[1] ?? "",
    closing: parts[2] ?? "",
  };
}
