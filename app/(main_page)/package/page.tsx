"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useInvoiceStore, InvoiceItem } from "@/stores/invoiceStore";
import { toast } from "sonner";

const PACKAGES = [
  { name: "Basic", speed: "10 Mbps", rawPrice: 100000, price: "Rp 100.000 / Bulan", type: "Prepaid" },
  { name: "Aktif", speed: "20 Mbps", rawPrice: 150000, price: "Rp 150.000 / Bulan", type: "Prepaid" },
  { name: "Nyaman", speed: "30 Mbps", rawPrice: 200000, price: "Rp 200.000 / Bulan", type: "Prepaid" },
  { name: "Andal", speed: "50 Mbps", rawPrice: 300000, price: "Rp 300.000 / Bulan", type: "Prepaid" },
  { name: "Prima", speed: "100 Mbps", rawPrice: 500000, price: "Rp 500.000 / Bulan", type: "Prepaid" },
  { name: "Maksimal", speed: "200 Mbps", rawPrice: 750000, price: "Rp 750.000 / Bulan", type: "Prepaid" },
];

function generateInvoiceId(date: Date) {
  return `INV-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
}

export default function PackagePage() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { addInvoice } = useInvoiceStore();

  const filteredPackages = PACKAGES.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(search.toLowerCase()) ||
      pkg.speed.toLowerCase().includes(search.toLowerCase()) ||
      pkg.price.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectPackage = (pkg: typeof PACKAGES[0]) => {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
    
    const dateStr = new Intl.DateTimeFormat("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(now);

    const timeStr = new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(oneHourLater);

    const invoiceId = generateInvoiceId(now);

    const newInvoice: InvoiceItem = {
      id: invoiceId,
      category: "Pembelian",
      title: "Pembelian Paket",
      customerName: "Saepul",
      customerId: "ZH-0098123",
      email: "john.doe@email.com",
      packageName: pkg.name,
      duration: "1 Bulan",
      date: dateStr,
      dueDate: `${dateStr}, ${timeStr}`,
      expiresAt: oneHourLater.getTime(),
      status: "Menunggu Pembayaran",
      amount: pkg.rawPrice,
    };

    addInvoice(newInvoice);
    toast.success("Invoice pembelian berhasil dibuat");
    router.push("/invoice");
  };

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
              className="relative overflow-hidden rounded-2xl bg-primary-theme p-5 text-background shadow-lg border border-ring/20 flex flex-col justify-between min-h-[170px] transition-transform hover:scale-[1.02]"
            >
              <div className="flex flex-col gap-1">
                <p className="text-xs font-bold uppercase tracking-wider opacity-80">
                  {pkg.name}
                </p>
                <p className="text-2xl font-black leading-tight">{pkg.speed}</p>
                <p className="text-xs font-medium opacity-90">
                  {pkg.price}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between gap-2">
                <span className="text-xs font-black uppercase tracking-widest">{pkg.type}</span>
                <button 
                  onClick={() => handleSelectPackage(pkg)}
                  className="rounded-xl bg-background px-4 py-2 text-xs font-black text-primary-theme shadow-md transition-all hover:bg-background/90 active:scale-95"
                >
                  Pilih
                </button>
              </div>
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