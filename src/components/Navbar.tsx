"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";
import { getBanglaDate, type Category } from "@/lib/utils";
import PriceTicker from "@/components/PriceTicker";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const banglaDate = "আজকের বাজার";

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/bazardor/categories")
      .then((response) => response.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(() => setCategories([]));
  }, []);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট সফল হয়েছে!");
          router.push("/");
        },
        onError: () => {
          toast.error("সাইন আউট ব্যর্থ হয়েছে।");
        },
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-emerald-100 p-1.5">
            <Image src="/images/logo-icon.png" alt="BazarDor logo" width={64} height={64} className="h-full w-full object-contain" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-emerald-700">বাজার দর</h1>
            <p className="text-[11px] text-slate-500">{banglaDate}</p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          {isPending ? (
            <span className="loading loading-spinner loading-sm text-emerald-600" />
          ) : session ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-outline btn-success btn-sm gap-2 rounded-full border-emerald-200 bg-emerald-50 px-3 text-emerald-900">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                  {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <span>{session.user.name || "আমার প্রোফাইল"}</span>
              </div>
              <ul tabIndex={0} className="menu dropdown-content z-[1] mt-2 w-52 rounded-box border border-slate-200 bg-white p-2 shadow-lg">
                <li>
                  <Link href="/profile" className="rounded-md hover:bg-emerald-50">আমার প্রোফাইল</Link>
                </li>
                <li>
                  <button onClick={handleSignOut} className="w-full rounded-md px-2 py-2 text-left hover:bg-red-50 hover:text-red-600">
                    সাইন আউট
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/signin" className="btn btn-outline btn-success btn-sm rounded-full">
                সাইন ইন
              </Link>
              <Link href="/signup" className="btn btn-success btn-sm rounded-full text-white">
                সাইন আপ
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="btn btn-ghost btn-sm rounded-full lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      <div className="border-t border-slate-100 bg-white/90">
        <nav className={`mx-auto max-w-7xl px-4 py-3 ${mobileMenuOpen ? "block" : "hidden lg:block"}`}>
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((category) => {
              const isActive = pathname === `/category/${category.slug}`;
              return (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition ${
                    isActive ? "bg-emerald-600 text-white shadow-md" : "bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                  }`}
                >
                  <span>{category.icon}</span>
                  {category.nameBn}
                </Link>
              );
            })}
          </div>

          {mobileMenuOpen && (
            <div className="mt-4 flex flex-col gap-2 lg:hidden">
              {session ? (
                <>
                  <Link href="/profile" className="btn btn-outline btn-success rounded-full">প্রোফাইল</Link>
                  <button onClick={handleSignOut} className="btn btn-error rounded-full text-white">সাইন আউট</button>
                </>
              ) : (
                <>
                  <Link href="/signin" className="btn btn-outline btn-success rounded-full">সাইন ইন</Link>
                  <Link href="/signup" className="btn btn-success rounded-full text-white">সাইন আপ</Link>
                </>
              )}
            </div>
          )}
        </nav>
      </div>

      <PriceTicker />
    </header>
  );
}
