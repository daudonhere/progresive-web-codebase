"use client";

import { Home, ShoppingBag, ReceiptText, User } from "lucide-react";

export default function BottomNavigation() {
  return (
    <nav className="fixed bottom-0 left-1/2 z-50 rounded-t-3xl w-full min-w-full -translate-x-1/2 border-t border-l border-r border-ring/50 bg-background shadow-2xl">
      <div className="flex justify-around py-3 text-xs text-ring">
        <NavItem label="Beranda" active icon={<Home size={25} />} />
        <NavItem label="Paket" icon={<ShoppingBag size={25} />} />
        <NavItem label="Tagihan" icon={<ReceiptText size={25} />} />
        <NavItem label="Akun" icon={<User size={25} />} />
      </div>
    </nav>
  );
}

function NavItem({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-1 ${
        active ? "text-primary-theme" : ""
      }`}
    >
      {icon}
      <span className="text-[12px] font-semibold">{label}</span>
    </div>
  );
}
