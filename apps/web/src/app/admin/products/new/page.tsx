'use client';

import { ProductForm } from '../../components/ProductForm';
import { trpc } from '@/lib/trpc/client';
import { useRouter } from 'next/navigation';

export default function NewProductPage() {
  const router = useRouter();
  const createProductMutation = trpc.admin.createProduct.useMutation({
    onSuccess: () => {
      router.push('/admin/products');
      // In a real app, you'd also want to invalidate queries to refetch the product list
    },
    onError: (error) => {
      alert(`Error creating product: ${error.message}`);
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">إضافة منتج جديد</h2>
      <ProductForm
        onSubmit={(data) => createProductMutation.mutate(data)}
        isPending={createProductMutation.isPending}
      />
    </div>
  );
}
