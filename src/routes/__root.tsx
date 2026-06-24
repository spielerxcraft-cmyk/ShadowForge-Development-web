import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "../components/Header";
import "../styles.css";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "CraftForge Dev - Minecraft Server Development",
      },
      {
        name: "description",
        content:
          "Professional Minecraft server development services - plugins, maps, network infrastructure.",
      },
    ],
  }),
  component: () => (
    <html>
      <head />
      <body>
        <Header />
        <main className="min-h-screen bg-gray-950 text-gray-100">
          <Outlet />
        </main>
      </body>
    </html>
  ),
});
