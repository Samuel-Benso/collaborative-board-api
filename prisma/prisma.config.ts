import { defineConfig } from "@prisma/cli";
import "dotenv/config";

export default defineConfig({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});