import { CreditCard, Wallet, Smartphone, Bitcoin, Coins, DollarSign } from "lucide-react";
import { LucideIcon } from "lucide-react";

const paymentMethods: { name: string; Icon: LucideIcon }[] = [
  { name: "Credit Card", Icon: CreditCard },
  { name: "Crypto", Icon: Bitcoin },
];

export const PaymentMethods = () => {
  return (
    <section className="relative py-16 md:py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Accepted Payment Methods</h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {paymentMethods.map((method, index) => {
            const Icon = method.Icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-muted/50 border border-border">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground">{method.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
