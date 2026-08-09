"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, PackageCheck, PhoneCall, Check } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/hooks/use-cart";
import { DISTRICTS, getDeliveryCharge } from "@/lib/config";
import { getCartQuantity, getCartUnitPrice } from "@/lib/pricing";
import { trackPurchase } from "@/lib/pixel";
import { OrderPayload, OrderResponse } from "@/types";
import Link from "next/link";

const checkoutSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  phone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Enter a valid Bangladeshi phone number"),
  address: z.string().min(1, "Address is required"),
  district: z.string().min(1, "District is required"),
  area: z.string().min(1, "Area / Thana is required"),
  note: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  onDistrictChange?: (district: string) => void;
  onOrderPlaced?: (orderId: string) => void;
}

export default function CheckoutForm({
  onDistrictChange,
  onOrderPlaced,
}: CheckoutFormProps) {
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const clearCart = useCart((s) => s.clearCart);

  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      district: "",
      area: "",
      note: "",
    },
  });

  const [isChecked, setIsChecked] = useState(false);

  const onSubmit = async (values: CheckoutFormValues) => {
    if (items.length === 0) return;
    setSubmitting(true);

    const itemCount = getCartQuantity(items);
    const unitPrice = getCartUnitPrice(items);
    const deliveryCharge = getDeliveryCharge(values.district, itemCount);
    const total = subtotal + deliveryCharge;

    const payload: OrderPayload = {
      customer: {
        name: values.name,
        phone: values.phone,
        address: values.address,
        district: values.district,
        area: values.area,
        note: values.note,
      },
      items: items.map((i) => ({
        productCode: i.productCode,
        productName: i.productName,
        size: i.size,
        quantity: i.quantity,
        price: unitPrice,
      })),
      deliveryCharge,
      total,
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: OrderResponse = await res.json();

      if (data.success && data.orderId) {
        trackPurchase(data.orderId, total);
        onOrderPlaced?.(data.orderId);
        clearCart();
      } else {
        toast.error(
          data.message ?? "We couldn't place your order. Please try again."
        );
      }
    } catch {
      toast.error(
        "Something went wrong. Please check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 rounded-3xl border border-black/5 bg-white p-5 sm:p-6"
      noValidate
    >
      <h2 className="font-heading text-lg font-semibold text-black">
        Delivery Details
      </h2>

      <div className="flex items-start gap-2 rounded-2xl bg-muted px-4 py-3 text-sm text-muted-foreground">
        <PhoneCall className="mt-0.5 size-4 shrink-0 text-gold" />
        <p>Our representative will call you shortly to confirm your order.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          placeholder="Your full name"
          aria-invalid={!!errors.name}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="phone">Phone *</Label>
        <Input
          id="phone"
          placeholder="01XXXXXXXXX"
          inputMode="numeric"
          aria-invalid={!!errors.phone}
          {...register("phone")}
        />
        {errors.phone && (
          <p className="text-xs text-destructive">{errors.phone.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="address">Address *</Label>
        <TextArea
          id="address"
          placeholder="House, road, area details"
          aria-invalid={!!errors.address}
          {...register("address")}
        />
        {errors.address && (
          <p className="text-xs text-destructive">{errors.address.message}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="district">District *</Label>
          <Controller
            name="district"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value ?? "");
                  onDistrictChange?.(value ?? "");
                }}
              >
                <SelectTrigger
                  id="district"
                  aria-invalid={!!errors.district}
                  className="h-8 w-full"
                >
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  {DISTRICTS.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.district && (
            <p className="text-xs text-destructive">
              {errors.district.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="area">Area / Thana *</Label>
          <Input
            id="area"
            placeholder="e.g. Mirpur"
            aria-invalid={!!errors.area}
            {...register("area")}
          />
          {errors.area && (
            <p className="text-xs text-destructive">{errors.area.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="note">Note (optional)</Label>
        <Textarea
          id="note"
          placeholder="Anything we should know about your delivery?"
          {...register("note")}
        />
      </div>

      <section className="rounded-2xl border border-[#E53935]/15 bg-[#E53935]/5 p-4">
        <div className="flex items-start gap-2">
          <PackageCheck className="mt-0.5 size-4 shrink-0 text-[#E53935]" />
          <div>
            <h3 className="text-sm font-semibold text-black">
              Rookies DNMCO - Return & Exchange Policy
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-relaxed text-muted-foreground">
              <li>10 Days Easy Exchange.</li>
              <li>
                Check your parcel in front of the delivery person before
                accepting.
              </li>
              <li>No return after the delivery person leaves.</li>
              <li>
                Exchange only for size issues, wrong product, or manufacturing
                defects.
              </li>
              <li>
                Courier charges for exchanges may apply unless the error is from
                Rookies DNMCO.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="flex items-start gap-2 rounded-2xl border border-[#5B83E5]/15 bg-[#5B83E5]/5 p-4">
        <Link
          href="/faq"
          className="text-primary-600 underline"
          onClick={(e) => e.preventDefault()}
        >
          <span className="size-4 text-[#5B83E5]">
            <Check className="text-primary-600" aria-hidden="true" />
          </span>
          Check our FAQ for delivery time details
        </Link>
        <h3 className="text-sm font-semibold ml-4 text-black">
          I agree to the terms and condition
        </h3>
        <Input
          id="termsAgree"
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          disabled={submitting}
          className="text-primary-600 text-md"
        />
        <p className="ml-4 text-xs text-muted-foreground">
          By placing your order, you agree to the <Link href="/faq">FAQ</Link>
          and <Link href="/terms">Terms & Conditions</Link> including delivery
          times.
        </p>
      </section>

      <Button
        type="submit"
        disabled={submitting || items.length === 0 || !isChecked}
        className="mt-2 h-12 w-full rounded-full bg-black text-base text-white hover:bg-gold hover:text-black"
      >
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Placing Order...
          </>
        ) : (
          "Place Order (Cash on Delivery)"
        )}
      </Button>
    </form>
  );
}