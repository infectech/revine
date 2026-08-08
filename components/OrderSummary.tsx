"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Separator } from "@/components/ui/separator";
import { getDeliveryCharge } from "@/lib/config";
import {
  getCartQuantity,
  getCartUnitPrice,
  getLineTotal,
  hasMultiBuyDiscount,
} from "@/lib/pricing";
import { formatCurrency } from "@/lib/utils";

interface OrderSummaryProps {
  district?: string;
}

export default function OrderSummary({ district }: OrderSummaryProps) {
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const itemCount = getCartQuantity(items);
  const unitPrice = getCartUnitPrice(items);
  const deliveryCharge =
    district || hasMultiBuyDiscount(items)
      ? getDeliveryCharge(district || "Dhaka", itemCount)
      : null;
  const total = subtotal + (deliveryCharge ?? 0);

  return (
    <div className="rounded-3xl border border-black/5 bg-white p-5 sm:p-6 lg:sticky lg:top-24">
      <h2 className="font-heading text-lg font-semibold text-black">
        Order Summary
      </h2>
      <div className="mt-4 flex flex-col gap-4">
        {items.map((item) => (
          <div key={`${item.productCode}-${item.size}`} className="flex gap-3">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
              <Image
                src={item.image}
                alt={item.productName}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center gap-0.5">
              <p className="text-sm font-medium leading-tight text-black">
                {item.productName}
              </p>
              <p className="text-xs text-muted-foreground">
                Size: {item.size}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <button
                  type="button"
                  className="flex size-6 items-center justify-center rounded-full border border-black/15 hover:bg-muted disabled:opacity-40"
                  onClick={() =>
                    updateQuantity(
                      item.productCode,
                      item.size,
                      Math.max(1, item.quantity - 1)
                    )
                  }
                  disabled={item.quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="size-3" />
                </button>
                <span className="w-5 text-center text-sm">{item.quantity}</span>
                <button
                  type="button"
                  className="flex size-6 items-center justify-center rounded-full border border-black/15 hover:bg-muted"
                  onClick={() =>
                    updateQuantity(item.productCode, item.size, item.quantity + 1)
                  }
                  aria-label="Increase quantity"
                >
                  <Plus className="size-3" />
                </button>
                <button
                  type="button"
                  onClick={() => removeItem(item.productCode, item.size)}
                  className="ml-1 text-muted-foreground transition-colors hover:text-destructive"
                  aria-label="Remove item"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
            <p className="self-center text-sm font-medium text-black">
              {formatCurrency(getLineTotal(item, items))}
            </p>
          </div>
        ))}
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col gap-1.5 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Unit price</span>
          <span>{formatCurrency(unitPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Delivery</span>
          <span>
            {deliveryCharge !== null ? (
              formatCurrency(deliveryCharge)
            ) : (
              <span className="text-xs text-muted-foreground">
                Select district
              </span>
            )}
          </span>
        </div>
        <Separator className="my-1" />
        <div className="flex justify-between text-base font-semibold text-black">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}
