'use client';

import Link from 'next/link';
import { ShoppingBag, Search, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { usePathname } from 'next/navigation';
import { useCart } from '@/store/useCart';
import { useAuth } from '@/store/useAuth';

import { useState, useEffect } from 'react';

export function Header() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const routes = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'Our Story' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-4 lg:hidden">
          <Sheet>
            <SheetTrigger render={<Button variant="ghost" size="icon" />}>
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6 mt-10">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      pathname === route.href ? 'text-primary' : 'text-foreground/80'
                    }`}
                  >
                    {route.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex-1 lg:flex-none flex justify-center lg:justify-start">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading font-bold text-2xl tracking-wide text-primary">
              Medina Beauty
            </span>
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`text-sm uppercase tracking-widest font-medium transition-all hover:text-primary ${
                pathname === route.href ? 'text-primary' : 'text-foreground/70'
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 lg:gap-4">
          <form className="hidden sm:flex relative items-center" onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const query = formData.get('query');
            if (query) {
              window.location.href = `/shop?q=${query}`;
            }
          }}>
            <Input 
              name="query" 
              placeholder="Search..." 
              className="h-9 w-32 lg:w-48 bg-muted/50 border-none pr-8 focus-visible:ring-1 transition-all rounded-full" 
            />
            <Button type="submit" variant="ghost" size="icon" className="absolute right-0 h-9 w-9 rounded-full">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
          {mounted && user?.isAdmin && (
            <Link href="/admin">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">Admin Dashboard</span>
              </Button>
            </Link>
          )}
          <div className="flex items-center gap-2">
            {mounted && user ? (
              <>
                <Dialog>
                  <DialogTrigger render={<button className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-semibold hover:bg-primary/20 transition-colors" />}>
                    💎 {user.points || 0}
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Loyalty Points Rules 💎</DialogTitle>
                      <DialogDescription>
                        Earn points and redeem them for free products!
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">How to earn points:</h4>
                        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                          <li><strong>Sign Up:</strong> 1 Point</li>
                          <li><strong>Make a Purchase:</strong> 1 Point for every 1 DT spent!</li>
                          <li><em>More rules coming soon!</em></li>
                        </ul>
                      </div>
                      <div className="space-y-2 pt-2 border-t">
                        <h4 className="font-semibold text-sm">How to spend points:</h4>
                        <p className="text-sm text-muted-foreground">
                          When you view a product, if you have enough points, a "Redeem for Free" button will appear!
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="ghost" className="font-medium hidden sm:block" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login" className="hidden lg:block">
                <Button variant="ghost" className="font-medium">Sign In</Button>
              </Link>
            )}
          </div>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {mounted && totalItems() > 0 && (
                <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                  {totalItems()}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
