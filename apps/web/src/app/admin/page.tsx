import { trpcServer } from '@/lib/trpc/server';

export default async function AdminDashboardPage() {
  // The layout already protects this page, so we can safely assume the user is an admin.
  // However, the trpcServer call will also fail if the user is not an admin,
  // as it doesn't have the necessary context (auth headers) on the server-side.
  // For this to work server-side, we would need to pass the headers from the layout
  // to the page, or re-architect the tRPC client to be context-aware on the server.
  // A simpler approach for this phase is to fetch the data on the client side.
  //
  // Let's pivot to a client-side fetch for this component to demonstrate the protected
  // procedure working with the tRPC provider we already configured.

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">أهلاً بك في لوحة التحكم</h2>
      <p className="mb-8">هذه هي الصفحة الرئيسية لمنطقة المسؤولين.</p>
      <ClientSideStats />
    </div>
  );
}

// We create a client component to fetch the data
'use client';
import { trpc } from '@/lib/trpc/client';

function ClientSideStats() {
  const { data: stats, isLoading, error } = trpc.admin.getStats.useQuery();

  if (isLoading) {
    return <div>جاري تحميل الإحصائيات...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500">
        حدث خطأ: {error.message}
        <p className="text-sm text-gray-600 mt-2">
          (تأكد من أنك قمت بتسجيل الدخول بحساب له صلاحيات المدير).
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">مجموع المستخدمين</h3>
        <p className="text-3xl font-bold text-primary">{stats?.users}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">مجموع المنتجات</h3>
        <p className="text-3xl font-bold text-primary">{stats?.products}</p>
      </div>
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700">مجموع الطلبات</h3>
        <p className="text-3xl font-bold text-primary">{stats?.orders}</p>
      </div>
    </div>
  );
}
