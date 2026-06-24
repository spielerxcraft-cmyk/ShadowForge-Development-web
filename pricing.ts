import { createFileRoute } from "@tanstack/react-router";
import { db } from "../../../../db/index.js";
import { pricingTiers } from "../../../../db/schema.js";
import { eq } from "drizzle-orm";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "minecraft-admin-2024";
function checkAuth(request: Request): boolean {
  return request.headers.get("x-admin-token") === ADMIN_PASSWORD;
}

export const Route = createFileRoute("/api/admin/pricing")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!checkAuth(request))
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        const tiers = await db
          .select()
          .from(pricingTiers)
          .orderBy(pricingTiers.sortOrder);
        return Response.json(tiers);
      },

      POST: async ({ request }) => {
        if (!checkAuth(request))
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        const body = await request.json() as {
          name: string;
          price: string;
          description: string;
          features: string[];
          highlighted?: boolean;
          sortOrder?: number;
        };
        const [tier] = await db
          .insert(pricingTiers)
          .values({
            name: body.name,
            price: body.price,
            description: body.description,
            features: JSON.stringify(body.features || []),
            highlighted: body.highlighted ?? false,
            sortOrder: body.sortOrder ?? 0,
          })
          .returning();
        return Response.json(tier, { status: 201 });
      },

      PUT: async ({ request }) => {
        if (!checkAuth(request))
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        const body = await request.json() as {
          id: number;
          name: string;
          price: string;
          description: string;
          features: string[];
          highlighted?: boolean;
          sortOrder?: number;
        };
        const [tier] = await db
          .update(pricingTiers)
          .set({
            name: body.name,
            price: body.price,
            description: body.description,
            features: JSON.stringify(body.features || []),
            highlighted: body.highlighted ?? false,
            sortOrder: body.sortOrder ?? 0,
          })
          .where(eq(pricingTiers.id, body.id))
          .returning();
        return Response.json(tier);
      },

      DELETE: async ({ request }) => {
        if (!checkAuth(request))
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        const url = new URL(request.url);
        const id = parseInt(url.searchParams.get("id") || "0");
        if (!id)
          return Response.json({ error: "Missing id" }, { status: 400 });
        await db.delete(pricingTiers).where(eq(pricingTiers.id, id));
        return new Response(null, { status: 204 });
      },
    },
  },
});
