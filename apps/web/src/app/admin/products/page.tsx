'use client';

import { trpc } from '@/lib/trpc/client';
import { Button } from '@repo/ui/Button';
import Link from 'next/link';

export default function ProductsPage() {
  const utils = trpc.useUtils();
  const { data: products, isLoading, error } = trpc.product.getAll.useQuery();

  const deleteMutation = trpc.admin.deleteProduct.useMutation({
    onSuccess: () => {
      // Refetch the product list after a successful deletion
      utils.product.getAll.invalidate();
    },
    onError: (error) => {
      alert(`Error deleting product: ${error.message}`);
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm('هل أنت متأكد أنك تريد حذف هذا المنتج؟')) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div>جاري تحميل المنتجات...</div>;
  }

  if (error) {
    return <div className="text-red-500">حدث خطأ: {error.message}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">إدارة المنتجات</h2>
        <Link href="/admin/products/new">
          <Button>إضافة منتج جديد</Button>
        </Link>
      </div>
      <div className="bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                الاسم
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                السعر
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products?.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{product.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.price.toFixed(2)} ر.س.</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                  <Link href={`/admin/products/${product.id}/edit`} className="text-primary hover:text-primary/90 ml-4">
                    تعديل
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-800"
                    disabled={deleteMutation.isPending}
                  >
                    {deleteMutation.isPending ? 'جاري الحذف...' : 'حذف'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
