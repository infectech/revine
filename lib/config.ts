export const SITE_CONFIG = {
  name: "Revine",
  description:
    "Premium everyday shirts, designed in Bangladesh. Cash on delivery available nationwide.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://revine.example.com",
};

export const DELIVERY_CHARGE = Number(
  process.env.NEXT_PUBLIC_DELIVERY_CHARGE ?? 120
);

export const SIZE_CHART = [
  { size: "L", chest: 42, length: 29 },
  { size: "XL", chest: 44, length: 30 },
  { size: "XXL", chest: 46, length: 31 },
  { size: "3XL", chest: 48, length: 32 },
] as const;

export const GOOGLE_SHEET_ENDPOINT =
  process.env.GOOGLE_SHEET_WEBHOOK_URL ?? "";

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
