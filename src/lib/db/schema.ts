import { integer, jsonb, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Category cố định cho MVP hiện tại (5 category, xem mvp-scope.md).
// Chưa cần bảng categories riêng — category chỉ là 1 string cố định trên topic.
export const topics = pgTable("topics", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(), // drawing | reading | lifeskill | study | explore
  angle: text("angle").notNull(),
  resources: jsonb("resources").$type<{ label: string; url: string }[]>().notNull().default([]),
  sortOrder: integer("sort_order").notNull(), // thứ tự rotation, port từ index trong TOPICS legacy
});

// Log mỗi lần gửi — dùng để: (1) tính topic tiếp theo (rotation), (2) tránh gửi trùng resource
export const emailLogs = pgTable("email_logs", {
  id: serial("id").primaryKey(),
  topicId: integer("topic_id").notNull(),
  sentResourceUrl: text("sent_resource_url"),
  sentAt: timestamp("sent_at", { withTimezone: true }).notNull().defaultNow(),
});
