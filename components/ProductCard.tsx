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

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-heading text-lg font-medium leading-snug text-black">
          {product.name}
        </h3>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {product.code}
        </p>
        <p className="mt-1 text-base font-semibold text-black">
          {formatCurrency(product.price)}
        </p>

        <Button
          onClick={() => onSelect(product)}
          className="mt-3 h-11 w-full rounded-full bg-black text-white transition-colors hover:bg-gold hover:text-black"
        >
          View Details
        </Button>
      </div>
    </motion.div>
  );
}

export default ProductCard;
