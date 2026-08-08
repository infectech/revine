"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { SITE_CONFIG } from "@/lib/config";

export function Header() {
  const itemCount = useCart((s) => s.itemCount());
  const openCart = useCart((s) => s.openCart);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/5 bg-white/85 backdrop-blur-md">
      <div className="bg-[#E53935] px-3 py-2 text-center text-xs font-bold leading-snug text-white sm:text-sm">
        🎉 Premium Quality Shirts | Cash on Delivery Nationwide
      </div>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center" aria-label={`${SITE_CONFIG.name} home`}>
          <Image
            src="/logo golden.png"
            alt={SITE_CONFIG.name}
            width={154}
            height={40}
            priority
            className="h-10 w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-black/70 md:flex">
          <a href="#products" className="transition-colors hover:text-black">
            Shop
          </a>
          <a href="#about" className="transition-colors hover:text-black">
            About
          </a>
          <a href="#faq" className="transition-colors hover:text-black">
            FAQ
          </a>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Open cart"
          onClick={openCart}
          className="relative h-10 w-10 rounded-full hover:bg-black/5"
        >
          <ShoppingBag className="size-5 text-black" />
          {itemCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-semibold text-black">
              {itemCount}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
}
