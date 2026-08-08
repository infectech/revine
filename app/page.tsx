"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import ProductModal from "@/components/ProductModal";
import { products } from "@/data/products";
import { Product } from "@/types";
import { useCart } from "@/hooks/use-cart";
import { formatCurrency } from "@/lib/utils";

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);
  const itemCount = useCart((s) => s.itemCount());
  const subtotal = useCart((s) => s.subtotal());
  const openCart = useCart((s) => s.openCart);

  const handleSelect = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <>
      <section className="relative flex min-h-[620px] flex-col items-center justify-center overflow-hidden bg-black px-4 py-24 text-center text-white sm:px-6 sm:py-32 lg:px-8">
        <Image
          src="/products/rookies 05-08-26 RR 01.png"
          alt="Rookies DNMCO premium T-shirt"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/80" />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative text-xs font-semibold uppercase tracking-[0.3em] text-gold"
        >
          Designed in Bangladesh
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-heading relative mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
        >
          Rookies DNMCO Premium T-Shirts
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
        >
          Export quality cotton, durable stitching, and automatic multibuy
          savings. Cash on delivery, nationwide.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative mt-8"
        >
          <a href="#products">
            <Button
              size="lg"
              className="h-12 rounded-full bg-gold px-8 text-black hover:bg-gold/90"
            >
              Shop the Collection
            </Button>
          </a>
        </motion.div>
      </section>

      <section id="products" className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-heading text-3xl font-semibold text-black">
            Shop All T-Shirts
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Buy 2 or more for ৳600 per shirt plus ৳50 delivery.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={handleSelect}
              index={index}
            />
          ))}
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />

      {itemCount > 0 && (
        <button
          type="button"
          onClick={openCart}
          className="fixed inset-x-4 bottom-4 z-30 flex items-center justify-between rounded-full bg-black px-5 py-4 text-white shadow-lg shadow-black/20 md:hidden"
        >
          <span className="flex items-center gap-2 text-sm font-medium">
            <ShoppingBag className="size-4" />
            {itemCount} item{itemCount > 1 ? "s" : ""}
          </span>
          <span className="text-sm font-semibold text-gold">
            {formatCurrency(subtotal)}
          </span>
        </button>
      )}
    </>
  );
}
