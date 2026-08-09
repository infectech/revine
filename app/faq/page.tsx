"use client";

import { SITE_CONFIG } from "@/lib/config";

export default function FAQPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-8 font-heading text-3xl font-semibold tracking-tight text-black sm:text-4xl">
        Frequently Asked Questions
      </h1>

      <div className="space-y-8">
        <div className="bg-white rounded-2xl border border-black/5 p-6">
          <h2 className="mb-4 font-heading text-xl font-semibold text-black">
            Delivery Time
          </h2>
          <p className="mb-4">
            - Inside Dhaka: 1–2 working days
          </p>
          <p className="mb-4">
            - Outside Dhaka: 2–3 working days
          </p>
          <p className="text-sm text-muted-foreground">
            Delivery may occasionally be delayed due to unforeseen circumstances or courier-related issues.
          </p>
        </div>

        {/* Additional FAQ sections can be added here in the future */}
      </div>
    </div>
  );
}