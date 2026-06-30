// ============================================================
// MANGA DAILY EMAIL - Google Apps Script
// Gửi email hàng ngày lúc 7pm (GMT+7) cho con gái về vẽ manga
// ============================================================

// ⚙️ CẤU HÌNH - Chỉnh sửa ở đây
const CONFIG = {
  recipientEmail: "chunhuduc@gmail.com",
  childName: "con",  // Tên con gái của bạn (thay nếu muốn)
};

// 📚 Nội dung xoay vòng theo từng ngày
const DAILY_CONTENT = [
  {
    subject: "🎨 Hôm nay mình tập vẽ mắt nhé con!",
    tip: "Mắt là linh hồn của nhân vật manga. Ba thấy con hay vẽ nhân vật, vậy hôm nay mình thử tập vẽ đôi mắt thật đẹp nhé. Bí quyết là vẽ một hình tròn to trước, sau đó thêm phần bóng sáng nhỏ bên trong để mắt có chiều sâu.",
    challenge: "Thử vẽ 5 kiểu mắt khác nhau: vui, buồn, ngạc nhiên, tức giận, và mơ màng.",
    youtube: { title: "Mark Crilley - Cách vẽ mắt manga", url: "https://www.youtube.com/@markcrilley" },
  },
  {
    subject: "✏️ Hôm nay mình tập vẽ tóc manga nhé con!",
    tip: "Tóc trong manga không vẽ từng sợi một đâu con ơi. Bí quyết là vẽ thành từng mảng lớn trước, rồi mới thêm vài đường nét để tạo chiều. Ba thấy nhiều bạn vẽ rất đẹp chỉ bằng 3-4 mảng tóc thôi!",
    challenge: "Hôm nay vẽ thử 3 kiểu tóc: tóc thẳng dài, tóc xoăn ngắn, và tóc buộc đuôi ngựa.",
    youtube: { title: "Art for Kids Hub - Tóc anime đơn giản", url: "https://www.youtube.com/@ArtforKidsHub" },
  },
  {
    subject: "😊 Hôm nay mình tập vẽ biểu cảm khuôn mặt nhé con!",
    tip: "Nhân vật manga hay vì biểu cảm rất phong phú. Ba thấy bí quyết đơn giản nhất là: lông mày quyết định cảm xúc. Lông mày cong xuống là tức, cong lên là ngạc nhiên, thẳng là bình thường. Con thử xem!",
    challenge: "Vẽ cùng một khuôn mặt nhưng thay đổi lông mày và miệng để tạo 4 biểu cảm khác nhau.",
    youtube: { title: "Art Senpai - Biểu cảm anime cơ bản", url: "https://www.youtube.com/@ArtSenpai" },
  },
  {
    subject: "🖊️ Hôm nay mình học cách phác thảo nhân vật nhé con!",
    tip: "Trước khi vẽ nhân vật, hãy bắt đầu bằng hình que đơn giản. Vẽ vòng tròn cho đầu, đường thẳng cho thân và tay chân. Sau đó 'mặc thịt' lên dần. Ba hồi nhỏ không biết bí quyết này nên vẽ rất khó, con học sớm hơn ba nhiều rồi đó!",
    challenge: "Phác thảo 2 nhân vật: một đang đứng và một đang ngồi, chỉ dùng hình que trước.",
    youtube: { title: "Mark Crilley - Phác thảo nhân vật manga", url: "https://www.youtube.com/@markcrilley" },
  },
  {
    subject: "🌟 Hôm nay mình tạo nhân vật của riêng con nhé!",
    tip: "Nhân vật hay nhất không phải copy từ manga khác, mà là nhân vật do chính mình nghĩ ra. Hãy thử: nhân vật của con có sức mạnh gì? Mặc gì? Tính cách như thế nào? Viết ra trước rồi mới vẽ nhé.",
    challenge: "Tạo một nhân vật hoàn toàn mới của riêng con. Đặt tên, viết 3 điều về tính cách, rồi vẽ họ.",
    youtube: { title: "Whyt Manga - Thiết kế nhân vật từ đầu", url: "https://www.youtube.com/@WhytManga" },
  },
  {
    subject: "📱 Hôm nay mình thử vẽ trên máy tính bảng nhé con!",
    tip: "Vẽ kỹ thuật số thú vị lắm vì mình có thể xóa và sửa thoải mái mà không tốn giấy. Con hãy mở app MediBang Paint hoặc ibisPaint X trên máy tính bảng và thử vẽ một nhân vật yêu thích nhé!",
    challenge: "Vẽ lại một nhân vật mà con đã vẽ trên giấy, lần này trên máy tính bảng. So sánh xem cái nào con thích hơn.",
    youtube: { title: "Hướng dẫn dùng MediBang Paint cho người mới", url: "https://www.youtube.com/@MediBangPaint" },
  },
  {
    subject: "📖 Hôm nay mình tập vẽ khung truyện manga nhé con!",
    tip: "Manga hay ở chỗ kể chuyện qua những ô hình (gọi là panel). Thử chia một tờ giấy thành 4-6 ô hình, rồi kể một câu chuyện ngắn trong đó. Không cần dài, chỉ cần có mở đầu, diễn biến, và kết thúc là đủ!",
    challenge: "Kể một câu chuyện ngắn 4 panel: sáng con thức dậy, đi học, có chuyện gì đó vui/buồn xảy ra, và kết thúc.",
    youtube: { title: "Whyt Manga - Cách kể chuyện qua manga", url: "https://www.youtube.com/@WhytManga" },
  },
];

function getDailyContent() {
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  return DAILY_CONTENT[dayOfYear % DAILY_CONTENT.length];
}

function getFormattedDate() {
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Ho_Chi_Minh' };
  return today.toLocaleDateString('vi-VN', options);
}

function sendDailyMangaEmail() {
  const content = getDailyContent();
  const dateStr = getFormattedDate();

  const htmlBody = `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; background: #fff;">

  <div style="background: linear-gradient(135deg, #ff9a9e, #fecfef); padding: 24px; border-radius: 12px 12px 0 0; text-align: center;">
    <h1 style="color: white; margin: 0; font-size: 22px;">✏️ Góc Vẽ Của Con</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 6px 0 0 0; font-size: 14px;">${dateStr}</p>
  </div>

  <div style="padding: 24px; background: #fff8fc; border-left: 4px solid #ff9a9e;">
    <p style="font-size: 16px; line-height: 1.7; margin: 0;">
      Chào ${CONFIG.childName} yêu của ba! 🌸<br/><br/>
      Hôm nay ba lại ghé qua "góc vẽ" của mình rồi đây. Ba luôn thấy vui mỗi khi thấy con ngồi vẽ, dù là vẽ trên giấy hay trên máy tính bảng. Đó là lúc con đang tạo ra một thế giới riêng của mình đó!
    </p>
  </div>

  <div style="padding: 24px;">

    <h2 style="color: #e05c8a; border-bottom: 2px solid #fecfef; padding-bottom: 8px;">💡 Mẹo Vẽ Hôm Nay</h2>
    <p style="font-size: 15px; line-height: 1.8; background: #fff8fc; padding: 16px; border-radius: 8px;">
      ${content.tip}
    </p>

    <h2 style="color: #e05c8a; border-bottom: 2px solid #fecfef; padding-bottom: 8px;">🎯 Thử Thách Của Con Hôm Nay</h2>
    <p style="font-size: 15px; line-height: 1.8; background: #fff0f5; padding: 16px; border-radius: 8px; border-left: 4px solid #ff9a9e;">
      ${content.challenge}
    </p>

    <h2 style="color: #e05c8a; border-bottom: 2px solid #fecfef; padding-bottom: 8px;">📺 Video Gợi Ý</h2>
    <p style="font-size: 15px; line-height: 1.8;">
      Nếu con muốn xem thêm hướng dẫn, hãy tìm:<br/>
      👉 <a href="${content.youtube.url}" style="color: #e05c8a; font-weight: bold;">${content.youtube.title}</a>
    </p>

    <div style="background: #fff8fc; border-radius: 8px; padding: 20px; margin-top: 24px; text-align: center;">
      <p style="font-size: 15px; line-height: 1.8; margin: 0; color: #555;">
        Con không cần vẽ hoàn hảo đâu nhé. Ba chỉ muốn con vui và thích vẽ thôi. Mỗi ngày một chút, con sẽ giỏi hơn mà không hay biết đó! 🌟<br/><br/>
        <strong style="color: #e05c8a;">Ba yêu con nhiều lắm! ❤️</strong>
      </p>
    </div>

  </div>

  <div style="background: #f5f5f5; padding: 12px; text-align: center; border-radius: 0 0 12px 12px;">
    <p style="color: #aaa; font-size: 11px; margin: 0;">Email này được gửi tự động mỗi tối từ ba 💌</p>
  </div>

</body>
</html>
  `;

  GmailApp.sendEmail(
    CONFIG.recipientEmail,
    content.subject,
    "", // plain text fallback (empty, HTML is primary)
    { htmlBody: htmlBody }
  );

  Logger.log("Email sent successfully: " + content.subject);
}
