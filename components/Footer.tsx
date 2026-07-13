import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-card border-t py-12 mt-auto relative z-50">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <Link href="/" className="inline-block mb-4">
            <span className="font-heading font-bold text-2xl text-primary">
              Medina Beauty
            </span>
          </Link>
          <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
            Discover your natural beauty with premium cosmetics and skincare inspired by the Mediterranean. Handcrafted with love in Tunisia.
          </p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/medina_beauty2/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <span className="sr-only">Instagram</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61591538024777" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <span className="sr-only">Facebook</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@medinabeauty1" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <span className="sr-only">TikTok</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-3">
            <li><Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">Shop</Link></li>
            <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">Our Story</Link></li>
            <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
            <li><Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading font-semibold text-lg mb-4">Legal</h3>
          <ul className="space-y-3">
            <li><Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link href="/shipping" className="text-muted-foreground hover:text-primary transition-colors">Shipping Policy</Link></li>
            <li><Link href="/returns" className="text-muted-foreground hover:text-primary transition-colors">Returns</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-12 pt-8 border-t text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Medina Beauty. All rights reserved.</p>
      </div>
    </footer>
  );
}
