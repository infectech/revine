import { META_PIXEL_ID } from "@/lib/config";
import { CartItem } from "@/types";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function track(event: string, data?: Record<string, unknown>) {
  if (!META_PIXEL_ID) return;
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", event, data);
}

export function trackPageView() {
  track("PageView");
}

export function trackViewContent(item: {
  code: string;
  name: string;
  price: number;
}) {
  track("ViewContent", {
    content_ids: [item.code],
    content_name: item.name,
    content_type: "product",
    value: item.price,
    currency: "BDT",
  });
}

export function trackAddToCart(item: CartItem) {
  track("AddToCart", {
    content_ids: [item.productCode],
    content_name: item.productName,
    content_type: "product",
    value: item.price * item.quantity,
    currency: "BDT",
  });
}

export function trackInitiateCheckout(items: CartItem[], total: number) {
  track("InitiateCheckout", {
    content_ids: items.map((i) => i.productCode),
    num_items: items.reduce((s, i) => s + i.quantity, 0),
    value: total,
    currency: "BDT",
  });
}

export function trackPurchase(orderId: string, total: number) {
  track("Purchase", {
    value: total,
    currency: "BDT",
    order_id: orderId,
  });
}
