import { Product } from "@/types";
import { SALE_PRICE } from "@/lib/pricing";

const PRODUCT_DESCRIPTION = `Export Quality Premium T-Shirt
100% Cotton Fabric
Fabric Weight: 210-230 GSM
Soft & Comfortable
Durable Stitching
Premium Quality`;

const productPhotoNumbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 31, 32, 33, 34, 35, 36, 37, 38, 39,
];

export const products: Product[] = productPhotoNumbers.map((photoNumber, index) => {
  const code = `RR${String(photoNumber).padStart(2, "0")}`;

  return {
    id: index + 1,
    code,
    name: `Rookies DNMCO Premium T-Shirt ${String(photoNumber).padStart(2, "0")}`,
    description: PRODUCT_DESCRIPTION,
    price: SALE_PRICE,
    images: [
      `/products/rookies 05-08-26 RR ${String(photoNumber).padStart(2, "0")}.png`,
    ],
  };
});

export function getProductByCode(code: string): Product | undefined {
  return products.find((p) => p.code === code);
}
