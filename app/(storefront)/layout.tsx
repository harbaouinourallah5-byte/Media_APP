import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function StorefrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 relative flex flex-col">
        {children}
      </main>
      <Footer />
    </div>
  );
}
