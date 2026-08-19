"use client";

import { Size } from "@/types";
import { cn } from "@/lib/utils";

const SIZES: Size[] = ["M", "L", "XL", "XXL"];

interface SizeSelectorProps {
  value: Size | null;
  onChange: (size: Size) => void;
  outOfStockSizes?: Size[];
}

export default function SizeSelector({
  value,
  onChange,
  outOfStockSizes,
}: SizeSelectorProps) {
  return (
    <div role="radiogroup" aria-label="Select size" className="flex flex-wrap gap-2">
      {SIZES.map((size) => {
        const selected = value === size;
        const isOutOfStock = outOfStockSizes?.includes(size);
        return (
          <button
            key={size}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-disabled={isOutOfStock}
            disabled={isOutOfStock}
            tabIndex={isOutOfStock ? -1 : 0}
            onClick={() => {
              if (!isOutOfStock) onChange(size);
            }}
            onKeyDown={(e) => {
              if (isOutOfStock) return;
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onChange(size);
              }
            }}
            className={cn(
              "flex h-11 min-w-11 items-center justify-center rounded-full border px-4 text-sm font-medium transition-colors",
              isOutOfStock
                ? "cursor-not-allowed border-black/10 bg-gray-100 text-gray-400 opacity-50 line-through"
                : selected
                ? "border-black bg-black text-white"
                : "border-black/15 bg-white text-black hover:border-black/40"
            )}
          >
            {size}
          </button>
        );
      })}
    </div>
  );
}
