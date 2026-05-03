import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Laptop, Smartphone, Headphones, Camera, Package, Monitor, 
  ArrowRight, Truck, ShieldCheck, RefreshCw, MessageCircle 
} from 'lucide-react';
import { mockProducts } from '@/data/mockData';
import ProductCard from '@/components/products/ProductCard';

const categoryIcons = {
  Laptops: Laptop,
  Phones: Smartphone,
  Audio: Headphones,
  Cameras: Camera,
  Accessories: Package,
  Monitors: Monitor,
};

const categories = ['Laptops', 'Phones', 'Audio', 'Cameras', 'Accessories', 'Monitors'];

const features = [
  { icon: Truck, title: 'Free Shipping', desc: 'On all orders over $50. No surprises at checkout.' },
  { icon: ShieldCheck, title: '2-Year Warranty', desc: 'Full manufacturer warranty on every product.' },
  { icon: MessageCircle, title: '24/7 Support', desc: 'Real humans available around the clock for you.' },
  { icon: RefreshCw, title: '30-Day Returns', desc: 'Not satisfied? Return it, no questions asked.' },
];

export default function Home() {
  const navigate = useNavigate();

  // Yangi yoki 'Hot' belgisi bor mahsulotlarni ajratib olish
  const featuredProducts = useMemo(() =>
    mockProducts.filter(p => p.isNew || p.badge === 'Hot').slice(0, 8),
    []
  );

  // 'Sale' (Chegirma)dagi mahsulotlar
  const saleProducts = useMemo(() =>
    mockProducts.filter(p => p.badge === 'Sale').slice(0, 4),
    []
  );

  // Kategoriyalar bo'yicha mahsulotlar sonini hisoblash
  const categoryCounts = useMemo(() =>
    categories.map(cat => ({
      name: cat,
      count: mockProducts.filter(p => p.category === cat).length,
    })),
    []
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/5 border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--primary)/0.15),_transparent_60%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32 relative">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              New arrivals just dropped
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground tracking-tight leading-none mb-6">
              Next-Gen Tech,
              <span className="text-primary block">Delivered.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
              Discover the latest laptops, phones, audio, and accessories. Free shipping, 30-day returns, and 2-year warranty on everything.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all hover:shadow-md active:scale-95"
                data-testid="link-shop-now"
              >
                Shop Now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products?badge=Sale"
                className="inline-flex items-center gap-2 bg-secondary/10 text-secondary border border-secondary/30 px-6 py-3 rounded-xl font-semibold hover:bg-secondary/20 transition-all"
                data-testid="link-view-deals"
              >
                View Deals
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categoryCounts.map(({ name, count }) => {
            const Icon = categoryIcons[name];
            return (
              <button
                key={name}
                onClick={() => navigate(`/products?category=${encodeURIComponent(name)}`)}
                className="flex flex-col items-center gap-3 p-5 bg-card border border-border rounded-2xl hover:border-primary/40 hover:bg-primary/5 hover:-translate-y-0.5 transition-all duration-200 group"
                data-testid={`category-card-${name}`}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-foreground">{name}</p>
                  <p className="text-xs text-muted-foreground">{count} items</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Featured Products</h2>
          <Link to="/products" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Sale Banner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-gradient-to-r from-secondary/90 to-orange-400 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-secondary-foreground/80 text-sm font-semibold mb-1 uppercase tracking-wide">Limited time</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Up to 25% off</h2>
            <p className="text-white/80">Sale on our best-selling laptops, phones, and audio gear.</p>
          </div>
          <Link
            to="/products?badge=Sale"
            className="inline-flex items-center gap-2 bg-white text-secondary px-6 py-3 rounded-xl font-bold hover:bg-white/90 transition-all flex-shrink-0 hover:shadow-lg"
            data-testid="link-sale-banner"
          >
            Shop the Sale
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* On Sale Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">On Sale Now</h2>
          <Link to="/products?badge=Sale" className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
            All deals <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {saleProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">Why Choose Volta</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center gap-4 p-6 bg-background rounded-2xl border border-border hover:shadow-sm transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Stay updated</h2>
          <p className="text-muted-foreground mb-6">Get exclusive deals and first access to new products.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-card border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button className="bg-primary text-primary-foreground px-5 py-3 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors flex-shrink-0">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}