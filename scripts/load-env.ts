import { config } from "dotenv";

// Match Next.js local precedence: .env.local overrides .env.
config({ path: ".env" });
config({ path: ".env.local", override: true });
