import { useState, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { mockProducts } from '@/data/mockData';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';

const ALL_CATEGORIES = ['Laptops', 'Phones', 'Audio', 'Cameras', 'Accessories', 'Monitors'];
const ALL_BADGES = ['New', 'Sale', 'Hot', 'Limited'];
const ALL_BRANDS = [...new Set(mockProducts.map(p => p.brand))].sort();
const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
];
const PAGE_SIZE = 12;

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  const q = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || '';
  const badgeParam = searchParams.get('badge') || '';
  
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedCategories, setSelectedCategories] = useState(
    categoryParam ? [categoryParam] : []
  );
  const [selectedBadges, setSelectedBadges] = useState(
    badgeParam ? [badgeParam] : []
  );
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [minRating, setMinRating] = useState(0);
  const [search, setSearch] = useState(q);

  const toggleCategory = useCallback((cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
    setPage(1);
  }, []);

  const toggleBadge = useCallback((badge) => {
    setSelectedBadges(prev =>
      prev.includes(badge) ? prev.filter(b => b !== badge) : [...prev, badge]
    );
    setPage(1);
  }, []);

  const toggleBrand = useCallback((brand) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
    setPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedBadges([]);
    setSelectedBrands([]);
    setMinPrice(0);
    setMaxPrice(3000);
    setMinRating(0);
    setSearch('');
    setSearchParams({});
    setPage(1);
  }, [setSearchParams]);

  const filtered = useMemo(() => {
    let result = [...mockProducts];

    const searchTerm = (search || q).toLowerCase().trim();
    if (searchTerm) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.brand.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
      );
    }
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }
    if (selectedBadges.length > 0) {
      result = result.filter(p => p.badge && selectedBadges.includes(p.badge));
    }
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }
    result = result.filter(p => p.price >= minPrice && p.price <= maxPrice);
    if (minRating > 0) {
      result = result.filter(p => p.rating >= minRating);
    }

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      default: break;
    }

    return result;
  }, [search, q, selectedCategories, selectedBadges, selectedBrands, minPrice, maxPrice, minRating, sortBy]);

  const visibleProducts = useMemo(() => filtered.slice(0, page * PAGE_SIZE), [filtered, page]);
  const hasMore = visibleProducts.length < filtered.length;
  const hasActiveFilters = selectedCategories.length > 0 || selectedBadges.length > 0 || selectedBrands.length > 0 || minPrice > 0 || maxPrice < 3000 || minRating > 0 || search;

  const FilterPanel = (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h3 className="font-semibold text-sm text-foreground mb-3">Category</h3>
        <div className="space-y-2">
          {ALL_CATEGORIES.map(cat => (
            <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-semibold text-sm text-foreground mb-3">Price Range</h3>
        <div className="flex gap-2 items-center">
          <input type="number" value={minPrice} min={0} max={maxPrice} onChange={e => { setMinPrice(Number(e.target.value)); setPage(1); }}
            className="w-full bg-background border border-border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Min" />
          <span className="text-muted-foreground text-sm">–</span>
          <input type="number" value={maxPrice} min={minPrice} max={9999} onChange={e => { setMaxPrice(Number(e.target.value)); setPage(1); }}
            className="w-full bg-background border border-border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Max" />
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-semibold text-sm text-foreground mb-3">Min Rating</h3>
        <div className="space-y-1.5">
          {[4, 3, 2].map(r => (
            <label key={r} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="radio" name="rating" checked={minRating === r} onChange={() => { setMinRating(r); setPage(1); }} className="accent-primary" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{r}+ stars</span>
            </label>
          ))}
          <label className="flex items-center gap-2.5 cursor-pointer group">
            <input type="radio" name="rating" checked={minRating === 0} onChange={() => { setMinRating(0); setPage(1); }} className="accent-primary" />
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">All ratings</span>
          </label>
        </div>
      </div>

      {/* Badge */}
      <div>
        <h3 className="font-semibold text-sm text-foreground mb-3">Badge</h3>
        <div className="space-y-2">
          {ALL_BADGES.map(badge => (
            <label key={badge} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="checkbox" checked={selectedBadges.includes(badge)} onChange={() => toggleBadge(badge)} className="w-4 h-4 rounded accent-primary" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{badge}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold text-sm text-foreground mb-3">Brand</h3>
        <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
          {ALL_BRANDS.map(brand => (
            <label key={brand} className="flex items-center gap-2.5 cursor-pointer group">
              <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} className="w-4 h-4 rounded accent-primary" />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button onClick={clearFilters} className="flex items-center gap-1.5 text-sm text-destructive hover:text-destructive/80 transition-colors font-medium">
          <X className="w-3.5 h-3.5" /> Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {selectedCategories.length === 1 ? selectedCategories[0] : 'All Products'}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">{filtered.length} products</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <input
            type="search"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search..."
            className="flex-1 sm:flex-none sm:w-48 bg-muted border border-transparent rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/40 focus:bg-background transition-all"
            data-testid="input-search-products"
          />
          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="appearance-none bg-muted border border-transparent rounded-xl px-3 pr-8 py-2 text-sm focus:outline-none focus:border-primary/40 cursor-pointer"
              data-testid="select-sort"
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          </div>
          {/* Mobile filter toggle */}
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden rounded-xl gap-1.5"
            onClick={() => setShowFilters(f => !f)}
            data-testid="button-filter-toggle"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters {hasActiveFilters && '•'}
          </Button>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="bg-card border border-border rounded-2xl p-5 sticky top-24">
            {FilterPanel}
          </div>
        </aside>

        {/* Mobile filter panel */}
        {showFilters && (
          <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => setShowFilters(false)}>
            <div className="absolute right-0 top-0 h-full w-80 bg-background border-l border-border p-6 overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-foreground">Filters</h2>
                <button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
              </div>
              {FilterPanel}
            </div>
          </div>
        )}

        {/* Products grid */}
        <div className="flex-1 min-w-0">
          {visibleProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {visibleProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {hasMore && (
                <div className="flex justify-center mt-10">
                  <Button variant="outline" onClick={() => setPage(p => p + 1)} className="rounded-xl px-8" data-testid="button-load-more">
                    Load more products
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20" data-testid="no-results-state">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <SlidersHorizontal className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">No products found</h3>
              <p className="text-sm text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
              <Button variant="outline" onClick={clearFilters} className="rounded-xl">Clear all filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}