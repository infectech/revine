import Image from "next/image";
import { SITE_CONFIG } from "@/lib/config";

export function Footer() {
  return (
    <footer id="about" className="mt-auto border-t border-black/5 bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Image
              src="/logo white.png"
              alt={SITE_CONFIG.name}
              width={164}
              height={48}
              className="h-12 w-auto object-contain"
              style={{ width: "auto" }}
            />
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

          <div id="contact">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gold">
              Contact
            </h4>
            <div className="mt-3 flex flex-col gap-2 text-sm leading-relaxed text-white/60">
              <p>
                Phone: <a href="tel:01777548390" className="hover:text-gold transition-colors">01777548390</a>,{" "}
                <a href="tel:01400550357" className="hover:text-gold transition-colors">01400550357</a>
              </p>
              <p>
                WhatsApp: <a href="https://wa.me/8801400550357" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">01400550357</a>
              </p>
              <p>
                Email: <a href="mailto:rookiesdnmco@gmail.com" className="hover:text-gold transition-colors">rookiesdnmco@gmail.com</a>
              </p>
              <p>Address: {SITE_CONFIG.address}</p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights
            reserved.
          </p>
          <p>
            Built by{" "}
            <a
              href="https://infectech.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 underline underline-offset-2 transition-colors hover:text-gold"
            >
              Infectech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}