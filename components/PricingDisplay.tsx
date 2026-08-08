import {
  getDiscountPercent,
  ORIGINAL_PRICE,
  SALE_PRICE,
} from "@/lib/pricing";
import { cn, formatCurrency } from "@/lib/utils";

interface PricingDisplayProps {
  className?: string;
  compact?: boolean;
}

export default function PricingDisplay({
  className,
  compact = false,
}: PricingDisplayProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <span className="text-muted-foreground line-through">
        {formatCurrency(ORIGINAL_PRICE)}
      </span>
      <span
        className={cn(
          "font-bold text-[#E53935]",
          compact ? "text-sm sm:text-base" : "text-xl"
        )}
      >
        {formatCurrency(SALE_PRICE)}
      </span>
      <span className="rounded-full bg-[#E53935]/10 px-2 py-0.5 text-[11px] font-bold text-[#E53935]">
        Special Offer
      </span>
    </div>
  );
}
