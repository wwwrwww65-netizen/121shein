'use client';

import { trpc } from '@/lib/trpc/client';
import { useParams } from 'next/navigation';

export default function OrderConfirmationPage() {
  const params = useParams();
  const orderId = params.orderId as string;

  const { data: order, isLoading, error } = trpc.checkout.getOrderById.useQuery(orderId);

  if (isLoading) {
    return <div className="text-center p-24">جاري تحميل تفاصيل الطلب...</div>;
  }

  if (error) {
    return <div className="text-center p-24 text-red-500">حدث خطأ: {error.message}</div>;
  }

  if (!order) {
    return <div className="text-center p-24">لم يتم العثور على الطلب.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <h1 className="text-3xl font-bold mt-4 mb-2">شكراً لك على طلبك!</h1>
        <p className="text-gray-600 mb-6">لقد تم استلام طلبك بنجاح. رقم طلبك هو:</p>
        <p className="text-lg font-mono bg-gray-100 p-2 rounded-md inline-block mb-8">{order.id}</p>

        <div className="text-right border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">ملخص الطلب</h2>
          {order.items.map(item => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.product.name} (x{item.quantity})</span>
              <span>{(item.price * item.quantity).toFixed(2)} ر.س.</span>
            </div>
          ))}
          <div className="border-t my-4"></div>
          <div className="flex justify-between font-bold text-lg mb-6">
            <span>المجموع الكلي</span>
            <span>{order.total.toFixed(2)} ر.س.</span>
          </div>

          <h2 className="text-xl font-semibold mb-4">سيتم الشحن إلى</h2>
          <div className="text-gray-700">
            <p>{order.shippingAddress?.street}</p>
            <p>{order.shippingAddress?.city}, {order.shippingAddress?.zip}</p>
            <p>{order.shippingAddress?.country}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
