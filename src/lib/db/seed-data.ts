import type { Category } from "@/lib/content/category-styles";

// Port nguyên nội dung từ scripts/legacy-google-apps-script/suti_daily_email.gs (TOPICS)
// sortOrder giữ đúng thứ tự cũ để rotation không đổi so với bản Apps Script.
export const seedTopics: {
  title: string;
  category: Category;
  angle: string;
  resources: { label: string; url: string }[];
  sortOrder: number;
}[] = [
  // 🎨 VẼ & TRUYỆN TRANH
  {
    title: "Cách vẽ mắt manga",
    category: "drawing",
    angle: "Vẽ hình tròn to, thêm bóng sáng nhỏ bên trong để mắt có chiều sâu",
    resources: [
      { label: "Mark Crilley - Vẽ mắt manga", url: "https://www.youtube.com/@markcrilley" },
      { label: "Art Senpai - Mắt anime cơ bản", url: "https://www.youtube.com/@ArtSenpai" },
    ],
    sortOrder: 0,
  },
  {
    title: "Cách vẽ tóc manga",
    category: "drawing",
    angle: "Vẽ thành từng mảng lớn trước, không vẽ từng sợi",
    resources: [
      { label: "Mark Crilley - Tóc manga", url: "https://www.youtube.com/@markcrilley" },
      { label: "Art for Kids Hub - Tóc anime đơn giản", url: "https://www.youtube.com/@ArtforKidsHub" },
    ],
    sortOrder: 1,
  },
  {
    title: "Biểu cảm khuôn mặt",
    category: "drawing",
    angle: "Lông mày quyết định cảm xúc: cong xuống là tức, cong lên là ngạc nhiên",
    resources: [
      { label: "Art Senpai - Biểu cảm anime", url: "https://www.youtube.com/@ArtSenpai" },
      { label: "Mark Crilley - Cảm xúc nhân vật", url: "https://www.youtube.com/@markcrilley" },
    ],
    sortOrder: 2,
  },
  {
    title: "Vẽ nhân vật chibi",
    category: "drawing",
    angle: "Đầu to bằng nửa người, tay chân ngắn tròn, biểu cảm phóng đại",
    resources: [
      { label: "Art for Kids Hub - Chibi cơ bản", url: "https://www.youtube.com/@ArtforKidsHub" },
      { label: "Sophie Chan - Vẽ chibi", url: "https://www.youtube.com/@SophieChan" },
    ],
    sortOrder: 3,
  },
  {
    title: "Vẽ theo phong cách Doraemon",
    category: "drawing",
    angle: "Nhân vật Doraemon dùng hình tròn là chủ yếu, rất dễ bắt đầu",
    resources: [
      { label: "Art for Kids Hub - Vẽ Doraemon", url: "https://www.youtube.com/results?search_query=how+to+draw+doraemon+for+kids" },
      { label: "Easy Drawing - Doraemon step by step", url: "https://www.youtube.com/results?search_query=doraemon+drawing+tutorial+easy" },
    ],
    sortOrder: 4,
  },
  {
    title: "Vẽ theo phong cách Miko",
    category: "drawing",
    angle: "Nhân vật Miko có nét vẽ đơn giản, tròn trịa, rất phù hợp để tập",
    resources: [
      { label: "Tìm kiếm: vẽ nhân vật Miko", url: "https://www.youtube.com/results?search_query=how+to+draw+miko+comic+character" },
    ],
    sortOrder: 5,
  },
  {
    title: "Phác thảo nhân vật bằng hình que",
    category: "drawing",
    angle: "Bắt đầu bằng vòng tròn và đường thẳng, sau đó mặc thịt lên dần",
    resources: [
      { label: "Mark Crilley - Phác thảo nhân vật", url: "https://www.youtube.com/@markcrilley" },
    ],
    sortOrder: 6,
  },
  {
    title: "Tạo nhân vật của riêng mình",
    category: "drawing",
    angle: "Nghĩ về tính cách trước, rồi mới vẽ ngoại hình",
    resources: [
      { label: "Whyt Manga - Thiết kế nhân vật", url: "https://www.youtube.com/@WhytManga" },
    ],
    sortOrder: 7,
  },
  {
    title: "Bố cục trang truyện tranh",
    category: "drawing",
    angle: "Chia tờ giấy thành 4-6 ô, kể câu chuyện ngắn có mở đầu và kết thúc",
    resources: [
      { label: "Whyt Manga - Kể chuyện qua manga", url: "https://www.youtube.com/@WhytManga" },
    ],
    sortOrder: 8,
  },
  {
    title: "Vẽ trên máy tính bảng với MediBang",
    category: "drawing",
    angle: "Vẽ kỹ thuật số có thể xóa thoải mái, không sợ hỏng tác phẩm",
    resources: [
      { label: "MediBang Paint - Hướng dẫn cho người mới", url: "https://www.youtube.com/@MediBangPaint" },
    ],
    sortOrder: 9,
  },
  {
    title: "Vẽ bong bóng hội thoại trong truyện",
    category: "drawing",
    angle: "Hình oval cho lời nói, hình mây cho suy nghĩ, tia chớp cho tiếng kêu",
    resources: [
      { label: "Whyt Manga - Speech bubbles", url: "https://www.youtube.com/@WhytManga" },
    ],
    sortOrder: 10,
  },
  {
    title: "Tô bóng đơn giản",
    category: "drawing",
    angle: "Quyết định ánh sáng từ một hướng, vùng ngược lại là bóng tối",
    resources: [
      { label: "Art Senpai - Tô bóng cơ bản", url: "https://www.youtube.com/@ArtSenpai" },
    ],
    sortOrder: 11,
  },

  // 📖 ĐỌC SÁCH & TRÍ TƯỞNG TƯỢNG
  {
    title: "Tại sao đọc sách lại thú vị",
    category: "reading",
    angle: "Sách là cỗ máy thời gian, mình có thể đến bất cứ đâu chỉ bằng cách đọc",
    resources: [
      { label: "Doraemon - Bộ sưu tập truyện đầy đủ", url: "https://doraemon.fandom.com/wiki/Doraemon_Wiki" },
    ],
    sortOrder: 12,
  },
  {
    title: "Nhân vật yêu thích của con là ai và tại sao",
    category: "reading",
    angle: "Suy nghĩ về điều mình thích ở nhân vật giúp mình hiểu bản thân hơn",
    resources: [],
    sortOrder: 13,
  },
  {
    title: "Nếu con là Doraemon",
    category: "reading",
    angle: "Con sẽ phát minh ra cái gì để giúp mọi người? Sáng tạo không có giới hạn",
    resources: [],
    sortOrder: 14,
  },
  {
    title: "Viết một câu chuyện ngắn của riêng mình",
    category: "reading",
    angle: "Chỉ cần 5 câu: Ai? Ở đâu? Chuyện gì xảy ra? Vấn đề? Giải quyết thế nào?",
    resources: [],
    sortOrder: 15,
  },

  // 🌱 KỸ NĂNG SỐNG
  {
    title: "Cách dọn dẹp phòng của mình",
    category: "lifeskill",
    angle: "Mỗi thứ có một chỗ riêng, khi dùng xong trả về đúng chỗ",
    resources: [],
    sortOrder: 16,
  },
  {
    title: "Cách xin lỗi thật lòng",
    category: "lifeskill",
    angle: "Xin lỗi thật sự có 3 bước: nhận lỗi, nói lý do tại sao sai, hứa không làm nữa",
    resources: [],
    sortOrder: 17,
  },
  {
    title: "Cách kết bạn mới",
    category: "lifeskill",
    angle: "Hỏi một câu đơn giản là đủ để bắt đầu: 'Bạn thích vẽ không?'",
    resources: [],
    sortOrder: 18,
  },
  {
    title: "Quản lý tiền tiêu vặt",
    category: "lifeskill",
    angle: "Chia tiền thành 3 phần: tiêu hôm nay, tiết kiệm, mua thứ mình mơ ước",
    resources: [],
    sortOrder: 19,
  },
  {
    title: "Khi cảm thấy buồn hoặc tức giận",
    category: "lifeskill",
    angle: "Hít thở sâu 4 giây, giữ 4 giây, thở ra 4 giây. Cảm xúc sẽ dịu lại",
    resources: [],
    sortOrder: 20,
  },
  {
    title: "Giúp đỡ việc nhà",
    category: "lifeskill",
    angle: "Mỗi người trong gia đình đều có phần trách nhiệm, kể cả con",
    resources: [],
    sortOrder: 21,
  },
  {
    title: "Cách chia sẻ với bạn bè",
    category: "lifeskill",
    angle: "Chia sẻ không làm mình mất đi thứ gì, ngược lại còn được thêm một người bạn",
    resources: [],
    sortOrder: 22,
  },
  {
    title: "Tự chăm sóc bản thân",
    category: "lifeskill",
    angle: "Ngủ đủ giấc, uống đủ nước, vận động mỗi ngày, đó là nền tảng của mọi thứ",
    resources: [],
    sortOrder: 23,
  },

  // 📚 HỌC TẬP - LỚP 3
  {
    title: "Cách tập trung học bài tốt hơn",
    category: "study",
    angle: "Học 25 phút, nghỉ 5 phút. Não con người hoạt động tốt nhất theo chu kỳ ngắn",
    resources: [],
    sortOrder: 24,
  },
  {
    title: "Ghi chép bài học bằng hình vẽ",
    category: "study",
    angle: "Vẽ sơ đồ hoặc hình ảnh thay vì chép lại nguyên văn, dễ nhớ hơn nhiều",
    resources: [],
    sortOrder: 25,
  },
  {
    title: "Cách học bảng cửu chương vui hơn",
    category: "study",
    angle: "Biến bảng cửu chương thành bài hát hoặc vẽ hình minh họa cho mỗi phép tính",
    resources: [],
    sortOrder: 26,
  },
  {
    title: "Thói quen đọc sách 15 phút mỗi ngày",
    category: "study",
    angle: "15 phút mỗi ngày = hơn 90 giờ đọc sách mỗi năm. Nhỏ mà không nhỏ chút nào",
    resources: [],
    sortOrder: 27,
  },
  {
    title: "Cách sắp xếp cặp sách gọn gàng",
    category: "study",
    angle: "Tối hôm trước chuẩn bị cặp sách cho ngày mai, sáng sẽ không bao giờ quên đồ",
    resources: [],
    sortOrder: 28,
  },
  {
    title: "Học tiếng Anh qua truyện tranh",
    category: "study",
    angle: "Tìm bản tiếng Anh của Doraemon, đọc song song với bản tiếng Việt để học từ mới",
    resources: [
      { label: "Doraemon tiếng Anh cho trẻ em", url: "https://www.youtube.com/results?search_query=doraemon+english+for+kids" },
    ],
    sortOrder: 29,
  },

  // 🌍 KHÁM PHÁ THẾ GIỚI
  {
    title: "Anime và manga được làm như thế nào",
    category: "explore",
    angle: "Mỗi tập anime cần hàng trăm họa sĩ vẽ hàng ngàn hình, ghép lại thành phim",
    resources: [
      { label: "How anime is made - for kids", url: "https://www.youtube.com/results?search_query=how+is+anime+made+for+kids" },
    ],
    sortOrder: 30,
  },
  {
    title: "Văn hóa Nhật Bản - quê hương của manga",
    category: "explore",
    angle: "Manga ra đời ở Nhật Bản, đất nước nổi tiếng với sự cẩn thận và sáng tạo",
    resources: [
      { label: "Japan culture for kids", url: "https://www.youtube.com/results?search_query=japan+culture+for+kids" },
    ],
    sortOrder: 31,
  },
  {
    title: "Tại sao bầu trời màu xanh",
    category: "explore",
    angle: "Ánh sáng mặt trời gồm nhiều màu, không khí làm màu xanh tán xạ nhiều nhất",
    resources: [
      { label: "Why is the sky blue - kids science", url: "https://www.youtube.com/results?search_query=why+is+sky+blue+for+kids" },
    ],
    sortOrder: 32,
  },
  {
    title: "Những nữ họa sĩ nổi tiếng thế giới",
    category: "explore",
    angle: "Rumiko Takahashi là nữ mangaka giàu nhất Nhật Bản, bắt đầu từ đam mê vẽ",
    resources: [],
    sortOrder: 33,
  },
  {
    title: "Động vật ở Việt Nam mình chưa biết",
    category: "explore",
    angle: "Việt Nam có sao la, voọc mũi hếch, và nhiều loài đặc hữu không nơi nào có",
    resources: [
      { label: "Wildlife of Vietnam for kids", url: "https://www.youtube.com/results?search_query=animals+of+vietnam+for+kids" },
    ],
    sortOrder: 34,
  },
];
