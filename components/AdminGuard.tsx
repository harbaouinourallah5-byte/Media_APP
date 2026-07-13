'use client';

import { useAuth } from '@/store/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (!user || !user.isAdmin) {
        router.push('/');
      }
    }
  }, [user, mounted, router]);

  if (!mounted || !user || !user.isAdmin) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
}
