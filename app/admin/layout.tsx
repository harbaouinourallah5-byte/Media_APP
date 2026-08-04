import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminGuard } from '@/components/AdminGuard';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/admin' },
    { icon: Package, label: 'Products', href: '/admin/products' },
    { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
    { icon: Gift, label: 'Points', href: '/admin/points' },
    { icon: Users, label: 'Customers', href: '/admin/customers' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <AdminGuard>
      <div className="flex h-screen bg-muted/20">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r flex flex-col">
          <div className="h-20 flex items-center px-6 border-b">
            <Link href="/" className="font-heading font-bold text-2xl text-primary">
              Medina Admin
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-6">
            <nav className="space-y-1 px-4">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href}>
                  <span className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
          <div className="p-4 border-t">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive">
              <LogOut className="mr-2 h-5 w-5" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="h-20 bg-card border-b flex items-center justify-between px-8">
            <h2 className="font-semibold text-lg">Dashboard</h2>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                AD
              </div>
            </div>
          </header>
          <div className="flex-1 overflow-auto p-8">
            {children}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
