import { memo, useCallback } from 'react';
import { Minus, Plus } from 'lucide-react';

const QuantitySelector = memo(({ quantity, min = 1, max = 99, onChange }) => {
  // Miqdorni kamaytirish
  const dec = useCallback(() => {
    onChange(Math.max(min, quantity - 1));
  }, [quantity, min, onChange]);

  // Miqdorni oshirish
  const inc = useCallback(() => {
    onChange(Math.min(max, quantity + 1));
  }, [quantity, max, onChange]);

  return (
    <div className="flex items-center border border-border rounded-xl overflow-hidden">
      <button
        onClick={dec}
        disabled={quantity <= min}
        className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        data-testid="button-qty-dec"
      >
        <Minus className="w-3.5 h-3.5" />
      </button>
      
      <span className="w-10 text-center text-sm font-semibold select-none">
        {quantity}
      </span>
      
      <button
        onClick={inc}
        disabled={quantity >= max}
        className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        data-testid="button-qty-inc"
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
});

QuantitySelector.displayName = 'QuantitySelector';

export default QuantitySelector;