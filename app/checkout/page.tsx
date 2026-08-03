"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { trackInitiateCheckout } from "@/lib/pixel";
import CheckoutForm from "@/components/CheckoutForm";
import OrderSummary from "@/components/OrderSummary";
import { Button } from "@/components/ui/button";

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const [district, setDistrict] = useState("");

  useEffect(() => {
    if (items.length > 0) {
      trackInitiateCheckout(items, subtotal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="font-heading text-2xl font-semibold text-black">
          Your cart is empty
        </h1>
        <p className="text-sm text-muted-foreground">
          Add a few items to your cart before heading to checkout.
        </p>
        <Link href="/#products">
          <Button className="h-11 rounded-full bg-black text-white hover:bg-gold hover:text-black">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-black"
      >
        <ChevronLeft className="size-4" />
        Continue Shopping
      </Link>

      <h1 className="mt-4 font-heading text-2xl font-semibold tracking-tight text-black sm:text-3xl">
        Checkout
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Cash on delivery &mdash; pay when your order arrives.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <OrderSummary district={district} />
        <CheckoutForm onDistrictChange={setDistrict} />
      </div>
    </div>
  );
}
