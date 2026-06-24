import { createFileRoute } from "@tanstack/react-router";
import { db } from "../../../../db/index.js";
import { announcements } from "../../../../db/schema.js";
import { eq } from "drizzle-orm";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "minecraft-admin-2024";
function checkAuth(request: Request): boolean {
  return request.headers.get("x-admin-token") === ADMIN_PASSWORD;
}

export const Route = createFileRoute("/api/admin/announcements")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!checkAuth(request))
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        const data = await db
          .select()
          .from(announcements)
          .orderBy(announcements.sortOrder);
        return Response.json(data);
      },

      POST: async ({ request }) => {
        if (!checkAuth(request))
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        const body = await request.json() as {
          title: string;
          content: string;
          type?: string;
          active?: boolean;
          sortOrder?: number;
        };
        const [ann] = await db
          .insert(announcements)
          .values({
            title: body.title,
            content: body.content,
            type: body.type || "info",
            active: body.active ?? true,
            sortOrder: body.sortOrder ?? 0,
          })
          .returning();
        return Response.json(ann, { status: 201 });
      },

      PUT: async ({ request }) => {
        if (!checkAuth(request))
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        const body = await request.json() as {
          id: number;
          title: string;
          content: string;
          type?: string;
          active?: boolean;
          sortOrder?: number;
        };
        const [ann] = await db
          .update(announcements)
          .set({
            title: body.title,
            content: body.content,
            type: body.type || "info",
            active: body.active ?? true,
            sortOrder: body.sortOrder ?? 0,
          })
          .where(eq(announcements.id, body.id))
          .returning();
        return Response.json(ann);
      },

      DELETE: async ({ request }) => {
        if (!checkAuth(request))
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        const url = new URL(request.url);
        const id = parseInt(url.searchParams.get("id") || "0");
        if (!id)
          return Response.json({ error: "Missing id" }, { status: 400 });
        await db.delete(announcements).where(eq(announcements.id, id));
        return new Response(null, { status: 204 });
      },
    },
  },
});
