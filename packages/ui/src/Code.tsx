"use client";

import { ReactNode } from "react";

export const Code = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <code className={className}>
      {children}
    </code>
  );
};
