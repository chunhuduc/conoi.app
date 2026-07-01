import { config } from "dotenv";

config({ path: ".env.local" });

// Import động sau khi env đã load — "./client" đọc process.env.DATABASE_URL ngay khi module được nạp,
// import tĩnh sẽ bị hoist và chạy trước dòng config() ở trên.
async function main() {
  const { db } = await import("./client");
  const { topics } = await import("./schema");
  const { seedTopics } = await import("./seed-data");

  const existing = await db.select().from(topics).limit(1);
  if (existing.length > 0) {
    console.log("Bảng topics đã có dữ liệu, bỏ qua seed. Xoá bảng trước nếu muốn seed lại.");
    return;
  }

  await db.insert(topics).values(seedTopics);
  console.log(`Đã seed ${seedTopics.length} topics.`);
}

main().then(() => process.exit(0));
