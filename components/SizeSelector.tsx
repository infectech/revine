"use client";

import { Size } from "@/types";
import { cn } from "@/lib/utils";

const SIZES: Size[] = ["M", "L", "XL", "XXL"];

interface SizeSelectorProps {
  value: Size | null;
  onChange: (size: Size) => void;
}

export default function SizeSelector({ value, onChange }: SizeSelectorProps) {
  return (
    <div role="radiogroup" aria-label="Select size" className="flex flex-wrap gap-2">
      {SIZES.map((size) => {
        const selected = value === size;
        return (
          <button
            key={size}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={0}
            onClick={() => onChange(size)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onChange(size);
              }
            }}
            className={cn(
              "flex h-11 min-w-11 items-center justify-center rounded-full border px-4 text-sm font-medium transition-colors",
              selected
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
