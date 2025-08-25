import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  userId: string;
  role: 'USER' | 'ADMIN';
  iat: number;
  exp: number;
}

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
    <div>
      <header className="bg-primary text-white p-4">
        <h1 className="text-xl font-bold">لوحة تحكم المسؤول</h1>
      </header>
      <main className="p-8">{children}</main>
    </div>
  );
}
