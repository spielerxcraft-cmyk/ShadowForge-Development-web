import { createFileRoute } from "@tanstack/react-router";
import { db } from "../../../db/index.js";
import {
  siteSettings,
  pricingTiers,
  featureCards,
  announcements,
  serverInfoItems,
} from "../../../db/schema.js";

// Default seed data
const DEFAULT_SETTINGS: Record<string, string> = {
  site_title: "CraftForge Dev",
  site_tagline: "Professional Minecraft Server Development",
  hero_title: "Build Your Dream Minecraft Server",
  hero_subtitle:
    "We craft custom Minecraft server experiences — from plugins and maps to full network infrastructure. Level up your server today.",
  server_ip: "play.craftforge.dev",
  discord_url: "https://discord.gg/craftforge",
  contact_email: "hello@craftforge.dev",
  footer_text: "CraftForge Dev — Minecraft Server Development Services",
};

const DEFAULT_PRICING = [
  {
    name: "Dirt Block",
    price: "Free",
    description: "For hobbyists starting their first server.",
    features: JSON.stringify([
      "Basic server config",
      "1 plugin recommendation",
      "Community Discord support",
      "Getting started guide",
    ]),
    highlighted: false,
    sortOrder: 0,
  },
  {
    name: "Diamond Tier",
    price: "$49/mo",
    description: "For growing servers needing expert development.",
    features: JSON.stringify([
      "Custom plugin development",
      "Up to 5 plugins/month",
      "Priority Discord & email support",
      "Performance optimization",
      "Monthly maintenance",
    ]),
    highlighted: true,
    sortOrder: 1,
  },
  {
    name: "Netherite Elite",
    price: "Custom",
    description: "For large networks with enterprise-grade needs.",
    features: JSON.stringify([
      "Unlimited custom plugins",
      "Full network architecture",
      "Dedicated developer",
      "24/7 emergency support",
      "Custom maps & worlds",
      "White-label options",
    ]),
    highlighted: false,
    sortOrder: 2,
  },
];

const DEFAULT_FEATURES = [
  {
    icon: "sword",
    title: "Custom Plugin Development",
    description:
      "Hand-crafted Spigot, Paper, and Velocity plugins tailored to your server's unique gameplay needs.",
    sortOrder: 0,
  },
  {
    icon: "map",
    title: "World & Map Design",
    description:
      "Stunning custom-built worlds, spawn areas, and adventure maps that keep players exploring for hours.",
    sortOrder: 1,
  },
  {
    icon: "shield",
    title: "Anti-Cheat & Security",
    description:
      "Enterprise-grade anti-cheat systems, DDoS protection config, and security hardening for your server.",
    sortOrder: 2,
  },
  {
    icon: "lightning",
    title: "Performance Optimization",
    description:
      "TPS optimization, memory tuning, and chunk management to keep your server running at peak performance.",
    sortOrder: 3,
  },
];

const DEFAULT_ANNOUNCEMENTS = [
  {
    title: "Server 1.21 Update Support Available!",
    content:
      "We now fully support Minecraft 1.21 plugin development. Upgrade your server today!",
    type: "success",
    active: true,
    sortOrder: 0,
  },
];

const DEFAULT_SERVER_INFO = [
  { label: "Years of Experience", value: "5+", icon: "clock", sortOrder: 0 },
  {
    label: "Servers Deployed",
    value: "200+",
    icon: "server",
    sortOrder: 1,
  },
  {
    label: "Plugins Developed",
    value: "500+",
    icon: "puzzle",
    sortOrder: 2,
  },
  {
    label: "Happy Clients",
    value: "150+",
    icon: "heart",
    sortOrder: 3,
  },
];

async function seedIfEmpty() {
  const existing = await db.select().from(siteSettings).limit(1);
  if (existing.length > 0) return;

  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    await db.insert(siteSettings).values({ key, value });
  }
  await db.insert(pricingTiers).values(DEFAULT_PRICING);
  await db.insert(featureCards).values(DEFAULT_FEATURES);
  await db.insert(announcements).values(DEFAULT_ANNOUNCEMENTS);
  await db.insert(serverInfoItems).values(DEFAULT_SERVER_INFO);
}

export const Route = createFileRoute("/api/content")({
  server: {
    handlers: {
      GET: async () => {
        try {
          await seedIfEmpty();

          const [settings, pricing, features, announcementsData, serverInfo] =
            await Promise.all([
              db.select().from(siteSettings),
              db
                .select()
                .from(pricingTiers)
                .orderBy(pricingTiers.sortOrder),
              db
                .select()
                .from(featureCards)
                .orderBy(featureCards.sortOrder),
              db
                .select()
                .from(announcements)
                .orderBy(announcements.sortOrder),
              db
                .select()
                .from(serverInfoItems)
                .orderBy(serverInfoItems.sortOrder),
            ]);

          const settingsMap: Record<string, string> = {};
          for (const s of settings) {
            settingsMap[s.key] = s.value;
          }

          return Response.json({
            settings: settingsMap,
            pricing,
            features,
            announcements: announcementsData,
            serverInfo,
          });
        } catch (err) {
          console.error("GET /api/content error:", err);
          return Response.json(
            { error: "Internal server error" },
            { status: 500 }
          );
        }
      },
    },
  },
});
