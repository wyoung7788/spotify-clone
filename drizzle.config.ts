
import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();
export default {
    schema: 'app/db/schema.ts',
    out: './migrations',
    driver: "turso",
    dbCredentials: {
        url: process.env.VITE_TURSO_URL as string,
        authToken: process.env.VITE_TURSO_AUTH_TOKEN as string,
    }
} satisfies Config;