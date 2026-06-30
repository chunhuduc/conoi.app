// ============================================================
// EMAIL HÀNG NGÀY CHO SUTI - Google Apps Script + OpenAI
// Gửi email lúc 7pm (GMT+7) mỗi ngày
// ============================================================

// ⚙️ CẤU HÌNH
const CONFIG = {
  recipientEmail: "chunhuduc@gmail.com",
  childName: "Suti",
  parentName: "Bố",
  openAiApiKey: "YOUR_OPENAI_API_KEY_HERE", // Thay bằng key của bạn
  model: "gpt-4o-mini",
};

// ============================================================
// 📚 DANH SÁCH CHỦ ĐỀ - Bạn có thể thêm/sửa/xóa thoải mái
// Mỗi topic có: title, category, angle, resources[]
// ============================================================
const TOPICS = [

  // 🎨 VẼ & TRUYỆN TRANH
  {
    title: "Cách vẽ mắt manga",
    category: "drawing",
    angle: "Vẽ hình tròn to, thêm bóng sáng nhỏ bên trong để mắt có chiều sâu",
    resources: [
      { label: "Mark Crilley - Vẽ mắt manga", url: "https://www.youtube.com/@markcrilley" },
      { label: "Art Senpai - Mắt anime cơ bản", url: "https://www.youtube.com/@ArtSenpai" },
    ],
  },
  {
    title: "Cách vẽ tóc manga",
    category: "drawing",
    angle: "Vẽ thành từng mảng lớn trước, không vẽ từng sợi",
    resources: [
      { label: "Mark Crilley - Tóc manga", url: "https://www.youtube.com/@markcrilley" },
      { label: "Art for Kids Hub - Tóc anime đơn giản", url: "https://www.youtube.com/@ArtforKidsHub" },
    ],
  },
  {
    title: "Biểu cảm khuôn mặt",
    category: "drawing",
    angle: "Lông mày quyết định cảm xúc: cong xuống là tức, cong lên là ngạc nhiên",
    resources: [
      { label: "Art Senpai - Biểu cảm anime", url: "https://www.youtube.com/@ArtSenpai" },
      { label: "Mark Crilley - Cảm xúc nhân vật", url: "https://www.youtube.com/@markcrilley" },
    ],
  },
  {
    title: "Vẽ nhân vật chibi",
    category: "drawing",
    angle: "Đầu to bằng nửa người, tay chân ngắn tròn, biểu cảm phóng đại",
    resources: [
      { label: "Art for Kids Hub - Chibi cơ bản", url: "https://www.youtube.com/@ArtforKidsHub" },
      { label: "Sophie Chan - Vẽ chibi", url: "https://www.youtube.com/@SophieChan" },
    ],
  },
  {
    title: "Vẽ theo phong cách Doraemon",
    category: "drawing",
    angle: "Nhân vật Doraemon dùng hình tròn là chủ yếu, rất dễ bắt đầu",
    resources: [
      { label: "Art for Kids Hub - Vẽ Doraemon", url: "https://www.youtube.com/results?search_query=how+to+draw+doraemon+for+kids" },
      { label: "Easy Drawing - Doraemon step by step", url: "https://www.youtube.com/results?search_query=doraemon+drawing+tutorial+easy" },
    ],
  },
  {
    title: "Vẽ theo phong cách Miko",
    category: "drawing",
    angle: "Nhân vật Miko có nét vẽ đơn giản, tròn trịa, rất phù hợp để tập",
    resources: [
      { label: "Tìm kiếm: vẽ nhân vật Miko", url: "https://www.youtube.com/results?search_query=how+to+draw+miko+comic+character" },
    ],
  },
  {
    title: "Phác thảo nhân vật bằng hình que",
    category: "drawing",
    angle: "Bắt đầu bằng vòng tròn và đường thẳng, sau đó mặc thịt lên dần",
    resources: [
      { label: "Mark Crilley - Phác thảo nhân vật", url: "https://www.youtube.com/@markcrilley" },
    ],
  },
  {
    title: "Tạo nhân vật của riêng mình",
    category: "drawing",
    angle: "Nghĩ về tính cách trước, rồi mới vẽ ngoại hình",
    resources: [
      { label: "Whyt Manga - Thiết kế nhân vật", url: "https://www.youtube.com/@WhytManga" },
    ],
  },
  {
    title: "Bố cục trang truyện tranh",
    category: "drawing",
    angle: "Chia tờ giấy thành 4-6 ô, kể câu chuyện ngắn có mở đầu và kết thúc",
    resources: [
      { label: "Whyt Manga - Kể chuyện qua manga", url: "https://www.youtube.com/@WhytManga" },
    ],
  },
  {
    title: "Vẽ trên máy tính bảng với MediBang",
    category: "drawing",
    angle: "Vẽ kỹ thuật số có thể xóa thoải mái, không sợ hỏng tác phẩm",
    resources: [
      { label: "MediBang Paint - Hướng dẫn cho người mới", url: "https://www.youtube.com/@MediBangPaint" },
    ],
  },
  {
    title: "Vẽ bong bóng hội thoại trong truyện",
    category: "drawing",
    angle: "Hình oval cho lời nói, hình mây cho suy nghĩ, tia chớp cho tiếng kêu",
    resources: [
      { label: "Whyt Manga - Speech bubbles", url: "https://www.youtube.com/@WhytManga" },
    ],
  },
  {
    title: "Tô bóng đơn giản",
    category: "drawing",
    angle: "Quyết định ánh sáng từ một hướng, vùng ngược lại là bóng tối",
    resources: [
      { label: "Art Senpai - Tô bóng cơ bản", url: "https://www.youtube.com/@ArtSenpai" },
    ],
  },

  // 📖 ĐỌC SÁCH & TRÍ TƯỞNG TƯỢNG
  {
    title: "Tại sao đọc sách lại thú vị",
    category: "reading",
    angle: "Sách là cỗ máy thời gian, mình có thể đến bất cứ đâu chỉ bằng cách đọc",
    resources: [
      { label: "Doraemon - Bộ sưu tập truyện đầy đủ", url: "https://doraemon.fandom.com/wiki/Doraemon_Wiki" },
    ],
  },
  {
    title: "Nhân vật yêu thích của con là ai và tại sao",
    category: "reading",
    angle: "Suy nghĩ về điều mình thích ở nhân vật giúp mình hiểu bản thân hơn",
    resources: [],
  },
  {
    title: "Nếu con là Doraemon",
    category: "reading",
    angle: "Con sẽ phát minh ra cái gì để giúp mọi người? Sáng tạo không có giới hạn",
    resources: [],
  },
  {
    title: "Viết một câu chuyện ngắn của riêng mình",
    category: "reading",
    angle: "Chỉ cần 5 câu: Ai? Ở đâu? Chuyện gì xảy ra? Vấn đề? Giải quyết thế nào?",
    resources: [],
  },

  // 🌱 KỸ NĂNG SỐNG
  {
    title: "Cách dọn dẹp phòng của mình",
    category: "lifeskill",
    angle: "Mỗi thứ có một chỗ riêng, khi dùng xong trả về đúng chỗ",
    resources: [],
  },
  {
    title: "Cách xin lỗi thật lòng",
    category: "lifeskill",
    angle: "Xin lỗi thật sự có 3 bước: nhận lỗi, nói lý do tại sao sai, hứa không làm nữa",
    resources: [],
  },
  {
    title: "Cách kết bạn mới",
    category: "lifeskill",
    angle: "Hỏi một câu đơn giản là đủ để bắt đầu: 'Bạn thích vẽ không?'",
    resources: [],
  },
  {
    title: "Quản lý tiền tiêu vặt",
    category: "lifeskill",
    angle: "Chia tiền thành 3 phần: tiêu hôm nay, tiết kiệm, mua thứ mình mơ ước",
    resources: [],
  },
  {
    title: "Khi cảm thấy buồn hoặc tức giận",
    category: "lifeskill",
    angle: "Hít thở sâu 4 giây, giữ 4 giây, thở ra 4 giây. Cảm xúc sẽ dịu lại",
    resources: [],
  },
  {
    title: "Giúp đỡ việc nhà",
    category: "lifeskill",
    angle: "Mỗi người trong gia đình đều có phần trách nhiệm, kể cả con",
    resources: [],
  },
  {
    title: "Cách chia sẻ với bạn bè",
    category: "lifeskill",
    angle: "Chia sẻ không làm mình mất đi thứ gì, ngược lại còn được thêm một người bạn",
    resources: [],
  },
  {
    title: "Tự chăm sóc bản thân",
    category: "lifeskill",
    angle: "Ngủ đủ giấc, uống đủ nước, vận động mỗi ngày, đó là nền tảng của mọi thứ",
    resources: [],
  },

  // 📚 HỌC TẬP - LỚP 3
  {
    title: "Cách tập trung học bài tốt hơn",
    category: "study",
    angle: "Học 25 phút, nghỉ 5 phút. Não con người hoạt động tốt nhất theo chu kỳ ngắn",
    resources: [],
  },
  {
    title: "Ghi chép bài học bằng hình vẽ",
    category: "study",
    angle: "Vẽ sơ đồ hoặc hình ảnh thay vì chép lại nguyên văn, dễ nhớ hơn nhiều",
    resources: [],
  },
  {
    title: "Cách học bảng cửu chương vui hơn",
    category: "study",
    angle: "Biến bảng cửu chương thành bài hát hoặc vẽ hình minh họa cho mỗi phép tính",
    resources: [],
  },
  {
    title: "Thói quen đọc sách 15 phút mỗi ngày",
    category: "study",
    angle: "15 phút mỗi ngày = hơn 90 giờ đọc sách mỗi năm. Nhỏ mà không nhỏ chút nào",
    resources: [],
  },
  {
    title: "Cách sắp xếp cặp sách gọn gàng",
    category: "study",
    angle: "Tối hôm trước chuẩn bị cặp sách cho ngày mai, sáng sẽ không bao giờ quên đồ",
    resources: [],
  },
  {
    title: "Học tiếng Anh qua truyện tranh",
    category: "study",
    angle: "Tìm bản tiếng Anh của Doraemon, đọc song song với bản tiếng Việt để học từ mới",
    resources: [
      { label: "Doraemon tiếng Anh cho trẻ em", url: "https://www.youtube.com/results?search_query=doraemon+english+for+kids" },
    ],
  },

  // 🌍 KHÁM PHÁ THẾ GIỚI
  {
    title: "Anime và manga được làm như thế nào",
    category: "explore",
    angle: "Mỗi tập anime cần hàng trăm họa sĩ vẽ hàng ngàn hình, ghép lại thành phim",
    resources: [
      { label: "How anime is made - for kids", url: "https://www.youtube.com/results?search_query=how+is+anime+made+for+kids" },
    ],
  },
  {
    title: "Văn hóa Nhật Bản - quê hương của manga",
    category: "explore",
    angle: "Manga ra đời ở Nhật Bản, đất nước nổi tiếng với sự cẩn thận và sáng tạo",
    resources: [
      { label: "Japan culture for kids", url: "https://www.youtube.com/results?search_query=japan+culture+for+kids" },
    ],
  },
  {
    title: "Tại sao bầu trời màu xanh",
    category: "explore",
    angle: "Ánh sáng mặt trời gồm nhiều màu, không khí làm màu xanh tán xạ nhiều nhất",
    resources: [
      { label: "Why is the sky blue - kids science", url: "https://www.youtube.com/results?search_query=why+is+sky+blue+for+kids" },
    ],
  },
  {
    title: "Những nữ họa sĩ nổi tiếng thế giới",
    category: "explore",
    angle: "Rumiko Takahashi là nữ mangaka giàu nhất Nhật Bản, bắt đầu từ đam mê vẽ",
    resources: [],
  },
  {
    title: "Động vật ở Việt Nam mình chưa biết",
    category: "explore",
    angle: "Việt Nam có sao la, voọc mũi hếch, và nhiều loài đặc hữu không nơi nào có",
    resources: [
      { label: "Wildlife of Vietnam for kids", url: "https://www.youtube.com/results?search_query=animals+of+vietnam+for+kids" },
    ],
  },
];

// ============================================================
// 🎨 MÀU SẮC THEO CATEGORY
// ============================================================
const CATEGORY_STYLES = {
  drawing:   { emoji: "🎨", label: "Vẽ & Truyện Tranh",    color: "#e05c8a", light: "#fff0f5" },
  reading:   { emoji: "📖", label: "Đọc Sách & Tưởng Tượng", color: "#5c8ae0", light: "#f0f5ff" },
  lifeskill: { emoji: "🌱", label: "Kỹ Năng Sống",          color: "#5cb85c", light: "#f0fff0" },
  study:     { emoji: "📚", label: "Học Tập",               color: "#e09a5c", light: "#fff8f0" },
  explore:   { emoji: "🌍", label: "Khám Phá Thế Giới",     color: "#9a5ce0", light: "#f8f0ff" },
};

// ============================================================
// 🔧 UTILITIES
// ============================================================
function getProperties() {
  return PropertiesService.getScriptProperties();
}

function getDayIndex() {
  const props = getProperties();
  const index = parseInt(props.getProperty("DAY_INDEX") || "0");
  return index;
}

function incrementDayIndex() {
  const props = getProperties();
  const current = getDayIndex();
  const next = (current + 1) % TOPICS.length;
  props.setProperty("DAY_INDEX", next.toString());
}

function getUsedUrls() {
  const props = getProperties();
  const raw = props.getProperty("USED_URLS") || "";
  return raw ? raw.split(",") : [];
}

function saveUsedUrl(url) {
  const props = getProperties();
  const used = getUsedUrls();
  used.push(url);
  props.setProperty("USED_URLS", used.join(","));
}

function pickUnusedResource(resources) {
  if (!resources || resources.length === 0) return null;
  const used = getUsedUrls();
  const unused = resources.filter(r => !used.includes(r.url));
  if (unused.length === 0) {
    // All used, reset and start again
    const props = getProperties();
    props.setProperty("USED_URLS", "");
    return resources[0];
  }
  return unused[0];
}

function getFormattedDate() {
  const today = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric", timeZone: "Asia/Ho_Chi_Minh" };
  return today.toLocaleDateString("vi-VN", options);
}

// ============================================================
// 🤖 OPENAI CALL
// ============================================================
function generateEmailContent(topic, resource) {
  const categoryName = CATEGORY_STYLES[topic.category]?.label || topic.category;

  const resourceLine = resource
    ? `Có thể tham khảo thêm tại: "${resource.label}" (${resource.url})`
    : "Không có link tham khảo hôm nay, chỉ dựa vào lời khuyên thực tế.";

  const toneGuide = {
    drawing:   "vui vẻ, hào hứng, như đang cùng con khám phá một trò chơi mới",
    reading:   "tò mò, kích thích trí tưởng tượng, như đang mở cánh cửa vào một thế giới mới",
    lifeskill: "nhẹ nhàng, khôn ngoan, như chia sẻ một bí quyết cuộc sống từ trái tim",
    study:     "kiên nhẫn, động viên, như một người thầy thương học trò",
    explore:   "ngạc nhiên, thú vị, như đang cùng nhau khám phá điều kỳ diệu",
  };

  const tone = toneGuide[topic.category] || "ấm áp và khuyến khích";

  const prompt = `
Bạn là một người cha Việt Nam tên ${CONFIG.parentName}, đang viết email hàng ngày cho con gái 9 tuổi tên ${CONFIG.childName}, học lớp 3.
Con gái thích vẽ manga, đọc truyện Doraemon và Miko.

Hôm nay chủ đề là: "${topic.title}" (thuộc mảng: ${categoryName})
Góc độ tiếp cận gợi ý: ${topic.angle}
${resourceLine}

Yêu cầu:
- Viết bằng tiếng Việt, xưng hô: Bố - con
- Giọng điệu: ${tone}
- Viết 3 phần riêng biệt, mỗi phần cách nhau bằng dấu ---:
  1. LỜI CHÀO: 2-3 câu mở đầu ấm áp, tự nhiên như bố đang nói chuyện với con gái
  2. NỘI DUNG CHÍNH: 3-4 câu về chủ đề hôm nay, có thể liên hệ Doraemon/Miko nếu phù hợp, kèm một thử thách nhỏ cụ thể cho con
  3. LỜI KẾT: 1-2 câu kết thúc yêu thương, không sáo rỗng
- Không dùng emoji trong output, tôi sẽ thêm sau
- Không dùng markdown, chỉ văn xuôi thuần
- Giữ ngắn gọn, đọc không quá 1 phút
`;

  const payload = {
    model: CONFIG.model,
    messages: [{ role: "user", content: prompt }],
    max_tokens: 400,
    temperature: 0.85,
  };

  const options = {
    method: "post",
    contentType: "application/json",
    headers: { Authorization: "Bearer " + CONFIG.openAiApiKey },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch("https://api.openai.com/v1/chat/completions", options);
  const json = JSON.parse(response.getContentText());

  if (json.error) {
    throw new Error("OpenAI error: " + json.error.message);
  }

  const text = json.choices[0].message.content.trim();
  const parts = text.split("---").map(p => p.trim());

  return {
    greeting: parts[0] || "",
    main: parts[1] || "",
    closing: parts[2] || "",
  };
}

// ============================================================
// 📧 BUILD & SEND EMAIL
// ============================================================
function buildEmailHtml(topic, content, resource, dateStr) {
  const style = CATEGORY_STYLES[topic.category] || CATEGORY_STYLES.drawing;

  const resourceBlock = resource ? `
    <h2 style="color:${style.color}; border-bottom: 2px solid ${style.light}; padding-bottom: 8px;">📺 Tham Khảo Thêm</h2>
    <p style="font-size:15px; line-height:1.8;">
      👉 <a href="${resource.url}" style="color:${style.color}; font-weight:bold;">${resource.label}</a>
    </p>
  ` : "";

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
      <p style="margin: 12px 0 0 0; font-size: 18px; color: ${style.color}; font-weight: bold;">Bố yêu Suti nhiều lắm! ❤️</p>
    </div>

  </div>

  <div style="background: #f5f5f5; padding: 12px; text-align: center; border-radius: 0 0 12px 12px;">
    <p style="color: #aaa; font-size: 11px; margin: 0;">Email này được Bố gửi tự động mỗi tối cho Suti 💌</p>
  </div>

</body>
</html>`;
}

// ============================================================
// 🚀 HÀM CHÍNH - Đây là hàm bạn đặt trigger
// ============================================================
function sendDailyEmail() {
  const dayIndex = getDayIndex();
  const topic = TOPICS[dayIndex];
  const resource = pickUnusedResource(topic.resources);
  const dateStr = getFormattedDate();

  // Generate AI content
  const content = generateEmailContent(topic, resource);

  // Build HTML
  const htmlBody = buildEmailHtml(topic, content, resource, dateStr);

  // Send email
  GmailApp.sendEmail(
    CONFIG.recipientEmail,
    `${CATEGORY_STYLES[topic.category]?.emoji || "✉️"} ${topic.title} — Bố gửi Suti`,
    "",
    { htmlBody: htmlBody }
  );

  // Save used URL and advance day index
  if (resource) saveUsedUrl(resource.url);
  incrementDayIndex();

  Logger.log("Sent day " + dayIndex + ": " + topic.title);
}

// ============================================================
// 🧪 TEST - Chạy hàm này để xem thử mà không tốn API call
// ============================================================
function previewTodayTopic() {
  const dayIndex = getDayIndex();
  const topic = TOPICS[dayIndex];
  Logger.log("Day " + dayIndex + " | Category: " + topic.category + " | Topic: " + topic.title);
  Logger.log("Angle: " + topic.angle);
}
