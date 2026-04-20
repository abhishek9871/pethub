import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useAppState } from '../store/AppStateContext';
import { ArrowRight, Truck, RefreshCcw, Verify, ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';

export function HomeView() {
  const { navigate } = useAppState();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const categories = ['All', 'Nutrition', 'Wellness', 'Accessories', 'Apparel'];
  const displayProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center space-y-8 mt-12 mb-20 px-6">
        <h1 className="text-[3.5rem] leading-[1.1] font-extrabold tracking-[-0.02em] text-on-surface max-w-2xl font-headline">
          Everything Your Best Friend Deserves
        </h1>
        <p className="text-base text-on-surface-variant max-w-md leading-relaxed">
          Curated, premium goods for the modern pet. Because they're more than just animals; they're family.
        </p>
        <button 
          onClick={() => {
            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-dim))] text-on-primary rounded-full px-8 py-4 font-bold text-lg hover:opacity-90 active:scale-95 soft-spring shadow-[0_8px_24px_rgba(48,51,49,0.06)]"
        >
          Shop Best Sellers
        </button>
      </section>

      {/* Trust Badges */}
      <section className="bg-surface-container-low rounded-[1.5rem] py-8 px-4 mx-6 mb-20 shadow-[0_8px_24px_rgba(48,51,49,0.02)]">
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          <Badge icon={Truck} label="Free US Shipping" />
          <Badge icon={RefreshCcw} label="30-Day Returns" />
          <Badge icon={ShieldCheckIcon} label="Premium Quality" />
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="px-6 mx-auto max-w-7xl w-full flex flex-col gap-8 mb-24">
        <div className="flex flex-col gap-4">
          <h2 className="text-[2rem] leading-tight font-bold tracking-tight text-on-surface font-headline">
            Curated Essentials
          </h2>
          
          <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm tracking-wide shrink-0 soft-spring shadow-sm",
                  activeCategory === cat 
                    ? "bg-on-surface text-surface-container-lowest shadow-[0_8px_24px_rgba(48,51,49,0.06)]" 
                    : "bg-surface-container-lowest text-on-surface hover:bg-surface-container-high"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-8">
          {displayProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="bg-surface-container-low rounded-[2rem] p-8 md:p-16 mx-6 mb-20 text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-[2.5rem] font-bold text-on-surface font-headline tracking-tighter mb-6">
            The PetHub Difference
          </h2>
          <p className="text-lg text-on-surface-variant leading-relaxed max-w-2xl mx-auto mb-8">
            We believe that the items we bring into our homes should be beautiful, functional, and ethically made. Our curated selection of pet goods reflects a commitment to quality over quantity, ensuring your best friend enjoys only the finest.
          </p>
          <button 
            onClick={() => navigate('story')}
            className="text-primary font-bold hover:opacity-70 transition-opacity inline-flex items-center gap-2 text-lg">
            Learn Our Story <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}

function Badge({ icon: Icon, label }: { icon: any, label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <Icon className="text-primary w-8 h-8" />
      <span className="text-xs font-bold text-on-surface uppercase tracking-widest">{label}</span>
    </div>
  );
}

function ShieldCheckIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
