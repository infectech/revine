import Link from "next/link";
import { ChevronLeft, PackageCheck } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config";

export const metadata = {
  title: `FAQ | ${SITE_CONFIG.name}`,
  description: "Frequently asked questions about returns, exchanges, and delivery.",
};

export default function FAQPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-black"
      >
        <ChevronLeft className="size-4" />
        Back to Shop
      </Link>

      <h1 className="mt-4 font-heading text-3xl font-semibold text-black sm:text-4xl">
        FAQ
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Everything you need to know about ordering from {SITE_CONFIG.name}.
      </p>

      <div className="mt-10 space-y-6">
        <section className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <PackageCheck className="mt-0.5 size-5 shrink-0 text-[#E53935]" />
            <div>
              <h2 className="font-heading text-xl font-semibold text-black">
                Rookies DNMCO — Return &amp; Exchange Policy
              </h2>
              <p className="mt-1 text-sm font-medium text-gold">
                10 Days Easy Exchange 🤝
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span>📦</span>
                  <span>Please check your parcel in front of the delivery person before accepting it.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>❌</span>
                  <span>No return is possible after the delivery person leaves.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>🔄</span>
                  <span>Exchange is available within 10 days for any reason.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>🚚</span>
                  <span>
                    If the exchange is due to a size issue, change of mind, or any reason not caused by {SITE_CONFIG.name}, applicable delivery/courier charges will be paid by the customer.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span>❤️</span>
                  <span>
                    If the issue is due to wrong product, manufacturing defect, or any mistake from {SITE_CONFIG.name}, we’ll cover the exchange delivery charge.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-black/5 bg-white p-6 sm:p-8">
          <h3 className="font-heading text-lg font-semibold text-black">
            Need more help?
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            If you have any questions about returns, exchanges, or your order, feel free to reach out.
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <p>
              Phone:{" "}
              <a href="tel:01777548390" className="text-gold hover:underline">
                01777548390
              </a>
              ,{" "}
              <a href="tel:01400550357" className="text-gold hover:underline">
                01400550357
              </a>
            </p>
            <p>
              WhatsApp:{" "}
              <a
                href="https://wa.me/8801400550357"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:underline"
              >
                01400550357
              </a>
            </p>
            <p>
              Email:{" "}
              <a
                href="mailto:rookiesdnmco@gmail.com"
                className="text-gold hover:underline"
              >
                rookiesdnmco@gmail.com
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
