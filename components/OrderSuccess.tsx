"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";
import { formatCurrency } from "@/lib/utils";

interface OrderSuccessProps {
  orderId: string;
  total: number;
}

export default function OrderSuccess({ orderId, total }: OrderSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mx-auto mt-8 flex max-w-lg flex-col items-center gap-4 rounded-3xl border border-black/5 bg-white p-10 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 14 }}
      >
        <CheckCircle2 className="size-16 text-gold" strokeWidth={1.5} />
      </motion.div>
      <h2 className="font-heading text-2xl font-semibold text-black">
        Order Successfully Placed
      </h2>
      <p className="text-sm text-muted-foreground">
        Thank you for shopping with {SITE_CONFIG.name}. Our representative will
        call you shortly to confirm delivery.
      </p>
      <div className="flex w-full flex-col gap-2 rounded-2xl bg-muted p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Order ID</span>
          <span className="font-medium text-black">{orderId}</span>
        </div>
        <div className="flex items-center justify-between text-base">
          <span className="font-semibold text-black">Total Bill</span>
          <span className="font-semibold text-black">
            {formatCurrency(total)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
