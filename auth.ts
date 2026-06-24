import { createFileRoute } from "@tanstack/react-router";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "minecraft-admin-2024";

export const Route = createFileRoute("/api/admin/auth")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { password } = await request.json() as { password: string };
        if (password === ADMIN_PASSWORD) {
          return Response.json({ token: ADMIN_PASSWORD, success: true });
        }
        return Response.json({ error: "Invalid password" }, { status: 401 });
      },
    },
  },
});
