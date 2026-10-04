import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Embedded Postgres ships a WASM binary and data files; load it from node_modules, don't bundle it.
  serverExternalPackages: ["@electric-sql/pglite", "exceljs"],
  // Lets a production build be checked without disturbing a running `npm run dev`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // dbReady() reads db/migrations at runtime and builds that path at runtime, so it has to be
  // named here — otherwise a hosted build (Vercel) ships without the folder and the first
  // request fails with "no migrations found".
  outputFileTracingIncludes: { "/**": ["./db/migrations/**", "./db/seed/**"] },
  poweredByHeader: false,
  devIndicators: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Not framed by anyone; no plugins; forms post only to this site. Scripts and styles are
          // left alone on purpose — Next inlines both, and a script rule here would break the app.
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "same-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
