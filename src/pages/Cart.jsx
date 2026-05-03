import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import CartItemRow from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { Button } from '@/components/ui/button';

export default function Cart() {
  // Store'dan ma'lumotlarni olish
  const items = useCartStore(state => state.items);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10" data-testid="cart-page">
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold text-foreground">My Cart</h1>
        {items.length > 0 && (
          <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
            {items.reduce((s, i) => s + i.quantity, 0)} items
          </span>
        )}
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-2xl px-5 divide-y divide-border">
              {items.map(item => (
                <CartItemRow key={item.product.id} item={item} />
              ))}
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-continue-shopping"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue shopping
            </Link>
          </div>
          <div>
            <CartSummary />
          </div>
        </div>
      ) : (
        <div className="text-center py-24" data-testid="empty-cart-state">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-5">
            <ShoppingBag className="w-9 h-9 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Looks like you haven't added anything yet.
          </p>
          <Button asChild className="rounded-xl px-8">
            <Link to="/products" data-testid="link-start-shopping">
              Start Shopping
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}