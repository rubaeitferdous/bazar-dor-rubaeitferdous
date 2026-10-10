import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-emerald-50 via-white to-lime-50 px-4 py-10 md:py-14">
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
        <div>
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
            আজকের বাজার
          </span>
          <h1 className="mt-5 text-4xl font-black leading-tight text-slate-800 md:text-5xl">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 md:text-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <Link href="#সব-পণ্য" className="mt-7 inline-flex rounded-full bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-700">
            সব পণ্য দেখুন
          </Link>
        </div>

        <div className="flex justify-center">
          <div className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-emerald-100 bg-white p-4 shadow-xl shadow-emerald-100">
            <Image src="/images/bazar-hero.png" alt="Bazar market dashboard" width={1200} height={900} priority className="h-auto w-full rounded-[1.5rem] object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
