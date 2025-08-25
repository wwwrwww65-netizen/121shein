'use client'; // This page now needs to be a client component to use hooks

import { trpc } from '@/lib/trpc/client';
import { Button } from '@repo/ui/Button';
import { useCartStore } from '@/lib/store/cart';
import type { Product } from '@repo/db';

export default function Page(): JSX.Element {
  const { data: products, isLoading, error } = trpc.product.getAll.useQuery();
  const { addItem } = useCartStore();

  const handleAddToCart = (product: Product) => {
    addItem(product);
    // Optional: Show a toast notification or some feedback
    alert(`تمت إضافة "${product.name}" إلى السلة!`);
  };

  if (isLoading) {
    return <div className="text-center p-24">جاري تحميل المنتجات...</div>;
  }

  if (error) {
    return <div className="text-center p-24 text-red-500">حدث خطأ: {error.message}</div>;
  }

  return (
    <main className="container mx-auto p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-primary mb-4">متجرنا الإلكتروني</h1>
        <p className="text-xl text-gray-600">اكتشف أحدث صيحات الموضة</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products?.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">صورة المنتج</span>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold mb-2 flex-grow">{product.name}</h2>
              <p className="text-lg text-primary font-bold mb-4">{product.price.toFixed(2)} ر.س.</p>
              <Button
                className="w-full mt-auto"
                onClick={() => handleAddToCart(product)}
              >
                أضف إلى السلة
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
