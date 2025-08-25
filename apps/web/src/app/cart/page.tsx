'use client';

import { useCartStore } from '@/lib/store/cart';
import { Button } from '@repo/ui/Button';
import Image from 'next/image'; // Placeholder for product images

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">سلة المشتريات</h1>
      {items.length === 0 ? (
        <p>سلة المشتريات فارغة.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white shadow rounded-lg">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center p-4 border-b">
                  <div className="w-20 h-20 bg-gray-200 rounded-md mr-4">
                    {/* Placeholder for image */}
                  </div>
                  <div className="flex-grow">
                    <h2 className="font-semibold">{item.product.name}</h2>
                    <p className="text-sm text-gray-500">{item.product.price.toFixed(2)} ر.س.</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="secondary" size="sm" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</Button>
                    <span>{item.quantity}</span>
                    <Button variant="secondary" size="sm" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</Button>
                  </div>
                  <div className="text-right w-24 font-semibold">
                    {(item.product.price * item.quantity).toFixed(2)} ر.س.
                  </div>
                  <button onClick={() => removeItem(item.product.id)} className="text-red-500 hover:text-red-700 ml-4">
                    إزالة
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-1">
            <div className="bg-white p-6 shadow rounded-lg">
              <h2 className="text-xl font-bold mb-4">ملخص الطلب</h2>
              <div className="flex justify-between mb-2">
                <span>المجموع الفرعي</span>
                <span>{total.toFixed(2)} ر.س.</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>الشحن</span>
                <span>سيتم تحديده لاحقاً</span>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>المجموع الكلي</span>
                <span>{total.toFixed(2)} ر.س.</span>
              </div>
              <Button className="w-full mt-6">المتابعة إلى الدفع</Button>
              <Button variant="secondary" className="w-full mt-2" onClick={clearCart}>
                إفراغ السلة
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
