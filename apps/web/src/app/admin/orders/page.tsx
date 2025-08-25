'use client';

import { trpc } from '@/lib/trpc/client';
import { OrderStatus } from '@repo/db';

// Helper to format date and time
const formatDateTime = (date: Date) => {
  return new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

// Helper to translate status
const translateStatus = (status: OrderStatus) => {
  const statusMap: Record<OrderStatus, string> = {
    PENDING: 'قيد الانتظار',
    PROCESSING: 'قيد المعالجة',
    SHIPPED: 'تم الشحن',
    DELIVERED: 'تم التوصيل',
    CANCELED: 'ملغي',
  };
  return statusMap[status];
};

const OrderStatusSelector = ({ orderId, currentStatus }: { orderId: string, currentStatus: OrderStatus }) => {
  const utils = trpc.useUtils();
  const updateStatusMutation = trpc.admin.updateOrderStatus.useMutation({
    onSuccess: () => {
      utils.admin.getAllOrders.invalidate();
    },
    onError: (error) => {
      alert(`Error updating status: ${error.message}`);
    }
  });

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateStatusMutation.mutate({
      orderId,
      status: e.target.value as OrderStatus,
    });
  };

  return (
    <select
      value={currentStatus}
      onChange={handleStatusChange}
      disabled={updateStatusMutation.isPending}
      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
    >
      {Object.values(OrderStatus).map((status) => (
        <option key={status} value={status}>
          {translateStatus(status)}
        </option>
      ))}
    </select>
  );
};

export default function OrdersPage() {
  const { data: orders, isLoading, error } = trpc.admin.getAllOrders.useQuery();

  if (isLoading) {
    return <div>جاري تحميل الطلبات...</div>;
  }

  if (error) {
    return <div className="text-red-500">حدث خطأ: {error.message}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة الطلبات</h2>
      </div>
      <div className="bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">رقم الطلب</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العميل</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">التاريخ</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجمالي</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders?.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500">{order.id.substring(0, 8)}...</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDateTime(order.createdAt)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.total.toFixed(2)} ر.س.</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <OrderStatusSelector orderId={order.id} currentStatus={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
