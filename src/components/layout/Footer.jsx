import { Link } from 'react-router-dom';
import { Zap, Twitter, Github, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brend qismi */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-1.5 font-bold text-xl text-foreground">
              <Zap className="w-6 h-6 text-primary fill-primary" />
              <span>Volta</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Next-generation tech, curated for people who demand the best. Free shipping, 2-year warranty, and 30-day returns on everything.
            </p>
            <div className="flex items-center gap-3">
              {[Twitter, Github, Instagram].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Tezkor havolalar */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'All Products' },
                { to: '/products?badge=Sale', label: 'Deals & Offers' },
                { to: '/cart', label: 'My Cart' },
                { to: '/wishlist', label: 'Wishlist' },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Yangiliklarga obuna bo'lish */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Stay in the loop</h3>
            <p className="text-sm text-muted-foreground mb-4">Get the latest deals and new arrivals delivered to your inbox.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors flex-shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Pastki qism (Copyright) */}
        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>2025 Volta. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}