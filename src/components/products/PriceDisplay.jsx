import { memo } from 'react';

// Narxni formatlash uchun yordamchi funksiya
const fmt = (n) => 
  new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD', 
    minimumFractionDigits: 0 
  }).format(n);

const PriceDisplay = memo(({ price, originalPrice, discount, size = 'sm' }) => {
  // O'lchamga qarab CSS klasslarni aniqlash
  const priceClass = size === 'lg' ? 'text-2xl font-bold' : 'text-base font-bold';
  const oldClass = size === 'lg' ? 'text-base' : 'text-sm';

  return (
    <div className="flex items-baseline gap-2 flex-wrap">
      {/* Asosiy narx */}
      <span className={`${priceClass} text-foreground`}>
        {fmt(price)}
      </span>

      {/* Eski narx (agar mavjud bo'lsa) */}
      {originalPrice && (
        <span className={`${oldClass} text-muted-foreground line-through`}>
          {fmt(originalPrice)}
        </span>
      )}

      {/* Chegirma foizi (agar mavjud bo'lsa) */}
      {discount && (
        <span className="text-xs font-semibold text-secondary bg-secondary/10 px-1.5 py-0.5 rounded-full">
          -{discount}%
        </span>
      )}
    </div>
  );
});

PriceDisplay.displayName = 'PriceDisplay';

export default PriceDisplay;