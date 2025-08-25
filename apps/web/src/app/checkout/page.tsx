'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useCartStore } from '@/lib/store/cart';
import { Button } from '@repo/ui/Button';

export default function CheckoutPage() {
  const router = useRouter();
  const { items } = useCartStore();

  // State for Shipping Address Form
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      router.push('/login?redirect=/checkout');
    }
    if (items.length === 0 && !!token) {
      router.push('/');
    }
  }, [router, items]);

  if (!Cookies.get('token') || items.length === 0) {
    return <div>جاري التحميل...</div>;
  }

  const handlePlaceOrder = () => {
    console.log('Placing order with:', {
      shippingAddress: { street, city, zip, country },
      items,
      total,
    });
    alert('هذه الميزة قيد التطوير. تم تسجيل تفاصيل الطلب في الكونسول.');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">إتمام عملية الدفع</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2">
          <div className="space-y-8">
            {/* Shipping Address Form */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">1. عنوان الشحن</h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label htmlFor="street" className="block text-sm font-medium text-gray-700">الشارع</label>
                  <input type="text" id="street" value={street} onChange={(e) => setStreet(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">المدينة</label>
                  <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div>
                  <label htmlFor="zip" className="block text-sm font-medium text-gray-700">الرمز البريدي</label>
                  <input type="text" id="zip" value={zip} onChange={(e) => setZip(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">الدولة</label>
                  <input type="text" id="country" value={country} onChange={(e) => setCountry(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
                </div>
              </form>
            </div>

            {/* Payment Information Form (Placeholder) */}
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">2. معلومات الدفع</h2>
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <p className="text-gray-500">سيتم دمج بوابة دفع آمنة (مثل Stripe) هنا في مرحلة لاحقة.</p>
                <div className="mt-4 space-y-4 opacity-50">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 text-left">رقم البطاقة</label>
                    <div className="mt-1 block w-full h-10 bg-gray-200 rounded-md"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 text-left">تاريخ الانتهاء</label>
                      <div className="mt-1 block w-full h-10 bg-gray-200 rounded-md"></div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 text-left">CVC</label>
                      <div className="mt-1 block w-full h-10 bg-gray-200 rounded-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Order Summary */}
        <div className="lg:col-span-1">
          <div className="p-6 bg-white rounded-lg shadow sticky top-8">
            <h2 className="text-xl font-semibold mb-4">ملخص الطلب</h2>
            <div className="space-y-4">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between items-center text-sm">
                  <div>
                    <span className="font-semibold">{item.product.name}</span>
                    <span className="text-gray-500"> (x{item.quantity})</span>
                  </div>
                  <span>{(item.product.price * item.quantity).toFixed(2)} ر.س.</span>
                </div>
              ))}
            </div>
            <div className="border-t my-4"></div>
            <div className="flex justify-between font-bold text-lg">
              <span>المجموع الكلي</span>
              <span>{total.toFixed(2)} ر.س.</span>
            </div>
            <Button className="w-full mt-6" onClick={handlePlaceOrder}>
              تأكيد الطلب
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
