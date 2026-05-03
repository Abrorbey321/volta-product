import { memo } from 'react';
import { Star } from 'lucide-react';

const StarRating = memo(({ rating, reviewCount, size = 'sm' }) => {
  // O'lchamga qarab klassni aniqlash
  const starSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5';

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${
              star <= Math.floor(rating)
                ? 'fill-secondary text-secondary'
                : star - 0.5 <= rating
                ? 'fill-secondary/50 text-secondary'
                : 'fill-muted text-muted-foreground/30'
            }`}
          />
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-xs text-muted-foreground">
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  );
});

StarRating.displayName = 'StarRating';

export default StarRating;