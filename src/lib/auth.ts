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

declare global {
  var _mongoClient: MongoClient | undefined;
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

  let client: MongoClient;
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClient) {
      global._mongoClient = new MongoClient(connectionString);
    }
    client = global._mongoClient;
  } else {
    client = new MongoClient(connectionString);
  }

  const db = client.db(process.env.MONGODB_DB || "bazardor");
  return mongodbAdapter(db, { client });
};

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "https://bazar-dor-rubaeitferdous.vercel.app/",
  secret: process.env.BETTER_AUTH_SECRET || "your-secret-key-at-least-32-characters-long-random",
  database: getDatabase(),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
      requireLocalEmailVerified: false,
    },
    storeStateStrategy: "cookie",
  },
  socialProviders: Object.keys(socialProviders).length > 0 ? socialProviders : undefined,
  session: {
    expiresIn: 60 * 60 * 24 * 7,
  },
  trustedOrigins: [
    "http://localhost:3000",
    ...(process.env.BETTER_AUTH_URL ? [process.env.BETTER_AUTH_URL] : []),
    ...(process.env.NEXT_PUBLIC_APP_URL ? [process.env.NEXT_PUBLIC_APP_URL] : []),
  ],
});
