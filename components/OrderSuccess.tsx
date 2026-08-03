"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface OrderSuccessProps {
  orderId: string;
}

export default function OrderSuccess({ orderId }: OrderSuccessProps) {
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
        Thank you for shopping with Revine. Our representative will call you
        shortly to confirm delivery.
      </p>
      <p className="rounded-full bg-muted px-4 py-1.5 text-sm font-medium text-black">
        Your Order ID: {orderId}
      </p>
    </motion.div>
  );
}
