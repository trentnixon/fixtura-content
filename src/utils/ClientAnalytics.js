// ClientAnalytics.js
"use client";
import { initGA, trackWebVitals } from "@/utils/GA";
import { useEffect } from 'react';

export default function ClientAnalytics() {
  useEffect(() => {
    initGA();
    trackWebVitals();
  }, []);

  return null; // This component does not render anything
}
