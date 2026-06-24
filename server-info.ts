import { createFileRoute } from "@tanstack/react-router";
import { db } from "../../../../db/index.js";
import { serverInfoItems } from "../../../../db/schema.js";
import { eq } from "drizzle-orm";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "minecraft-admin-2024";
function checkAuth(request: Request): boolean {
  return request.headers.get("x-admin-token") === ADMIN_PASSWORD;
}

export const Route = createFileRoute("/api/admin/server-info")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!checkAuth(request))
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        const data = await db
          .select()
          .from(serverInfoItems)
          .orderBy(serverInfoItems.sortOrder);
        return Response.json(data);
      },

      POST: async ({ request }) => {
        if (!checkAuth(request))
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        const body = await request.json() as {
          label: string;
          value: string;
          icon?: string;
          sortOrder?: number;
        };
        const [item] = await db
          .insert(serverInfoItems)
          .values({
            label: body.label,
            value: body.value,
            icon: body.icon || "server",
            sortOrder: body.sortOrder ?? 0,
          })
          .returning();
        return Response.json(item, { status: 201 });
      },

      PUT: async ({ request }) => {
        if (!checkAuth(request))
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        const body = await request.json() as {
          id: number;
          label: string;
          value: string;
          icon?: string;
          sortOrder?: number;
        };
        const [item] = await db
          .update(serverInfoItems)
          .set({
            label: body.label,
            value: body.value,
            icon: body.icon || "server",
            sortOrder: body.sortOrder ?? 0,
          })
          .where(eq(serverInfoItems.id, body.id))
          .returning();
        return Response.json(item);
      },

      DELETE: async ({ request }) => {
        if (!checkAuth(request))
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        const url = new URL(request.url);
        const id = parseInt(url.searchParams.get("id") || "0");
        if (!id)
          return Response.json({ error: "Missing id" }, { status: 400 });
        await db
          .delete(serverInfoItems)
          .where(eq(serverInfoItems.id, id));
        return new Response(null, { status: 204 });
      },
    },
  },
});
