import { createFileRoute } from "@tanstack/react-router";
import { db } from "../../../../db/index.js";
import { featureCards } from "../../../../db/schema.js";
import { eq } from "drizzle-orm";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "minecraft-admin-2024";
function checkAuth(request: Request): boolean {
  return request.headers.get("x-admin-token") === ADMIN_PASSWORD;
}

export const Route = createFileRoute("/api/admin/features")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!checkAuth(request))
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        const features = await db
          .select()
          .from(featureCards)
          .orderBy(featureCards.sortOrder);
        return Response.json(features);
      },

      POST: async ({ request }) => {
        if (!checkAuth(request))
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        const body = await request.json() as {
          icon: string;
          title: string;
          description: string;
          sortOrder?: number;
        };
        const [feat] = await db
          .insert(featureCards)
          .values({
            icon: body.icon || "sword",
            title: body.title,
            description: body.description,
            sortOrder: body.sortOrder ?? 0,
          })
          .returning();
        return Response.json(feat, { status: 201 });
      },

      PUT: async ({ request }) => {
        if (!checkAuth(request))
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        const body = await request.json() as {
          id: number;
          icon: string;
          title: string;
          description: string;
          sortOrder?: number;
        };
        const [feat] = await db
          .update(featureCards)
          .set({
            icon: body.icon,
            title: body.title,
            description: body.description,
            sortOrder: body.sortOrder ?? 0,
          })
          .where(eq(featureCards.id, body.id))
          .returning();
        return Response.json(feat);
      },

      DELETE: async ({ request }) => {
        if (!checkAuth(request))
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        const url = new URL(request.url);
        const id = parseInt(url.searchParams.get("id") || "0");
        if (!id)
          return Response.json({ error: "Missing id" }, { status: 400 });
        await db.delete(featureCards).where(eq(featureCards.id, id));
        return new Response(null, { status: 204 });
      },
    },
  },
});
