"use client";

import { ReactNode } from "react";

export function Card({
  title,
  children,
  href
}: {
  title: string;
  children: ReactNode;
  href: string;
}): JSX.Element {
  return (
    <a
      href={href}
    >
      <h2>
        {title} <span>-&gt;</span>
      </h2>
      <p>{children}</p>
    </a>
  );
}
