import { createFileRoute } from "@tanstack/react-router";
import { db } from "../../../../db/index.js";
import { siteSettings } from "../../../../db/schema.js";
import { eq } from "drizzle-orm";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "minecraft-admin-2024";

function checkAuth(request: Request): boolean {
  const auth = request.headers.get("x-admin-token");
  return auth === ADMIN_PASSWORD;
}

export const Route = createFileRoute("/api/admin/settings")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!checkAuth(request)) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const settings = await db.select().from(siteSettings);
        const map: Record<string, string> = {};
        for (const s of settings) map[s.key] = s.value;
        return Response.json(map);
      },

      PUT: async ({ request }) => {
        if (!checkAuth(request)) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const body = await request.json() as Record<string, string>;
        for (const [key, value] of Object.entries(body)) {
          const existing = await db
            .select()
            .from(siteSettings)
            .where(eq(siteSettings.key, key));
          if (existing.length > 0) {
            await db
              .update(siteSettings)
              .set({ value: String(value) })
              .where(eq(siteSettings.key, key));
          } else {
            await db.insert(siteSettings).values({ key, value: String(value) });
          }
        }
        return Response.json({ success: true });
      },
    },
  },
});
