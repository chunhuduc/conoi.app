import { NextResponse } from "next/server";
import { Resend } from "resend";
import { db } from "@/lib/db/client";
import { emailLogs, topics } from "@/lib/db/schema";
import { generateEmailContent } from "@/lib/content/generate";
import { buildEmailHtml, getFormattedDate } from "@/lib/email/template";
import { CONFIG } from "@/lib/config";
import { CATEGORY_STYLES } from "@/lib/content/category-styles";
import { asc } from "drizzle-orm";

export const dynamic = "force-dynamic";

// Bảo vệ endpoint bằng CRON_SECRET khi Vercel Cron gọi vào (header Authorization: Bearer <secret>)
function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true; // chưa set secret -> cho phép gọi tay khi test local
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const allTopics = await db.select().from(topics).orderBy(asc(topics.sortOrder));
  if (allTopics.length === 0) {
    return NextResponse.json({ error: "Chưa có topic nào, chạy `npm run db:seed` trước" }, { status: 400 });
  }

  const sentCount = await db.select().from(emailLogs);
  const dayIndex = sentCount.length % allTopics.length;
  const topic = allTopics[dayIndex];

  // Tránh gửi trùng resource: loại các url đã gửi trước đây (toàn cục, giống logic legacy)
  const usedUrls = new Set(
    (await db.select({ url: emailLogs.sentResourceUrl }).from(emailLogs)).map((r) => r.url).filter(Boolean)
  );
  const resources = topic.resources ?? [];
  const unused = resources.filter((r) => !usedUrls.has(r.url));
  const resource = unused[0] ?? resources[0] ?? null;

  const dateStr = getFormattedDate();
  const content = await generateEmailContent(
    { title: topic.title, category: topic.category as keyof typeof CATEGORY_STYLES, angle: topic.angle },
    resource
  );
  const html = buildEmailHtml(
    { title: topic.title, category: topic.category as keyof typeof CATEGORY_STYLES },
    content,
    resource,
    dateStr
  );

  const resend = new Resend(process.env.RESEND_API_KEY);
  const emoji = CATEGORY_STYLES[topic.category as keyof typeof CATEGORY_STYLES]?.emoji ?? "✉️";
  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || "ConOi <onboarding@resend.dev>",
    to: CONFIG.recipientEmail,
    subject: `${emoji} ${topic.title} — ${CONFIG.parentName} gửi ${CONFIG.childName}`,
    html,
  });

  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  await db.insert(emailLogs).values({
    topicId: topic.id,
    sentResourceUrl: resource?.url ?? null,
  });

  return NextResponse.json({ ok: true, topic: topic.title, resource: resource?.url ?? null });
}
