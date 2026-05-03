import { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Zap, X, Menu, Sun, Moon } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const navigate = useNavigate();
  
  const totalItems = useCartStore(state => state.totalItems());
  const wishlistCount = useCartStore(state => state.wishlist.length);

  // Mavzu (Dark/Light mode) boshqaruvi
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  // Qidiruv funksiyasi
  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  }, [searchQuery, navigate]);

  const toggleDark = useCallback(() => setDark(d => !d), []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/products?badge=Sale', label: 'Deals' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1.5 font-bold text-xl text-foreground flex-shrink-0 mr-4" data-testid="link-logo">
          <Zap className="w-6 h-6 text-primary fill-primary" />
          <span>Volta</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.label}
              to={link.to}
              className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Qidiruv paneli (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-sm mx-auto">
          <form onSubmit={handleSearch} className="w-full relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-muted border border-transparent rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary/40 focus:bg-background transition-all"
              data-testid="input-search-navbar"
            />
          </form>
        </div>

        <div className="flex-1 md:hidden" />

        {/* O'ng tarafdagi amallar */}
        <div className="flex items-center gap-1">
          {/* Mobil qidiruv tugmasi */}
          <button
            onClick={() => setSearchOpen(s => !s)}
            className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors"
          >
            {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>

          <button onClick={toggleDark} className="p-2 rounded-xl hover:bg-muted transition-colors hidden sm:flex" data-testid="button-theme-toggle">
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <Link to="/wishlist" className="relative p-2 rounded-xl hover:bg-muted transition-colors" data-testid="link-wishlist">
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                {wishlistCount > 9 ? '9+' : wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative p-2 rounded-xl hover:bg-muted transition-colors" data-testid="link-cart">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                {totalItems > 9 ? '9+' : totalItems}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileMenuOpen(m => !m)}
            className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobil qidiruv paneli */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                autoFocus
                className="w-full bg-muted rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </form>
        </div>
      )}

      {/* Mobil menyu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-1 border-t border-border pt-3">
          {navLinks.map(link => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <button 
            onClick={() => { toggleDark(); setMobileMenuOpen(false); }} 
            className="flex items-center gap-2 px-3 py-2.5 w-full rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            {dark ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      )}
    </header>
  );
}