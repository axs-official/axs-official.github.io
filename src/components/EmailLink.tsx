"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

/**
 * The address is split up and the mailto: target only exists after mount,
 * so a plain scraper reading the HTML doesn't walk away with a working link.
 * No JS: the text is still visible, just not clickable.
 */
const parts = ["axs", "contact", "me"];

export function EmailLink({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const [href, setHref] = useState<string>();

  useEffect(() => {
    setHref(["mail", "to:", parts.join("."), "@", "gmail", ".", "com"].join(""));
  }, []);

  return (
    <a href={href} className={className} aria-label={`Email ${site.email}`}>
      {children ?? site.email}
    </a>
  );
}
