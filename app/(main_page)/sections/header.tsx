"use client";

import { BellRing } from "lucide-react";

export default function HeaderSection() {
  return (
    <header className="flex w-full flex-col gap-4 rounded-b-3xl bg-primary-theme px-4 py-5 text-primary-theme-foreground shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-semibold opacity-80">Hi, Selamat Sore!</span>
          <span className="text-lg font-bold">Saepul</span>
        </div>
        <button className="rounded-full items-center justify-center bg-primary-theme-foreground/20 p-3 shadow-xl">
          <BellRing size={20} />
        </button>
      </div>
    </header>
  );
}
