'use client';

import { ProductForm } from '../../../components/ProductForm';
import { trpc } from '@/lib/trpc/client';
import { useRouter, useParams } from 'next/navigation';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const { data: product, isLoading: isProductLoading } = trpc.product.getById.useQuery(id);

  const updateProductMutation = trpc.admin.updateProduct.useMutation({
    onSuccess: () => {
      router.push('/admin/products');
      // In a real app, you'd also want to invalidate queries
    },
    onError: (error) => {
      alert(`Error updating product: ${error.message}`);
    },
  });

  if (isProductLoading) {
    return <div>جاري تحميل المنتج...</div>;
  }

  if (!product) {
    return <div>لم يتم العثور على المنتج.</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">تعديل المنتج</h2>
      <ProductForm
        initialData={product}
        onSubmit={(data) => updateProductMutation.mutate({ id, ...data })}
        isPending={updateProductMutation.isPending}
      />
    </div>
  );
}
