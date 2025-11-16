import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Are your cheats undetected?",
    answer: "Yes, our cheats use advanced protection methods and are regularly updated to ensure they remain undetected. We prioritize security and constantly monitor for any detection risks.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept payment methods including Visa, Mastercard and cryptocurrency payments (Bitcoin, Ethereum, Litecoin) in website and PayPal payments on discord.gg/zaliant.",
  },
  {
    question: "Do you offer refunds?",
    answer: "Due to the nature of digital products, we generally do not offer refunds. However, if you experience technical issues that we cannot resolve, please contact our support team to discuss your situation.",
  },
  {
    question: "How quickly will I receive my product?",
    answer: "All products are delivered instantly after purchase. You will receive an email with download links and instructions within minutes of completing your order.",
  },
  {
    question: "Is customer support available?",
    answer: "Yes! We offer 24/7 customer support. You can reach us through our Discord server ticket. Our team is always ready to help with any questions or issues.",
  },
  {
    question: "Can I use the cheat on multiple PCs?",
    answer: "Licenses are bound to a single PC. If youn want to use on another pc you need to purchase another license key.",
  },
];

export const FAQ = () => {
  return (
    <section className="relative py-16 md:py-20 bg-background/50">
      <div className="container">
        <div className="text-center mb-12">
          <div className="text-sm font-semibold text-primary mb-2">SUPPORT</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our products and services
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg bg-card px-6"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
