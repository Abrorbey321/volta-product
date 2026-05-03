import { useState, useMemo, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart, Check, Package, Star } from 'lucide-react';
import { mockProducts, mockReviews } from '@/data/mockData';
import { useCartStore } from '@/store/useCartStore';
import StarRating from '@/components/products/StarRating';
import PriceDisplay from '@/components/products/PriceDisplay';
import ProductBadge from '@/components/shared/Badge';
import ProductCard from '@/components/products/ProductCard';
import QuantitySelector from '@/components/cart/QuantitySelector';
import { useToast } from '@/hooks/use-toast';

export default function ProductDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('description'); // 'description' | 'specs' | 'reviews'
  const { addToCart, toggleWishlist, isInWishlist } = useCartStore();
  const { toast } = useToast();

  const product = useMemo(() => mockProducts.find(p => p.id === id), [id]);
  const inWishlist = isInWishlist(id || '');
  const reviews = useMemo(() => mockReviews.filter(r => r.productId === id), [id]);

  const related = useMemo(() =>
    product ? mockProducts.filter(p => p.category === product.category && p.id !== id).slice(0, 4) : [],
    [product, id]
  );

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    addToCart(product, qty);
    toast({ title: "Added to cart", description: `${qty}x ${product.name}` });
  }, [product, qty, addToCart, toast]);

  const handleWishlist = useCallback(() => {
    if (!product) return;
    toggleWishlist(product);
    toast({
      title: inWishlist ? 'Removed from wishlist' : 'Added to wishlist',
      description: product.name,
    });
  }, [product, toggleWishlist, inWishlist, toast]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-2">Product not found</h2>
        <Link to="/products" className="text-primary hover:underline text-sm">Browse all products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-foreground transition-colors">Products</Link>
        <span>/</span>
        <Link to={`/products?category=${product.category}`} className="hover:text-foreground transition-colors">{product.category}</Link>
        <span>/</span>
        <span className="text-foreground truncate max-w-40">{product.name}</span>
      </div>

      {/* Back button */}
      <Link to="/products" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors -mt-8">
        <ArrowLeft className="w-4 h-4" /> Back to products
      </Link>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-3">
          <div className="aspect-square bg-muted rounded-2xl overflow-hidden border border-border">
            <img
              src={product.images[selectedImage] || product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-opacity duration-200"
              loading="lazy"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-primary' : 'border-border hover:border-muted-foreground'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{product.brand}</span>
              {product.badge && <ProductBadge badge={product.badge} />}
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${product.stock > 10 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : product.stock > 0 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-red-100 text-red-700'}`}>
                {product.stock > 10 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-foreground leading-tight">{product.name}</h1>
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
            <PriceDisplay price={product.price} originalPrice={product.originalPrice} discount={product.discount} size="lg" />
          </div>

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Features preview */}
          <div className="space-y-2">
            {product.features.slice(0, 4).map(f => (
              <div key={f} className="flex items-center gap-2 text-sm text-foreground">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>

          {/* Add to cart */}
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <QuantitySelector quantity={qty} max={product.stock} onChange={setQty} />
              <span className="text-sm text-muted-foreground">Max: {product.stock}</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-md active:scale-95"
                data-testid="button-add-to-cart"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
              <button
                onClick={handleWishlist}
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all hover:scale-105 ${
                  inWishlist ? 'border-red-500 text-red-500 bg-red-50 dark:bg-red-900/20' : 'border-border hover:border-muted-foreground'
                }`}
                data-testid="button-wishlist"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex gap-1 border-b border-border mb-8">
          {['description', 'specs', 'reviews'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
                tab === t
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
              data-testid={`tab-${t}`}
            >
              {t === 'reviews' ? `Reviews (${reviews.length})` : t}
            </button>
          ))}
        </div>

        {tab === 'description' && (
          <div className="max-w-2xl space-y-4">
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            <ul className="space-y-3">
              {product.features.map(f => (
                <li key={f} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === 'specs' && (
          <div className="max-w-xl">
            <div className="rounded-2xl border border-border overflow-hidden">
              {Object.entries(product.specs).map(([key, value], i) => (
                <div key={key} className={`flex gap-4 px-5 py-3.5 text-sm ${i % 2 === 0 ? 'bg-card' : 'bg-background'}`}>
                  <span className="font-medium text-muted-foreground w-36 flex-shrink-0">{key}</span>
                  <span className="text-foreground">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'reviews' && (
          <div className="space-y-6 max-w-2xl">
            {reviews.length > 0 ? (
              reviews.map(review => (
                <div key={review.id} className="bg-card border border-border rounded-2xl p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <img src={review.avatar} alt={review.author} className="w-9 h-9 rounded-full bg-muted" />
                    <div>
                      <p className="font-semibold text-sm text-foreground">{review.author}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
<Star 
  key={i} 
  className={`w-3.5 h-3.5 ${i < review.rating ? 'star-rating-active' : 'fill-muted text-muted'}`} 
/>                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground mb-1">{review.title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{review.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{review.helpful} people found this helpful</p>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <Star className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">No reviews yet for this product</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-foreground mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}