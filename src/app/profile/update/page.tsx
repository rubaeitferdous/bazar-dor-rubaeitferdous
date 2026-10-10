"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { authClient, useSession } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const result = await authClient.updateUser({
      name,
    });

    if (result.error) {
      toast.error(result.error.message || "আপডেট ব্যর্থ হয়েছে!");
      setLoading(false);
      return;
    }

    toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
    router.push("/profile");
    setLoading(false);
  };

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="loading loading-spinner loading-lg text-emerald-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <h1 className="mb-6 text-3xl font-bold text-slate-800">তথ্য আপডেট করুন</h1>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200">
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">নাম</label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="আপনার নাম"
              className="input input-bordered w-full rounded-2xl"
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-full rounded-full text-white" disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-sm" /> : "আপডেট করুন"}
          </button>
        </form>

        <Link href="/profile" className="btn btn-ghost mt-3 w-full rounded-full">
          ← প্রোফাইলে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
