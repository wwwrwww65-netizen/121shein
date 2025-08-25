import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  userId: string;
  role: 'USER' | 'ADMIN';
  iat: number;
  exp: number;
}

import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    if (decoded.role !== 'ADMIN') {
      redirect('/');
    }
  } catch (error) {
    console.error('Invalid token:', error);
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-8">لوحة التحكم</h1>
        <nav>
          <ul>
            <li className="mb-4">
              <Link href="/admin" className="hover:text-primary">
                الرئيسية
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/admin/products" className="hover:text-primary">
                إدارة المنتجات
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/admin/orders" className="hover:text-primary">
                إدارة الطلبات
              </Link>
            </li>
            {/* Future links for Users, etc. can go here */}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-gray-100">{children}</main>
    </div>
  );
}
