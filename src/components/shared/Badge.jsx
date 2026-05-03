import { memo } from 'react';

// Badge turlariga qarab stillar
const badgeStyles = {
  New: 'bg-primary text-primary-foreground',
  Sale: 'bg-secondary text-secondary-foreground',
  Hot: 'bg-red-500 text-white',
  Limited: 'bg-purple-600 text-white',
};

const ProductBadge = memo(({ badge, className = '' }) => (
  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide ${badgeStyles[badge]} ${className}`}>
    {badge}
  </span>
));

ProductBadge.displayName = 'ProductBadge';

export default ProductBadge;