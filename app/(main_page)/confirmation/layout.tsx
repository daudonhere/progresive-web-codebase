import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Konfirmasi Pembayaran - Zona Hotspot",
  description: "Konfirmasi pembayaran anda",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#f70a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function ConfirmationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-1">
      {children}
    </main>
  );
}
