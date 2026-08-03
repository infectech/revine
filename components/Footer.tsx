import { SITE_CONFIG } from "@/lib/config";

export function Footer() {
  return (
    <footer id="about" className="mt-auto border-t border-black/5 bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h3 className="font-heading text-xl font-semibold tracking-tight text-white">
              REVINE
            </h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
              {SITE_CONFIG.description}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Cash on Delivery
            </h4>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
              Pay when your order arrives at your doorstep, anywhere in
              Bangladesh. No advance payment required.
            </p>
          </div>

          <div id="faq">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Contact
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              WhatsApp / Phone: 01XXXXXXXXX
              <br />
              Email: support@revine.example.com
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs text-white/40">
          &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
