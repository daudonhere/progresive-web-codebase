"use client";

import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLoaderStore } from "@/stores/loaderStore";
import { useTransactionStore, PaymentMethod } from "@/stores/transactionStore";

export default function PaymentPage() {
  const router = useRouter();
  const { startLoading } = useLoaderStore();
  const { invoiceData, setPaymentMethod } = useTransactionStore();

  const handleSelectPayment = (method: PaymentMethod) => {
    setPaymentMethod(method);
    startLoading();
    router.push("/confirmation");
  };

  if (!invoiceData) {
    // If accessed directly without invoice data, redirect back
    if (typeof window !== "undefined") {
        router.replace("/invoice");
    }
    return null; 
  }

  return (
    <div className="flex w-full flex-col gap-4 p-3">

      <div className="rounded-xl bg-primary-theme p-4 text-background shadow-xl border-2 border-ring/50">
        <p className="text-xs opacity-80">Invoice</p>
        <p className="text-lg font-extrabold">{invoiceData.invoiceId}</p>

        <div className="mt-3 flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span>Paket</span>
            <span className="font-semibold">{invoiceData.packageName}</span>
          </div>
          <div className="flex justify-between">
            <span>Durasi</span>
            <span className="font-semibold">{invoiceData.duration}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Tagihan</span>
            <span className="text-base font-extrabold">{invoiceData.formattedAmount}</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-background p-4 shadow-xl border-2 border-ring/50">
        <p className="text-sm font-bold text-foreground">Metode Pembayaran</p>

        <div className="mt-4 flex flex-col gap-3">

          <PaymentItem
            method={{
                id: "qris",
                name: "QRIS",
                type: "Scan QR",
                icon: "/icons/payment/qris.png",
                accountNumber: "", 
                accountName: "PT Zona Hotspot Indonesia"
            }}
            subtitle="Scan QR untuk membayar"
            onClick={handleSelectPayment}
            disabled
          />

          <PaymentItem
            method={{
                id: "dana",
                name: "DANA",
                type: "E-Wallet",
                icon: "/icons/payment/dana.png",
                accountNumber: "085794991413",
                accountName: "Saepul"
            }}
            subtitle="Saldo DANA"
            onClick={handleSelectPayment}
          />

          <PaymentItem
             method={{
                id: "ovo",
                name: "OVO",
                type: "E-Wallet",
                icon: "/icons/payment/ovo.png",
                accountNumber: "081234567890",
                accountName: "Zona Hotspot"
            }}
            subtitle="Saldo OVO"
            onClick={handleSelectPayment}
            disabled
          />

          <p className="mt-2 text-xs font-semibold text-gray-500">
            Virtual Account
          </p>

          <PaymentItem
            method={{
                id: "mandiri",
                name: "Mandiri",
                type: "Virtual Account",
                icon: "/icons/payment/mandiri.png",
                accountNumber: "880123456789",
                accountName: "PT Zona Hotspot Indonesia"
            }}
            subtitle="Virtual Account"
            onClick={handleSelectPayment}
            disabled
          />
          <PaymentItem
             method={{
                id: "bca",
                name: "Bank BCA",
                type: "Virtual Account",
                icon: "/icons/payment/bca.png",
                accountNumber: "3480472160",
                accountName: "Saepul"
            }}
            subtitle="Virtual Account"
            onClick={handleSelectPayment}
          />
          <PaymentItem
            method={{
                id: "bri",
                name: "Bank BRI",
                type: "Virtual Account",
                icon: "/icons/payment/bri.png",
                accountNumber: "5550123456789",
                accountName: "PT Zona Hotspot Indonesia"
            }}
            subtitle="Virtual Account"
            onClick={handleSelectPayment}
            disabled
          />
          <PaymentItem
            method={{
                id: "bni",
                name: "Bank BNI",
                type: "Virtual Account",
                icon: "/icons/payment/bni.png",
                accountNumber: "9990123456789",
                accountName: "PT Zona Hotspot Indonesia"
            }}
            subtitle="Virtual Account"
            onClick={handleSelectPayment}
            disabled
          />
          <PaymentItem
             method={{
                id: "seabank",
                name: "Seabank",
                type: "Virtual Account",
                icon: "/icons/payment/seabank.png",
                accountNumber: "901660218822",
                accountName: "Saepul"
            }}
            subtitle="Virtual Account"
            onClick={handleSelectPayment}
          />

        </div>
      </div>

      <div className="text-center text-xs text-gray-500">
        Dengan melanjutkan pembayaran, Anda menyetujui syarat & ketentuan penggunaan dan pembayaran.
      </div>

    </div>
  );
}


function PaymentItem({
  method,
  subtitle,
  disabled = false,
  onClick
}: {
  method: PaymentMethod;
  subtitle: string;
  disabled?: boolean;
  onClick: (method: PaymentMethod) => void;
}) {
  return (
    <button
      disabled={disabled}
      onClick={() => onClick(method)}
      className={`flex w-full items-center justify-between rounded-lg border border-ring/50 px-3 py-3 shadow-sm transition-all ${
        disabled
          ? "bg-gray-100 grayscale opacity-60 cursor-not-allowed"
          : "bg-white hover:bg-gray-50 active:scale-[0.98]"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="relative h-8 w-8">
          <Image
            src={method.icon}
            alt={method.name}
            fill
            className="object-contain"
          />
        </div>

        <div className="flex flex-col items-start text-sm">
          <span className="font-semibold text-foreground">
            {method.name} {disabled && <span className="text-[10px] font-normal text-muted-foreground">(Maintenance)</span>}
          </span>
          <span className="text-xs text-gray-500">
            {subtitle}
          </span>
        </div>
      </div>

      <span className={`${disabled ? "text-gray-400" : "text-primary-theme"} text-lg font-bold`}>
        <ChevronRight />
      </span>
    </button>
  );
}