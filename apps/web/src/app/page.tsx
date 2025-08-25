import { trpcServer } from '../lib/trpc/server';
import { Button } from '@repo/ui/Button';

export default async function Page(): Promise<JSX.Element> {
  const products = await trpcServer.product.getAll.query();

  return (
    <main className="container mx-auto p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-primary mb-4">متجرنا الإلكتروني</h1>
        <p className="text-xl text-gray-600">اكتشف أحدث صيحات الموضة</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
              {/* Placeholder for product image */}
              <span className="text-gray-500">صورة المنتج</span>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-lg text-primary font-bold mb-4">{product.price.toFixed(2)} ر.س.</p>
              <Button className="w-full">أضف إلى السلة</Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
