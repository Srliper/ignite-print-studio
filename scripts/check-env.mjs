#!/usr/bin/env node
/**
 * Valida variáveis de ambiente antes de dev/build/deploy.
 * Uso: node scripts/check-env.mjs [--production]
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { randomBytes } from "node:crypto";

const isProd = process.argv.includes("--production");

function loadDotEnv() {
  const path = resolve(process.cwd(), ".env");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadDotEnv();

function get(name, ...aliases) {
  for (const key of [name, ...aliases]) {
    const v = process.env[key];
    if (v && !v.startsWith("COLE_") && !v.startsWith("seu_") && !v.startsWith("gere_")) return v;
  }
  return undefined;
}

const required = [
  { keys: ["SUPABASE_URL"], label: "SUPABASE_URL" },
  { keys: ["SUPABASE_PUBLISHABLE_KEY"], label: "SUPABASE_PUBLISHABLE_KEY" },
  { keys: ["VITE_SUPABASE_URL"], label: "VITE_SUPABASE_URL" },
  { keys: ["VITE_SUPABASE_PUBLISHABLE_KEY"], label: "VITE_SUPABASE_PUBLISHABLE_KEY" },
  { keys: ["GOOGLE_CLIENT_ID", "AUTH_GOOGLE_ID"], label: "GOOGLE_CLIENT_ID" },
  { keys: ["GOOGLE_CLIENT_SECRET", "AUTH_GOOGLE_SECRET"], label: "GOOGLE_CLIENT_SECRET" },
  { keys: ["AUTH_SECRET", "NEXTAUTH_SECRET"], label: "AUTH_SECRET ou NEXTAUTH_SECRET" },
];

const prodOnly = [
  { keys: ["AUTH_URL", "NEXTAUTH_URL", "VERCEL_URL"], label: "AUTH_URL / NEXTAUTH_URL / VERCEL_URL" },
];

const missing = required.filter(({ keys }) => !get(...keys));
if (isProd) {
  missing.push(...prodOnly.filter(({ keys }) => !get(...keys)));
}

console.log("\n=== ignite-print-studio — check-env ===\n");

if (missing.length === 0) {
  console.log("✓ Todas as variáveis obrigatórias estão definidas.\n");
  process.exit(0);
}

console.log("✗ Variáveis ausentes ou com placeholder:\n");
for (const { label } of missing) {
  console.log(`  - ${label}`);
}

console.log("\nGere AUTH_SECRET com:");
console.log(
  '  node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'base64\'))"',
);
console.log("\nExemplo gerado agora:", randomBytes(32).toString("base64"));
console.log("\nVercel: Settings → Environment Variables → marque Production + Preview\n");
process.exit(1);
