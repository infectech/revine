"use client";

import { motion } from "framer-motion";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import ProductSlider from "@/components/ProductSlider";
import { formatCurrency } from "@/lib/utils";

export interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  index?: number;
}

export function ProductCard({ product, onSelect, index = 0 }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06, ease: "easeOut" }}
      className="flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white"
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelect(product)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(product);
          }
        }}
        className="block cursor-pointer text-left"
        aria-label={`View ${product.name}`}
      >
        <ProductSlider images={product.images} alt={product.name} className="rounded-none" />
      </div>

      <div className="flex flex-1 flex-col gap-1 p-2.5 sm:p-4">
        <h3 className="font-heading text-sm font-medium leading-snug text-black sm:text-lg">
          {product.name}
        </h3>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground sm:text-xs">
          {product.code}
        </p>
        <p className="mt-0.5 text-sm font-semibold text-black sm:mt-1 sm:text-base">
          {formatCurrency(product.price)}
        </p>

        <Button
          onClick={() => onSelect(product)}
          className="mt-2 h-9 w-full rounded-full bg-black text-xs text-white transition-colors hover:bg-gold hover:text-black sm:mt-3 sm:h-11 sm:text-sm"
        >
          View Details
        </Button>
      </div>
    </motion.div>
  );
}

export default ProductCard;
