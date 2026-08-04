'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle, Clock, Search, Gift } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

interface Order {
  _id: string;
  customerName: string;
  email: string;
  totalPrice: number;
  status: string;
  pointsEarned: number;
  pointsStatus: 'none' | 'pending' | 'approved' | 'rejected';
  createdAt: string;
}


export default function AdminPoints() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success) {
        // Only show orders that have a points reward system attached
        const pointOrders = data.data.filter((o: Order) => o.pointsStatus && o.pointsStatus !== 'none');
        setOrders(pointOrders);
      }
    } catch (error) {
      toast.error('Failed to fetch point requests');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    try {
      const res = await fetch(`/api/orders/${id}/points`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        // Update local state
        setOrders(orders.map(o => o._id === id ? { ...o, pointsStatus: action === 'approve' ? 'approved' : 'rejected' } : o));
      } else {
        toast.error(data.message || 'Error updating points');
      }
    } catch (error) {
      toast.error('Network error');
    }
  };

  const filteredOrders = orders.filter(o => 
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Points Requests</h2>
          <p className="text-muted-foreground mt-1">
            Approve or reject pending point rewards for customer purchases.
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search customers..." 
            className="pl-8" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Point Requests</CardTitle>
          <CardDescription>
            Points are held as "Pending" until you approve the order delivery here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading requests...</div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-16 px-4 bg-muted/20 rounded-xl border-2 border-dashed flex flex-col items-center">
              <Gift className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground">No Pending Requests</h3>
              <p className="text-muted-foreground max-w-md mx-auto mt-2">
                There are no pending point reward requests to review at this time.
              </p>
            </div>
          ) : (
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Customer</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Order Total</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Reward</th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {filteredOrders.map((order) => (
                    <tr key={order._id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <td className="p-4 align-middle">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4 align-middle">
                        <div className="font-medium">{order.customerName}</div>
                        <div className="text-xs text-muted-foreground">{order.email}</div>
                      </td>
                      <td className="p-4 align-middle">
                        ${order.totalPrice.toFixed(2)}
                      </td>
                      <td className="p-4 align-middle">
                        <div className="flex items-center gap-1.5 font-bold text-primary">
                          <Gift className="h-4 w-4" />
                          +{order.pointsEarned} pts
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        {order.pointsStatus === 'pending' && (
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-yellow-100 text-yellow-800 border border-yellow-200">
                            <Clock className="mr-1 h-3 w-3" /> Pending
                          </span>
                        )}
                        {order.pointsStatus === 'approved' && (
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-green-100 text-green-800 border border-green-200">
                            <CheckCircle2 className="mr-1 h-3 w-3" /> Approved
                          </span>
                        )}
                        {order.pointsStatus === 'rejected' && (
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-red-100 text-red-800 border border-red-200">
                            <XCircle className="mr-1 h-3 w-3" /> Rejected
                          </span>
                        )}
                      </td>
                      <td className="p-4 align-middle text-right">
                        {order.pointsStatus === 'pending' ? (
                          <div className="flex justify-end gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-green-600 border-green-200 hover:bg-green-50"
                              onClick={() => handleAction(order._id, 'approve')}
                            >
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => handleAction(order._id, 'reject')}
                            >
                              Reject
                            </Button>
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-xs italic">No actions available</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
