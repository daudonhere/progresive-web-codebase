"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const PACKAGES = [
  { name: "Internet Hemat", speed: "12 Mbps", price: "Rp 120.000 / Bulan" },
  { name: "Internet Pelajar", speed: "15 Mbps", price: "Rp 150.000 / Bulan" },
  { name: "Internet Home", speed: "17 Mbps", price: "Rp 170.000 / Bulan" },
  { name: "Internet Kencang", speed: "20 Mbps", price: "Rp 200.000 / Bulan" },
  { name: "Internet Super", speed: "25 Mbps", price: "Rp 250.000 / Bulan" },
  { name: "Internet Ultra", speed: "30 Mbps", price: "Rp 300.000 / Bulan" },
];

export default function PackagePage() {
  const [search, setSearch] = useState("");

  const filteredPackages = PACKAGES.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(search.toLowerCase()) ||
      pkg.speed.toLowerCase().includes(search.toLowerCase()) ||
      pkg.price.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 p-3 w-full">
      <div className="relative sticky top-0 z-10 bg-background/80 backdrop-blur-sm pb-2 pt-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cari paket internet..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 shadow-sm bg-background border-ring/30 focus-visible:border-primary-theme"
          />
        </div>
      </div>

      
      <div className="grid grid-cols-2 gap-3 pb-20">
        {filteredPackages.length > 0 ? (
          filteredPackages.map((pkg, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl bg-primary-theme p-4 text-background shadow-lg border border-ring/20 flex flex-col gap-1 min-h-[140px]"
            >
              <p className="text-[10px] font-medium uppercase tracking-wider opacity-80">
                {pkg.name}
              </p>
              <p className="text-xl font-black leading-tight">{pkg.speed}</p>
              <p className="text-[10px] font-medium opacity-90 mt-auto mb-8">
                {pkg.price}
              </p>

              <button className="absolute bottom-3 right-3 rounded-lg bg-background px-3 py-1.5 text-[10px] font-bold text-primary-theme shadow-md transition-all hover:scale-105 active:scale-95">
                Pilih
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-2 flex flex-col items-center justify-center py-20 text-muted-foreground">
            <p className="text-sm font-medium">Paket tidak ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
