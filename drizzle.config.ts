import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env' });

export default defineConfig({
  schema: 'app/db/schema.ts',
  out: './migrations',
  dialect: 'turso',
  dbCredentials: {
    url: "libsql://expert-rapture-wyoung.turso.io"!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
});