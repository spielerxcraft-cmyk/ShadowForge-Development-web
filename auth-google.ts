import { createFileRoute } from "@tanstack/react-router";
import { getUser } from "@netlify/identity";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "minecraft-admin-2024";

export const Route = createFileRoute("/api/admin/auth-google")({
  server: {
    handlers: {
      POST: async () => {
        const user = await getUser();
        if (!user) {
          return Response.json({ error: "Not authenticated with Google" }, { status: 401 });
        }
        return Response.json({ token: ADMIN_PASSWORD, success: true, email: user.email });
      },
    },
  },
});
