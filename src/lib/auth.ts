import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { memoryAdapter } from "@better-auth/memory-adapter";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const socialProviders: Record<string, { clientId: string; clientSecret: string }> = {};

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  socialProviders.github = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  };
}

const memoryDatabase = memoryAdapter({
  users: [],
  sessions: [],
  accounts: [],
  verificationTokens: [],
  passkeys: [],
});

const getDatabase = () => {
  const connectionString = process.env.MONGODB_URI || process.env.MONGODB_URL;
  if (!connectionString) {
    return memoryDatabase;
  }

  const client = new MongoClient(connectionString);
  const db = client.db(process.env.MONGODB_DB || "bazar-dor");
  return mongodbAdapter(db, { client });
};

export const auth = betterAuth({
  database: getDatabase(),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  socialProviders: Object.keys(socialProviders).length > 0 ? socialProviders : undefined,
  session: {
    expiresIn: 60 * 60 * 24 * 7,
  },
});
