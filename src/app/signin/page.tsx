"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

function SignInContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleEmailSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const result = await signIn.email({
        email,
        password,
        callbackURL: callbackUrl,
      });

      if (result.error) {
        toast.error(result.error.message || "সাইন ইন ব্যর্থ হয়েছে!");
        return;
      }

      toast.success("সাইন ইন সফল হয়েছে!");
      router.push(callbackUrl);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "সাইন ইন ব্যর্থ হয়েছে!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signIn.social({
        provider: "google",
        callbackURL: callbackUrl,
      });
      if (result?.data?.url) {
        window.location.href = result.data.url;
      } else if (result?.error) {
        toast.error(result.error.message || "Google লগইন ব্যর্থ হয়েছে!");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Google লগইন ব্যর্থ হয়েছে!");
      setLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    setLoading(true);
    try {
      const result = await signIn.social({
        provider: "github",
        callbackURL: callbackUrl,
      });
      if (result?.data?.url) {
        window.location.href = result.data.url;
      } else if (result?.error) {
        toast.error(result.error.message || "GitHub লগইন ব্যর্থ হয়েছে!");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "GitHub লগইন ব্যর্থ হয়েছে!");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-slate-800">সাইন ইন করুন</h1>
          <p className="mt-2 text-sm text-slate-500">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
        </div>

        <div className="space-y-2">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="btn btn-outline w-full gap-2 rounded-full"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62Z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" />
            </svg>
            Google দিয়ে সাইন ইন
          </button>

          <button
            type="button"
            onClick={handleGitHubSignIn}
            disabled={loading}
            className="btn btn-outline w-full gap-2 rounded-full"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.09-.75.08-.74.08-.74 1.21.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.92 0-1.31.47-2.38 1.24-3.22-.12-.3-.53-1.52.12-3.17 0 0 1.01-.32 3.3 1.23.96-.27 1.99-.4 3.02-.4 1.03 0 2.07.13 3.02.4 2.29-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.78.84 1.24 1.91 1.24 3.22 0 4.6-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
            </svg>
            GitHub দিয়ে সাইন ইন
          </button>
        </div>

        <div className="divider text-xs uppercase tracking-[0.2em] text-slate-400">অথবা ইমেইল দিয়ে</div>

        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">ইমেইল</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="your@email.com"
              className="input input-bordered w-full rounded-2xl"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">পাসওয়ার্ড</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className="input input-bordered w-full rounded-2xl"
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-full rounded-full text-white" disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-sm" /> : "সাইন ইন"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-slate-500">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-semibold text-emerald-600 hover:underline">
            রেজিস্টার করুন
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[80vh] items-center justify-center">
          <span className="loading loading-spinner loading-lg text-emerald-600" />
        </div>
      }
    >
      <SignInContent />
    </Suspense>
  );
}
