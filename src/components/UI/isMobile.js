"use client";
import { useMediaQuery } from "@mantine/hooks";

export function MobileChecker({ children, mobileOnly = false }) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (mobileOnly ? !isMobile : isMobile) {
    return null;
  }

  return children;
}
