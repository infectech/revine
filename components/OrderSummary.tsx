"use client";

import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { Separator } from "@/components/ui/separator";
import { getDeliveryCharge } from "@/lib/config";
import { formatCurrency } from "@/lib/utils";

interface OrderSummaryProps {
  district?: string;
}

export default function OrderSummary({ district }: OrderSummaryProps) {
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const deliveryCharge = district ? getDeliveryCharge(district) : null;
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
                Size: {item.size} &middot; Qty: {item.quantity}
              </p>
            </div>
            <p className="self-center text-sm font-medium text-black">
              {formatCurrency(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col gap-1.5 text-sm">
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
