import { memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import StarRating from './StarRating';
import PriceDisplay from './PriceDisplay';
import ProductBadge from '@/components/shared/Badge';
import { useToast } from '@/hooks/use-toast';

const ProductCard = memo(({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCartStore();
  const inWishlist = isInWishlist(product.id);
  const { toast } = useToast();

  // Savatga qo'shish funksiyasi
  const handleAddToCart = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({ 
      title: "Added to cart", 
      description: product.name 
    });
  }, [product, addToCart, toast]);

  // Wishlistga qo'shish/o'chirish funksiyasi
  const handleWishlist = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    toast({
      title: inWishlist ? "Removed from wishlist" : "Added to wishlist",
      description: product.name,
    });
  }, [product, toggleWishlist, inWishlist, toast]);

  return (
    <Link
      to={`/products/${product.id}`}
      className="product-card group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
      data-testid={`product-card-${product.id}`}
    >
      {/* Rasm qismi */}
      <div className="relative overflow-hidden aspect-[4/3] bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="product-card-img w-full h-full object-cover"
        />
        {product.badge && (
          <div className="absolute top-2.5 left-2.5">
            <ProductBadge badge={product.badge} />
          </div>
        )}
        <button
          onClick={handleWishlist}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 ${
            inWishlist ? 'text-red-500' : 'text-muted-foreground'
          }`}
          data-testid={`button-wishlist-${product.id}`}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Ma'lumot qismi */}
      <div className="p-4 space-y-2">
        <div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
            {product.brand}
          </p>
          <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors mt-0.5">
            {product.name}
          </h3>
        </div>

        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        <div className="flex items-center justify-between pt-1">
          <PriceDisplay 
            price={product.price} 
            originalPrice={product.originalPrice} 
            discount={product.discount} 
          />
          <button
            onClick={handleAddToCart}
            className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all hover:scale-110 active:scale-95 flex-shrink-0"
            data-testid={`button-add-to-cart-${product.id}`}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;