export const SITE_CONFIG = {
  name: "Revine",
  description:
    "Premium everyday shirts, designed in Bangladesh. Cash on delivery available nationwide.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://revine.example.com",
};

export const DELIVERY_CHARGE_DHAKA = 70;
export const DELIVERY_CHARGE_OUTSIDE_DHAKA = 120;

export const DISTRICTS = [
  "Dhaka",
  "Gazipur",
  "Narayanganj",
  "Chattogram",
  "Cumilla",
  "Rajshahi",
  "Khulna",
  "Sylhet",
  "Barishal",
  "Rangpur",
  "Mymensingh",
  "Bogura",
  "Cox's Bazar",
  "Jessore",
  "Dinajpur",
  "Faridpur",
  "Tangail",
  "Narsingdi",
  "Noakhali",
  "Kishoreganj",
] as const;

export function getDeliveryCharge(district: string): number {
  return district.trim().toLowerCase() === "dhaka"
    ? DELIVERY_CHARGE_DHAKA
    : DELIVERY_CHARGE_OUTSIDE_DHAKA;
}

export const SIZE_CHART = [
  { size: "L", chest: 42, length: 29 },
  { size: "XL", chest: 44, length: 30 },
  { size: "XXL", chest: 46, length: 31 },
  { size: "3XL", chest: 48, length: 32 },
] as const;

export const GOOGLE_SHEET_ENDPOINT =
  process.env.GOOGLE_SHEET_WEBHOOK_URL ?? "";

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
