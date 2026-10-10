"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-emerald-600" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <p className="mb-4 text-lg text-slate-500">আপনি লগইন করেননি</p>
        <Link href="/signin" className="btn btn-success rounded-full text-white">
          সাইন ইন করুন
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-slate-800">আমার প্রোফাইল</h1>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200">
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-emerald-100 text-2xl font-bold text-emerald-700">
            {session.user.image ? (
              <img src={session.user.image} alt={session.user.name || "User avatar"} className="h-full w-full object-cover" />
            ) : (
              session.user.name?.charAt(0)?.toUpperCase() || "U"
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-800">{session.user.name || "অজানা ব্যবহারকারী"}</h2>
            <p className="text-slate-500">{session.user.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">নাম</p>
            <p className="mt-1 font-medium text-slate-800">{session.user.name || "অজানা"}</p>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">ইমেইল</p>
            <p className="mt-1 font-medium text-slate-800">{session.user.email}</p>
          </div>
        </div>

        <Link href="/profile/update" className="btn btn-success mt-6 w-full rounded-full text-white">
          ✏️ তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}
