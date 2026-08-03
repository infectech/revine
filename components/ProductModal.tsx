"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Product, Size } from "@/types";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ProductSlider, { ProductSliderApi } from "@/components/ProductSlider";
import SizeSelector from "@/components/SizeSelector";
import SizeChart from "@/components/SizeChart";
import { useCart } from "@/hooks/use-cart";
import { trackAddToCart, trackViewContent } from "@/lib/pixel";
import { cn, formatCurrency } from "@/lib/utils";

interface ProductModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProductModal({
  product,
  open,
  onOpenChange,
}: ProductModalProps) {
  const [size, setSize] = useState<Size | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const addItem = useCart((s) => s.addItem);
  const sliderApiRef = useRef<ProductSliderApi | null>(null);

  useEffect(() => {
    if (open && product) {
      setSize(null);
      setActiveImage(0);
      trackViewContent({
        code: product.code,
        name: product.name,
        price: product.price,
      });
    }
  }, [open, product]);

  if (!product) return null;

  const handleThumbnailClick = (index: number) => {
    setActiveImage(index);
    sliderApiRef.current?.scrollTo(index);
  };

  const handleAddToCart = () => {
    if (!size) return;
    const item = {
      productCode: product.code,
      productName: product.name,
      size,
      quantity: 1,
      price: product.price,
      image: product.images[0],
    };
    addItem(item);
    trackAddToCart(item);
    toast.success("Added to cart", {
      description: `${product.name} (${size})`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl sm:max-w-3xl">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-3">
            <ProductSlider
              images={product.images}
              alt={product.name}
              onApiChange={(api) => {
                sliderApiRef.current = api;
              }}
              onSlideChange={setActiveImage}
            />
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => handleThumbnailClick(i)}
                    className={cn(
                      "relative aspect-square w-16 overflow-hidden rounded-lg border-2 transition-colors",
                      i === activeImage ? "border-gold" : "border-transparent"
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-black">
                {product.name}
              </h2>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {product.code}
              </p>
              <p className="mt-2 text-lg font-semibold text-black">
                {formatCurrency(product.price)}
              </p>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>

            <div>
              <p className="mb-2 text-sm font-medium text-black">
                Select Size
              </p>
              <SizeSelector value={size} onChange={setSize} />
            </div>

            <SizeChart />

            <Button
              className={cn(
                "mt-2 h-12 w-full rounded-full text-base",
                size
                  ? "bg-black text-white hover:bg-gold hover:text-black"
                  : "bg-muted text-muted-foreground"
              )}
              disabled={!size}
              onClick={handleAddToCart}
            >
              {size ? "Add to Cart" : "Select a size"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
