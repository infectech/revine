"use client";

import { useEffect } from "react";
import { trackPageView } from "@/lib/pixel";

export default function PixelInit() {
  useEffect(() => {
    trackPageView();
  }, []);

  return null;
}
