'use client';

import { useCartStore } from '@/lib/store/cart';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Header() {
  // We need to use a client-side trick to prevent hydration mismatch errors,
  // because the cart is loaded from localStorage on the client.
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const { items } = useCartStore();
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-primary">
          <Link href="/">متجري</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/admin" className="text-gray-600 hover:text-primary">
            لوحة التحكم
          </Link>
          <Link href="/cart" className="relative text-gray-600 hover:text-primary">
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            {isClient && totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 text-xs text-white bg-red-500 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
