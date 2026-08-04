'use client';

import Link from 'next/link';
import { ShoppingBag, Search, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ThemeToggle } from '@/components/ThemeToggle';
import { usePathname } from 'next/navigation';
import { useCart } from '@/store/useCart';
import { useAuth } from '@/store/useAuth';

import { useState, useEffect } from 'react';

export function Header() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-2 lg:gap-8">
        {/* Left Side: Mobile Menu, Logo, Theme Toggle */}
        <div className="flex items-center gap-4 lg:w-[250px]">
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
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
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-lg font-medium transition-colors hover:text-primary ${
                        pathname === route.href ? 'text-primary' : 'text-foreground/80'
                      }`}
                    >
                      {route.label}
                    </Link>
                  ))}
                  <div className="pt-4">
                    {/* ThemeToggle removed for mobile view to simplify */}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-32 sm:h-12 sm:w-40">
              {/* Light Mode Logo */}
              <img 
                src="/logo-light.jpg" 
                alt="Medina Beauty Logo" 
                className="absolute inset-0 h-full w-full object-cover dark:hidden rounded-lg shadow-sm"
              />
              {/* Dark Mode Logo */}
              <img 
                src="/logo-dark.jpg" 
                alt="Medina Beauty Logo" 
                className="absolute inset-0 h-full w-full object-cover hidden dark:block rounded-lg shadow-sm"
              />
            </div>
            <span className="sr-only">
              Medina Beauty
            </span>
          </Link>
          
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex flex-1 justify-center items-center gap-8">
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

        {/* Right Side: Search, Account, Cart */}
        <div className="flex items-center justify-end gap-2 lg:gap-4 lg:w-[350px]">
          <form className="hidden xl:flex relative items-center" onSubmit={(e) => {
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
              className="h-9 w-32 xl:w-48 bg-muted/50 border-none pr-8 focus-visible:ring-1 transition-all rounded-full" 
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
                        Earn points and redeem them for free products and discounts!
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm">How to earn points:</h4>
                        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                          <li><strong>Sign Up:</strong> 1 Point</li>
                          <li><strong>Make a Purchase:</strong> 1 Point for every 5 DT spent!</li>
                          <li><strong>Follow us on Instagram/TikTok:</strong> 1 Point!</li>
                        </ul>
                      </div>
                      <div className="space-y-2 pt-2 border-t">
                        <h4 className="font-semibold text-sm">How to spend points:</h4>
                        <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                          <li><strong>Free Product:</strong> When you view a product, if you have enough points, a "Redeem for Free" button will appear!</li>
                          <li><strong>The 20% Off Coupon 🎟️:</strong> Redeem 15 points to unlock a secret 20% off discount code!</li>
                        </ul>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              <Link href="/profile" className="hidden md:block">
                <Button variant="outline" className="flex border-primary/20 hover:bg-primary/5">
                  My Account
                </Button>
              </Link>
                <Button variant="ghost" className="font-medium hidden sm:block text-destructive hover:text-destructive hover:bg-destructive/10" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" className="font-medium">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button className="font-medium">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
          
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative ml-2">
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
