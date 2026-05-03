import { useCartStore } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Tag, Truck, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

// Narxni formatlash uchun yordamchi funksiya
const fmt = (n) => 
  new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD', 
    minimumFractionDigits: 2 
  }).format(n);

export default function CartSummary() {
  const { totalPrice, clearCart } = useCartStore();
  const { toast } = useToast();
  const [coupon, setCoupon] = useState('');

  // Hisob-kitoblar
  const subtotal = totalPrice();
  const shipping = subtotal >= 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    clearCart();
    toast({ 
      title: "Order placed!", 
      description: "Thank you for your purchase. You'll receive a confirmation email shortly." 
    });
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 space-y-5 sticky top-24">
      <h2 className="font-bold text-lg text-foreground">Order Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium">{fmt(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span className={`font-medium ${shipping === 0 ? 'text-green-500' : ''}`}>
            {shipping === 0 ? 'Free' : fmt(shipping)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax (8%)</span>
          <span className="font-medium">{fmt(tax)}</span>
        </div>
        <div className="border-t border-border pt-3 flex justify-between">
          <span className="font-bold text-foreground">Total</span>
          <span className="font-bold text-foreground text-lg">{fmt(total)}</span>
        </div>
      </div>

      {/* Kupon bo'limi */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <input
            type="text"
            value={coupon}
            onChange={e => setCoupon(e.target.value)}
            placeholder="Coupon code"
            className="w-full bg-background border border-border rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <Button variant="outline" size="sm" className="rounded-xl">Apply</Button>
      </div>

      <Button 
        onClick={handleCheckout} 
        className="w-full rounded-xl h-11 font-semibold" 
        data-testid="button-checkout"
      >
        Checkout
      </Button>

      {/* Kafolatlar */}
      <div className="space-y-2">
        {[
          { icon: Truck, text: "Free shipping over $50" },
          { icon: ShieldCheck, text: "Secure checkout guaranteed" },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}