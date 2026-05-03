import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import StarRating from '@/components/products/StarRating';
import PriceDisplay from '@/components/products/PriceDisplay';
import ProductBadge from '@/components/shared/Badge';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useCartStore();
  const { toast } = useToast();

  // Barcha mahsulotlarni savatchaga qo'shish
  const handleAddAll = useCallback(() => {
    wishlist.forEach(p => addToCart(p));
    toast({ 
      title: "Added all to cart", 
      description: `${wishlist.length} items added` 
    });
  }, [wishlist, addToCart, toast]);

  // Wishlistdan o'chirish
  const handleRemove = useCallback((productId, name) => {
    const product = wishlist.find(p => p.id === productId);
    if (product) {
      toggleWishlist(product);
      toast({ title: "Removed from wishlist", description: name });
    }
  }, [wishlist, toggleWishlist, toast]);

  // Bittasini savatchaga qo'shish
  const handleAddOne = useCallback((productId) => {
    const product = wishlist.find(p => p.id === productId);
    if (product) {
      addToCart(product);
      toast({ title: "Added to cart", description: product.name });
    }
  }, [wishlist, addToCart, toast]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10" data-testid="wishlist-page">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-foreground">Wishlist</h1>
          {wishlist.length > 0 && (
            <span className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold px-2.5 py-1 rounded-full">
              {wishlist.length} saved
            </span>
          )}
        </div>
        {wishlist.length > 0 && (
          <Button onClick={handleAddAll} className="rounded-xl gap-2" data-testid="button-add-all-to-cart">
            <ShoppingCart className="w-4 h-4" />
            Add all to cart
          </Button>
        )}
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {wishlist.map(product => (
            <div
              key={product.id}
              className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              data-testid={`wishlist-item-${product.id}`}
            >
              <Link to={`/products/${product.id}`} className="block relative overflow-hidden aspect-[4/3] bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {product.badge && (
                  <div className="absolute top-2.5 left-2.5">
                    <ProductBadge badge={product.badge} />
                  </div>
                )}
                <button
                  onClick={e => { e.preventDefault(); handleRemove(product.id, product.name); }}
                  className="absolute top-2.5 right-2.5 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  data-testid={`button-remove-wishlist-${product.id}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </Link>
              <div className="p-4 space-y-2">
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{product.brand}</p>
                  <Link to={`/products/${product.id}`} className="font-semibold text-foreground hover:text-primary transition-colors text-sm line-clamp-2">
                    {product.name}
                  </Link>
                </div>
                <StarRating rating={product.rating} reviewCount={product.reviewCount} />
                <div className="flex items-center justify-between pt-1">
                  <PriceDisplay price={product.price} originalPrice={product.originalPrice} />
                  <button
                    onClick={() => handleAddOne(product.id)}
                    className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-all hover:scale-110"
                    data-testid={`button-cart-wishlist-${product.id}`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-24" data-testid="empty-wishlist-state">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-5">
            <Heart className="w-9 h-9 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground text-sm mb-6">Save items you love and come back to them later.</p>
          <Button asChild className="rounded-xl px-8">
            <Link to="/products" data-testid="link-browse-products">Browse Products</Link>
          </Button>
        </div>
      )}
    </div>
  );
}