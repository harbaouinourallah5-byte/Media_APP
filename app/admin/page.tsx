import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Users, MessageSquare, AlertTriangle, TrendingUp } from 'lucide-react';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import User from '@/models/User';

async function getStats() {
  try {
    await dbConnect();
    
    // Total Products
    const productsCount = await Product.countDocuments();
    
    // Total Users
    const usersCount = await User.countDocuments();
    
    // Low Stock Products (< 5 items)
    const lowStockCount = await Product.countDocuments({ stock: { $lt: 5 } });
    
    // Total Reviews across all products
    const products = await Product.find({}, 'numReviews').lean();
    const totalReviews = products.reduce((sum, p) => sum + (p.numReviews || 0), 0);
    
    return {
      products: productsCount || 0,
      users: usersCount || 0,
      reviews: totalReviews || 0,
      lowStock: lowStockCount || 0,
    };
  } catch (error) {
    console.error("Failed to fetch stats", error);
    return { products: 0, users: 0, reviews: 0, lowStock: 0 }; 
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground mt-2">Welcome to your Medina Beauty dashboard.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.users}</div>
            <p className="text-xs text-muted-foreground mt-1">Registered accounts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.products}</div>
            <p className="text-xs text-muted-foreground mt-1">In your catalog</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Customer Reviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.reviews}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all products</p>
          </CardContent>
        </Card>
        <Card className={stats.lowStock > 0 ? "border-red-200 bg-red-50/50" : ""}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Alerts</CardTitle>
            <AlertTriangle className={`h-4 w-4 ${stats.lowStock > 0 ? "text-red-500" : "text-primary"}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${stats.lowStock > 0 ? "text-red-600" : ""}`}>{stats.lowStock}</div>
            <p className="text-xs text-muted-foreground mt-1">Products with &lt; 5 items left</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full xl:col-span-1 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Order Fulfillment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-background rounded-lg border">
                <h3 className="text-lg font-medium text-foreground">Sales are tracked via Instagram</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Since your customers place their final orders by messaging you directly on Instagram, 
                  this dashboard tracks user sign-ups, reviews, and product popularity rather than direct revenue.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
