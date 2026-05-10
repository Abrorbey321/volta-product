import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import QuantitySelector from './QuantitySelector';
import PriceDisplay from '@/components/products/PriceDisplay';

const CartItemRow = memo(({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();

  // Savatdan o'chirish funksiyasi
  const handleRemove = useCallback(() => {
    removeFromCart(item.product.id);
  }, [item.product.id, removeFromCart]);

  // Miqdorni o'zgartirish funksiyasi
  const handleQty = useCallback((q) => {
    updateQuantity(item.product.id, q);
  }, [item.product.id, updateQuantity]);

  return (
    <div className="flex gap-4 py-5 border-b border-border last:border-0" data-testid={`cart-item-${item.product.id}`}>
      {/* Mahsulot rasmi */}
      <Link to={`/products/${item.product.id}`} className="flex-shrink-0">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-20 h-20 object-cover rounded-xl border border-border"
          loading="lazy"
          sizes="80px"
        />
      </Link>

      <div className="flex-1 min-w-0 space-y-2">
        <div>
          <p className="text-xs text-muted-foreground">{item.product.brand}</p>
          <Link 
            to={`/products/${item.product.id}`} 
            className="font-semibold text-foreground hover:text-primary transition-colors text-sm leading-snug"
          >
            {item.product.name}
          </Link>
        </div>

        {/* Narx komponenti */}
        <PriceDisplay price={item.product.price} originalPrice={item.product.originalPrice} />

        <div className="flex items-center justify-between">
          <QuantitySelector 
            quantity={item.quantity} 
            max={item.product.stock} 
            onChange={handleQty} 
          />
          
          <div className="flex items-center gap-3">
            <span className="font-bold text-foreground text-sm">
              {new Intl.NumberFormat('en-US', { 
                style: 'currency', 
                currency: 'USD', 
                minimumFractionDigits: 0 
              }).format(item.product.price * item.quantity)}
            </span>
            
            <button
              onClick={handleRemove}
              className="text-muted-foreground hover:text-destructive transition-colors"
              data-testid={`button-remove-cart-${item.product.id}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

CartItemRow.displayName = 'CartItemRow';

export default CartItemRow;