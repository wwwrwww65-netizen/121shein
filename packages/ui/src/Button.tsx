'use client';

import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'destructive';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, variant = 'primary', ...props }, ref) => {
    const baseClasses = 'px-4 py-2 rounded-md font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variantClasses = {
      primary: 'bg-primary hover:bg-primary/90 focus:ring-primary',
      secondary: 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-500',
      destructive: 'bg-red-600 hover:bg-red-700 focus:ring-red-600',
    };

    return (
      <button
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };

// Example of how to use it with Arabic text:
// <Button>إضافة إلى السلة</Button> // "Add to Cart"
