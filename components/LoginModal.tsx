'use client';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useAuth } from '@/store/useAuth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function LoginModal() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Only show if not logged in and not already on auth pages
    if (!user && pathname !== '/login' && pathname !== '/signup' && pathname !== '/admin') {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1000); // 1 second delay
      return () => clearTimeout(timer);
    }
  }, [user, pathname]);

  if (user) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md w-[90vw] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-heading">Welcome to Medina Beauty! ✨</DialogTitle>
          <DialogDescription className="text-center text-base pt-2">
            Sign in or create an account to start earning loyalty points for free products and exclusive discounts!
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-4">
          <Link href="/login" onClick={() => setOpen(false)}>
            <Button className="w-full h-12 text-lg rounded-xl">Sign In</Button>
          </Link>
          <Link href="/signup" onClick={() => setOpen(false)}>
            <Button variant="outline" className="w-full h-12 text-lg rounded-xl border-primary text-primary">Create an Account</Button>
          </Link>
          <Button variant="ghost" className="mt-2 text-muted-foreground" onClick={() => setOpen(false)}>
            Continue as Guest
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
