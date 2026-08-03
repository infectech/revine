import { Product } from "@/types";

export const products: Product[] = [
  {
    id: 1,
    code: "RK001",
    name: "Revine Black Shirt",
    description:
      "A wardrobe essential cut from breathable premium cotton. Clean lines, tailored fit, and a matte-black finish that pairs with everything.",
    price: 1100,
    images: [
      "/products/rk001/1.png",
      "/products/rk001/2.png",
      "/products/rk001/3.png",
    ],
  },
  {
    id: 2,
    code: "RK002",
    name: "Revine Charcoal Shirt",
    description:
      "Understated charcoal tone with a soft-touch finish. Designed for everyday wear with a structured, modern silhouette.",
    price: 1100,
    images: [
      "/products/rk002/1.png",
      "/products/rk002/2.png",
      "/products/rk002/3.png",
    ],
  },
  {
    id: 3,
    code: "RK003",
    name: "Revine Ivory Shirt",
    description:
      "Crisp ivory shirt with a relaxed drape. Lightweight fabric keeps you cool while the fit stays sharp all day.",
    price: 1050,
    images: [
      "/products/rk003/1.png",
      "/products/rk003/2.png",
      "/products/rk003/3.png",
    ],
  },
  {
    id: 4,
    code: "RK004",
    name: "Revine White Shirt",
    description:
      "The classic white shirt, reimagined. Premium combed cotton with reinforced stitching for a shirt that holds its shape wash after wash.",
    price: 1150,
    images: [
      "/products/rk004/1.png",
      "/products/rk004/2.png",
      "/products/rk004/3.png",
    ],
  },
  {
    id: 5,
    code: "RK005",
    name: "Revine Navy Shirt",
    description:
      "Deep navy shade with a subtle sheen. A versatile piece that transitions effortlessly from day to night.",
    price: 1150,
    images: [
      "/products/rk005/1.png",
      "/products/rk005/2.png",
      "/products/rk005/3.png",
    ],
  },
  {
    id: 6,
    code: "RK006",
    name: "Revine Olive Shirt",
    description:
      "Earthy olive tone with a utility-inspired cut. Durable fabric built for movement without sacrificing style.",
    price: 1200,
    images: [
      "/products/rk006/1.png",
      "/products/rk006/2.png",
      "/products/rk006/3.png",
    ],
  },
  {
    id: 7,
    code: "RK007",
    name: "Revine Beige Shirt",
    description:
      "Warm beige hue with a minimalist finish. Soft hand-feel fabric designed for all-day comfort.",
    price: 1050,
    images: [
      "/products/rk007/1.png",
      "/products/rk007/2.png",
      "/products/rk007/3.png",
    ],
  },
  {
    id: 8,
    code: "RK008",
    name: "Revine Maroon Shirt",
    description:
      "Rich maroon colorway with a tailored, confident fit. A statement piece for those who like to stand out.",
    price: 1200,
    images: [
      "/products/rk008/1.png",
      "/products/rk008/2.png",
      "/products/rk008/3.png",
    ],
  },
  {
    id: 9,
    code: "RK009",
    name: "Revine Grey Melange Shirt",
    description:
      "Textured grey melange fabric with a contemporary silhouette. Effortless style for the modern wardrobe.",
    price: 1100,
    images: [
      "/products/rk009/1.png",
      "/products/rk009/2.png",
      "/products/rk009/3.png",
    ],
  },
  {
    id: 10,
    code: "RK010",
    name: "Revine Signature Shirt",
    description:
      "Our signature cut with premium detailing. The finishing piece for a complete Revine wardrobe.",
    price: 1250,
    images: [
      "/products/rk010/1.png",
      "/products/rk010/2.png",
      "/products/rk010/3.png",
    ],
  },
];

export function getProductByCode(code: string): Product | undefined {
  return products.find((p) => p.code === code);
}
