"use client";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

export const { signIn, signUp, signOut, useSession } = authClient;

export const socialProviders = {
  google: Boolean(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID),
  github: Boolean(process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID),
};
