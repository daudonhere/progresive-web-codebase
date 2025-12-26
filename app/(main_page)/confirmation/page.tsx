"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useLoaderStore } from "@/stores/loaderStore";
import { useTransactionStore } from "@/stores/transactionStore";
import { Copy, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";

export default function ConfirmationPage() {
  const router = useRouter();
  const { startLoading } = useLoaderStore();
  const { invoiceData, selectedPaymentMethod, resetTransaction } = useTransactionStore();

  useEffect(() => {
    if (!invoiceData || !selectedPaymentMethod) {
      router.replace("/invoice");
    }
  }, [invoiceData, selectedPaymentMethod, router]);

  const handleConfirm = () => {
    if (!invoiceData || !selectedPaymentMethod) return;

    startLoading();
    
    const message = `Hai saya ${invoiceData.customerName} - ${invoiceData.invoiceId} telah melakukan pembayaran paket internet sebesar ${invoiceData.formattedAmount} melalui transfer ${selectedPaymentMethod.name} untuk periode ${invoiceData.date} silahkan di cek, terimakasih`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/6285117534914?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    toast.success("Konfirmasi pembayaran berhasil dikirim");
    resetTransaction(); // Clear the transaction state
    router.push("/history");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Nomor rekening disalin");
  };

  if (!invoiceData || !selectedPaymentMethod) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex w-full flex-col gap-4 p-3">
      {/* Header Info Usaha */}
      <div className="flex flex-col items-center gap-2 rounded-xl bg-background p-6 text-center shadow-xl border-2 border-ring/50">
        <div className="relative h-24 w-40 overflow-hidden">
          <Image
            src="/icons/zonahotspot.png"
            alt="Zonahotspot Logo"
            fill
            className="object-contain"
          />
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          <p>Kp. Kebon Kelapa No.01/02, Tanjungsari</p>
          <p>Kec. Sukaluyu, Kab. Cianjur, Jawa Barat 43284</p>
          <p>0851-1753-4914</p>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="rounded-xl bg-background p-4 shadow-xl border-2 border-ring/50">
        <div className="mb-4 flex items-center justify-between border-b border-ring/50 pb-2">
          <span className="text-sm font-bold text-foreground">Detail Tagihan</span>
          <span className="rounded-full bg-primary-theme/10 px-2 py-1 text-[10px] font-bold text-primary-theme">
            MENUNGGU
          </span>
        </div>
        
        <div className="flex flex-col gap-3 text-sm">
           <div className="flex justify-between">
            <span className="text-muted-foreground">No. Invoice</span>
            <span className="font-semibold">{invoiceData.invoiceId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Nama Pelanggan</span>
            <span className="font-semibold">{invoiceData.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Paket</span>
            <span className="font-semibold">{invoiceData.packageName} - {invoiceData.duration}</span>
          </div>
           <div className="flex justify-between">
            <span className="text-muted-foreground">Total Tagihan</span>
            <span className="font-bold text-primary-theme">{invoiceData.formattedAmount}</span>
          </div>
        </div>
      </div>

      {/* Payment Method & Account */}
      <div className="rounded-xl bg-background p-4 shadow-xl border-2 border-ring/50">
        <p className="mb-3 text-sm font-bold text-foreground">Metode Pembayaran</p>
        
        <div className="flex items-center gap-3 rounded-lg border border-ring/50 p-3">
          <div className="relative h-8 w-14 shrink-0">
             <Image
              src={selectedPaymentMethod.icon}
              alt={selectedPaymentMethod.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold">{selectedPaymentMethod.name}</span>
            <span className="text-xs text-muted-foreground">{selectedPaymentMethod.type}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-1 rounded-lg bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">Nomor Rekening</p>
          <div className="flex items-center justify-between">
            <p className="text-lg font-extrabold tracking-wider">{selectedPaymentMethod.accountNumber}</p>
            <button 
              onClick={() => copyToClipboard(selectedPaymentMethod.accountNumber)}
              className="rounded p-1.5 hover:bg-background text-primary-theme"
            >
              <Copy size={16} />
            </button>
          </div>
          <p className="text-xs text-muted-foreground">a.n {selectedPaymentMethod.accountName}</p>
        </div>
      </div>

      {/* Action */}
      <div className="rounded-xl bg-background p-4 shadow-xl border-2 border-ring/50">
         <button
          onClick={handleConfirm}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-theme py-3 text-sm font-extrabold text-primary-theme-foreground shadow hover:bg-primary-theme/90"
        >
          <CheckCircle2 size={18} />
          Saya Sudah Bayar
        </button>
        <p className="mt-3 text-center text-[10px] text-muted-foreground">
          Pastikan nominal transfer sesuai hingga 3 digit terakhir untuk verifikasi otomatis.
        </p>
      </div>
    </div>
  );
}