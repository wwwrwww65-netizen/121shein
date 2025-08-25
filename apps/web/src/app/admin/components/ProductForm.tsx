'use client';

import { Button } from '@repo/ui/Button';
import { useState, useEffect } from 'react';

type Product = {
  name: string;
  description: string;
  price: number;
  images: string[];
};

interface ProductFormProps {
  initialData?: Product | null;
  onSubmit: (data: Product) => void;
  isPending: boolean;
}

export function ProductForm({
  initialData,
  onSubmit,
  isPending,
}: ProductFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
      setPrice(initialData.price);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, price, images: [] }); // Images are not handled in this basic form
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          اسم المنتج
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          الوصف
        </label>
        <textarea
          id="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          السعر (بالريال السعودي)
        </label>
        <input
          id="price"
          type="number"
          required
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
        />
      </div>
      <div>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'جاري الحفظ...' : 'حفظ المنتج'}
        </Button>
      </div>
    </form>
  );
}
