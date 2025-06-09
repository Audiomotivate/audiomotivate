import fs from "fs";
import path from "path";
import { type Express } from "express";
import { createServer as createViteServer, type ViteDevServer } from "vite";
import { type Server } from "http";

export function log(message: string, source = "express") {
  const timestamp = new Date().toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  console.log(`${timestamp} AM [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
    optimizeDeps: {
      // It's recommended to exclude SSR packages from optimization
      exclude: ["express"],
    },
  });

  app.use(vite.ssrFixStacktrace);
  app.use(vite.middlewares);
}

export function serveStatic(app: Express) {
  const distPath = path.resolve("dist/public");
  
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory at ${distPath}, make sure to build the client first`
    );
  }

  app.use(express.static(distPath));
  
  // Handle client-side routing
  app.get("*", (req, res) => {
    const indexPath = path.join(distPath, "index.html");
    
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send("Not Found");
    }
  });
}
