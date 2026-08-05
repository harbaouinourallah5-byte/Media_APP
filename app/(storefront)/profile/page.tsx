'use client';

import { useAuth } from '@/store/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, Mail, Gift, LogOut, Package, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [pendingPoints, setPendingPoints] = useState(0);

  useEffect(() => {
    setMounted(true);
    if (user) {
      fetchUserOrders();
    }
  }, [user]);

  const fetchUserOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success) {
        // Find orders belonging to this user that have pending points
        const userOrders = data.data.filter((o: any) => o.user === user?.id && o.pointsStatus === 'pending');
        const pending = userOrders.reduce((sum: number, o: any) => sum + (o.pointsEarned || 0), 0);
        setPendingPoints(pending);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  if (!mounted) return null;

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-heading font-bold mb-4">You are not logged in</h1>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Please sign in to view your profile, check your points, and manage your account.
        </p>
        <Button onClick={() => router.push('/')} size="lg">Return to Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-1/3 space-y-6">
            <Card>
              <CardContent className="pt-6 text-center pb-8">
                <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-4">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
                <div className="flex items-center justify-center gap-2 text-muted-foreground mt-1">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
              </CardContent>
            </Card>

            {user.isAdmin && (
              <Button 
                className="w-full justify-start bg-indigo-600 hover:bg-indigo-700 text-white" 
                onClick={() => router.push('/admin')}
              >
                Admin Dashboard
              </Button>
            )}

            <Button 
              variant="destructive" 
              className="w-full justify-start" 
              onClick={() => {
                logout();
                router.push('/');
              }}
            >
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3 space-y-6">
            <h1 className="text-3xl font-heading font-bold tracking-tight">My Account</h1>
            
            {/* Points Card */}
            <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Gift className="h-5 w-5" /> Loyalty Points
                </CardTitle>
                <CardDescription>Earn points by shopping and leaving reviews!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center gap-8">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-foreground">{user.points || 0}</span>
                    <span className="text-lg text-muted-foreground font-medium">Available</span>
                  </div>
                  
                  {pendingPoints > 0 && (
                    <div className="flex items-baseline gap-2 px-4 py-2 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <span className="text-3xl font-bold text-yellow-600">{pendingPoints}</span>
                      <span className="text-sm text-yellow-600 font-medium">Pending Approval</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-6">
                  You can use your available points to redeem free items directly from product pages. Look for the "Redeem for Free" button!
                </p>
              </CardContent>
            </Card>

            {/* Orders placeholder */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" /> Order History
                </CardTitle>
                <CardDescription>Your recent orders made via Instagram.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 border-t">
                <div className="text-center py-12 bg-muted rounded-xl border border-dashed border-border">
                  <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold mb-2">Order History Unavailable</h3>
                  <p>All orders are processed directly through Instagram.</p>
                  <p className="text-sm mt-1">Check your Instagram chat history for past orders.</p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </div>
  );
}
