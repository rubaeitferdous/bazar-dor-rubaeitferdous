import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 text-7xl">🔎</div>
      <h1 className="mb-2 text-4xl font-bold text-slate-800">পেজটি পাওয়া যায়নি</h1>
      <p className="mb-6 max-w-md text-slate-500">
        আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি। এটি সরিয়ে ফেলা হয়ে থাকতে পারে বা ঠিকানাটি ভুল হতে পারে।
      </p>
      <Link href="/" className="btn btn-success rounded-full text-white">
        🏠 হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
