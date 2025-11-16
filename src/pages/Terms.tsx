import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl font-bold">Terms of Service</h1>
            <p className="text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Terms Content */}
          <Accordion type="single" collapsible className="space-y-4 animate-fade-in-up">
            <AccordionItem value="item-1" className="border border-border rounded-lg px-6 bg-card/30">
              <AccordionTrigger className="hover:no-underline">
                <span className="text-lg font-semibold">1. Acceptance of Terms</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p>
                  By accessing and using Zaliant Services, you accept and agree to be bound by the terms 
                  and provisions of this agreement. If you do not agree to these terms, please do not use our services.
                </p>
                <p>
                  We reserve the right to modify these terms at any time. Continued use of the service after 
                  changes constitutes acceptance of the modified terms.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border border-border rounded-lg px-6 bg-card/30">
              <AccordionTrigger className="hover:no-underline">
                <span className="text-lg font-semibold">2. Digital Products & Services</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p>
                  All products offered by Zaliant Services are digital goods delivered electronically. Products are 
                  licensed, not sold, and remain the property of Zaliant Services.
                </p>
                <p>
                  Users are granted a non-exclusive, non-transferable license to use the products according 
                  to their purchased tier and duration.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border border-border rounded-lg px-6 bg-card/30">
              <AccordionTrigger className="hover:no-underline">
                <span className="text-lg font-semibold">3. Refund Policy</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p>
                  Due to the digital nature of our products, all sales are final. Refunds are only provided 
                  in the following circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Product fails to deliver after payment</li>
                  <li>Technical issues preventing product usage (verified by support)</li>
                  <li>Duplicate purchases made in error</li>
                </ul>
                <p>
                  Refund requests must be submitted within 24 hours of purchase through our support system.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border border-border rounded-lg px-6 bg-card/30">
              <AccordionTrigger className="hover:no-underline">
                <span className="text-lg font-semibold">4. User Responsibilities</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p>Users are responsible for:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Maintaining the confidentiality of their account and license keys</li>
                  <li>Using products in accordance with all applicable laws and game terms of service</li>
                  <li>Not sharing, reselling, or distributing products to third parties</li>
                  <li>Keeping payment information current and accurate</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border border-border rounded-lg px-6 bg-card/30">
              <AccordionTrigger className="hover:no-underline">
                <span className="text-lg font-semibold">5. Limitation of Liability</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p>
                  Zaliant Services provides products "as is" without warranties of any kind. We are not liable for:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Account bans or restrictions resulting from product use</li>
                  <li>Game updates that affect product functionality</li>
                  <li>Indirect, incidental, or consequential damages</li>
                  <li>Loss of data, profits, or opportunities</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border border-border rounded-lg px-6 bg-card/30">
              <AccordionTrigger className="hover:no-underline">
                <span className="text-lg font-semibold">6. Privacy & Data Protection</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p>
                  We collect and process personal data in accordance with applicable privacy laws. 
                  User data is encrypted and stored securely.
                </p>
                <p>
                  We do not sell or share user information with third parties except as required by law 
                  or for payment processing.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border border-border rounded-lg px-6 bg-card/30">
              <AccordionTrigger className="hover:no-underline">
                <span className="text-lg font-semibold">7. Termination</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p>
                  We reserve the right to terminate or suspend access to our services immediately, 
                  without prior notice, for violations of these terms including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Unauthorized sharing or reselling of products</li>
                  <li>Fraudulent payment methods or chargebacks</li>
                  <li>Abusive behavior towards staff or community members</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border border-border rounded-lg px-6 bg-card/30">
              <AccordionTrigger className="hover:no-underline">
                <span className="text-lg font-semibold">8. Contact Information</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p>
                  For questions about these Terms of Service, please contact our support team through 
                  the support ticket system or via Discord.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
