import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, MessageSquare, Key, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Order {
  id: string;
  product_name: string;
  amount: number;
  status: string;
  license_key: string | null;
  created_at: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchOrders();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    } else {
      setUserEmail(session.user.email || "");
    }
  };

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error: any) {
      toast.error("Error loading orders", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 animate-fade-in">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">{userEmail}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="orders" className="animate-fade-in-up">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="orders">
                <Package className="h-4 w-4 mr-2" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="support">
                <MessageSquare className="h-4 w-4 mr-2" />
                Support
              </TabsTrigger>
            </TabsList>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-4 mt-6">
              {loading ? (
                <Card className="border-border">
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">Loading orders...</p>
                  </CardContent>
                </Card>
              ) : orders.length > 0 ? (
                orders.map((order) => (
                  <Card key={order.id} className="border-border">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{order.product_name}</CardTitle>
                          <CardDescription>
                            Order #{order.id.slice(0, 8)}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">
                            ${order.amount}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Status: <span className="text-primary">{order.status}</span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {order.license_key && (
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border">
                          <Key className="h-4 w-4 text-primary" />
                          <code className="text-sm font-mono">{order.license_key}</code>
                        </div>
                      )}
                      <div className="text-sm text-muted-foreground">
                        Purchased: {new Date(order.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => toast.success("Download started")}
                        >
                          Download
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => navigate("/support")}
                        >
                          Support
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="border-border">
                  <CardContent className="py-12 text-center">
                    <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Browse our products to get started
                    </p>
                    <Button asChild>
                      <a href="/products">View Products</a>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Support Tab */}
            <TabsContent value="support" className="mt-6">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                  <CardDescription>
                    Contact our support team for assistance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="hero" className="w-full" asChild>
                    <a href="/support">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Create Support Ticket
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
