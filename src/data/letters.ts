// Dữ liệu thư mẫu cho landing page.
//
// GIAI ĐOẠN HIỆN TẠI: seed cứng để phục vụ coding/UI.
// GIAI ĐOẠN SAU (khi có DB lớn): thay mảng `landingLetters` bằng một query
// chọn lọc các lá thư "đẹp" nhất để show lên landing (ví dụ: lọc theo
// category đa dạng, độ dài hợp lý, đã được kiểm duyệt). Giữ nguyên kiểu
// `Letter` để phần UI (LetterStack) không phải đổi.

export type LetterCategory =
  | "drawing"
  | "reading"
  | "lifeskill"
  | "study"
  | "explore";

export interface Letter {
  id: string;
  /** Người gửi — biến số, KHÔNG hardcode "Ba" (có thể là Mẹ/Ông/Bà/tên riêng) */
  sender: string;
  childName: string;
  /** Dòng phụ hiển thị dưới tên, ví dụ "9 tuổi · lớp 3" */
  childMeta: string;
  /** Nhãn ngày trên con dấu, ví dụ "Th 2", "CN" */
  dayLabel: string;
  /** Giờ gửi hiển thị trên con dấu, ví dụ "07:00" */
  time: string;
  category: LetterCategory;
  body: string;
}

export const categoryLabel: Record<LetterCategory, string> = {
  drawing: "Vẽ & truyện tranh",
  reading: "Đọc sách",
  lifeskill: "Kỹ năng sống",
  study: "Học tập",
  explore: "Khám phá thế giới",
};

export const landingLetters: Letter[] = [
  {
    id: "draw-bieu-cam",
    sender: "Ba",
    childName: "Suti",
    childMeta: "9 tuổi · lớp 3",
    dayLabel: "Th 2",
    time: "07:00",
    category: "drawing",
    body: "Con ơi, hôm nay ba tìm được một góc nhìn hay để con thử vẽ biểu cảm nhân vật, giống cảnh Doraemon mà con hay đọc trước khi ngủ. Ba nhớ con kể tuần trước con vẽ Nobita chưa ra được ánh mắt buồn — hôm nay con thử vẽ ba đôi mắt: vui, buồn và ngạc nhiên xem sao nhé. Tối về cho ba xem, ba tin con làm được.",
  },
  {
    id: "life-xin-loi",
    sender: "Ba",
    childName: "Suti",
    childMeta: "9 tuổi · lớp 3",
    dayLabel: "Th 3",
    time: "07:00",
    category: "lifeskill",
    body: "Con à, hôm qua con với em giận nhau, ba hiểu mà. Xin lỗi không phải là thua đâu con — đó là khi mình đủ lớn để nói “con sai rồi”. Hôm nay nếu gặp lại em, con thử nói ba điều: con sai chỗ nào, vì sao em buồn, và lần sau con sẽ làm khác ra sao. Ba thương con.",
  },
  {
    id: "read-canh-cua",
    sender: "Mẹ",
    childName: "Suti",
    childMeta: "9 tuổi · lớp 3",
    dayLabel: "Th 4",
    time: "07:00",
    category: "reading",
    body: "Suti ơi, mẹ vừa đọc lại tập Doraemon cũ và tự hỏi: nếu con có Cánh Cửa Thần Kỳ, sáng nay con sẽ mở nó ra đi đâu? Con thử nghĩ một nơi thôi, rồi tưởng tượng ở đó có mùi gì, nghe thấy âm thanh gì. Tối kể mẹ nghe nhé, mẹ tò mò lắm đây.",
  },
  {
    id: "study-kien-nhan",
    sender: "Mẹ",
    childName: "Suti",
    childMeta: "9 tuổi · lớp 3",
    dayLabel: "Th 5",
    time: "07:00",
    category: "study",
    body: "Con gái của mẹ, mẹ biết bài toán chia hôm qua làm con hơi nản. Không sao đâu — chậm một chút mà hiểu thì hơn nhanh mà quên. Hôm nay con chỉ cần làm đúng một bài thôi, làm thật chậm và đọc to từng bước. Làm xong một bài là con đã tiến lên rồi đó.",
  },
  {
    id: "explore-bau-troi",
    sender: "Ba",
    childName: "Suti",
    childMeta: "9 tuổi · lớp 3",
    dayLabel: "Th 6",
    time: "07:00",
    category: "explore",
    body: "Con ơi, sáng nay đi học con thử ngẩng lên nhìn bầu trời một giây nhé. Con có bao giờ thắc mắc vì sao ban ngày trời màu xanh mà lúc hoàng hôn lại đỏ cam không? Bí mật nằm ở cách ánh sáng mặt trời va vào không khí đấy. Tối ba kể con nghe, mà con thử đoán trước xem sao.",
  },
  {
    id: "draw-mat-manga",
    sender: "Ba",
    childName: "Suti",
    childMeta: "9 tuổi · lớp 3",
    dayLabel: "Th 7",
    time: "08:00",
    category: "drawing",
    body: "Suti, cuối tuần rồi, mình chơi vẽ nhé! Mắt là phần khó nhất nhưng cũng vui nhất khi vẽ manga. Con thử vẽ 5 đôi mắt, mỗi đôi một cảm xúc: vui, buồn, giận, sợ và bất ngờ. Vẽ xong dán lên tường phòng con, ba muốn xem “bộ sưu tập ánh mắt” của con.",
  },
  {
    id: "read-miko",
    sender: "Mẹ",
    childName: "Suti",
    childMeta: "9 tuổi · lớp 3",
    dayLabel: "CN",
    time: "08:30",
    category: "reading",
    body: "Suti à, Chủ nhật thong thả, con đọc lại một tập Miko mà con thích nhất đi. Đọc xong, con thử kể lại cho mẹ chỉ trong ba câu thôi: chuyện gì xảy ra, ai làm con cười, và con học được gì. Kể chuyện ngắn gọn cũng là một tài năng đó con.",
  },
];
