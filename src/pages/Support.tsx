import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Support = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: "",
    orderId: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please login first");
      navigate("/auth");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Please login first");
        navigate("/auth");
        return;
      }

      const { error } = await supabase
        .from("support_tickets")
        .insert({
          user_id: user.id,
          subject: formData.subject,
          order_id: formData.orderId || null,
          message: formData.message,
        });

      if (error) throw error;

      toast.success("Support ticket created!", {
        description: "Our team will respond within 24 hours",
      });
      setFormData({ subject: "", orderId: "", message: "" });
    } catch (error: any) {
      toast.error("Error creating ticket", {
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-3xl">
          {/* Header */}
          <div className="mb-8 text-center space-y-4 animate-fade-in">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold">
              Contact <span className="text-gradient">Support</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Our team is here to help 24/7. Submit a ticket and we'll get back to you soon.
            </p>
          </div>

          {/* Support Form */}
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Select
                value={formData.subject}
                onValueChange={(value) => setFormData({ ...formData, subject: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">Technical Issue</SelectItem>
                  <SelectItem value="billing">Billing Question</SelectItem>
                  <SelectItem value="product">Product Inquiry</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="orderId">Order ID (Optional)</Label>
              <Input
                id="orderId"
                placeholder="ORD-XXXXX"
                value={formData.orderId}
                onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Describe your issue or question..."
                rows={8}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="resize-none"
              />
            </div>

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Ticket"}
            </Button>
          </form>

          {/* Additional Info */}
          <div className="mt-12 p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
            <h2 className="text-xl font-semibold mb-4">Other Ways to Reach Us</h2>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium">Discord:</span>{" "}
                <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Join our community
                </a>
              </div>
              <div>
                <span className="font-medium">Response Time:</span> Usually within 2-6 hours
              </div>
              <div>
                <span className="font-medium">Availability:</span> 24/7 Support
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Support;
