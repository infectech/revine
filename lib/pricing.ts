import { CartItem } from "@/types";

export const ORIGINAL_PRICE = 1200;
export const SALE_PRICE = 600;
export const MULTI_BUY_PRICE = 600;
export const MULTI_BUY_MIN_QUANTITY = 2;
export const PROMO_DELIVERY_CHARGE = 50;

export function getDiscountPercent(
  originalPrice = ORIGINAL_PRICE,
  salePrice = SALE_PRICE
) {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
}

export function getCartQuantity(items: Pick<CartItem, "quantity">[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getPromoUnitPrice(quantity: number) {
  return quantity >= MULTI_BUY_MIN_QUANTITY ? MULTI_BUY_PRICE : SALE_PRICE;
}

export function getCartUnitPrice(items: Pick<CartItem, "quantity">[]) {
  return getPromoUnitPrice(getCartQuantity(items));
}

export function getCartSubtotal(items: Pick<CartItem, "quantity">[]) {
  const unitPrice = getCartUnitPrice(items);
  return items.reduce((sum, item) => sum + unitPrice * item.quantity, 0);
}

export function getLineTotal(
  item: Pick<CartItem, "quantity">,
  items: Pick<CartItem, "quantity">[]
) {
  return getCartUnitPrice(items) * item.quantity;
}

export function hasMultiBuyDiscount(items: Pick<CartItem, "quantity">[]) {
  return getCartQuantity(items) >= MULTI_BUY_MIN_QUANTITY;
}

export function getDeliveryChargeForItems(
  district: string,
  items: Pick<CartItem, "quantity">[]
) {
  if (hasMultiBuyDiscount(items)) return PROMO_DELIVERY_CHARGE;

  return district.trim().toLowerCase() === "dhaka" ? 80 : 130;
}
