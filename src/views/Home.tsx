import { products, categories } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useAppState } from '../store/AppStateContext';
import { ArrowRight, Truck, RefreshCcw, Star } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';

export function HomeView() {
  const { navigate } = useAppState();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const displayProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="animate-in fade-in duration-500 pb-20">
      {/* Hero Section with Pet Background */}
      <section className="relative rounded-[2rem] mx-4 mb-16 overflow-hidden">
        <div className="relative min-h-[420px] md:min-h-[500px] flex items-center">
          {/* Background image */}
          <img 
            src="/images/hero-dog.jpg" 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
          
          {/* Content */}
          <div className="relative z-10 px-8 py-12 md:px-16 max-w-xl">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-white/90">Trusted by 50,000+ pet parents</span>
            </div>
            <h1 className="text-[2.5rem] md:text-[3.5rem] leading-[1.05] font-extrabold tracking-[-0.02em] text-white max-w-lg font-headline mb-4">
              Everything Your Best Friend Deserves
            </h1>
            <p className="text-base text-white/80 max-w-sm leading-relaxed mb-8">
              Curated, premium goods for the modern pet. Vet-approved, parent-tested — because they're family.
            </p>
            <button 
              onClick={() => {
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              id="shop-bestsellers"
              className="bg-white text-on-surface rounded-full px-8 py-4 font-bold text-base hover:bg-white/90 active:scale-95 soft-spring shadow-lg"
            >
              Shop Best Sellers →
            </button>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-surface-container-low rounded-[1.5rem] py-8 px-4 mx-6 mb-16 shadow-[0_8px_24px_rgba(48,51,49,0.02)]">
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          <Badge icon={Truck} label="Free US Shipping" subtitle="Over $75" />
          <Badge icon={RefreshCcw} label="30-Day Returns" subtitle="No hassle" />
          <Badge icon={ShieldCheckIcon} label="Vet Approved" subtitle="Safe & tested" />
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="px-6 mx-auto max-w-7xl w-full flex flex-col gap-8 mb-20">
        <div className="flex flex-col gap-4">
          <h2 className="text-[2rem] leading-tight font-bold tracking-tight text-on-surface font-headline">
            Curated Essentials
          </h2>
          
          <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm tracking-wide shrink-0 soft-spring shadow-sm",
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

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-10 gap-x-4 md:gap-x-8">
          {displayProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Social Proof with Pet Images */}
      <section className="mx-4 mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 rounded-[1.5rem] overflow-hidden">
          <div className="relative aspect-square">
            <img src="/images/happy-dog.jpg" alt="Happy dog" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="text-2xl font-extrabold text-white font-headline">50K+</span>
              <p className="text-xs text-white/80 font-bold uppercase tracking-wider">Happy Pets</p>
            </div>
          </div>
          <div className="relative aspect-square">
            <img src="/images/cute-cat.jpg" alt="Cute cat" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="text-2xl font-extrabold text-white font-headline">4.7★</span>
              <p className="text-xs text-white/80 font-bold uppercase tracking-wider">Avg Rating</p>
            </div>
          </div>
          <div className="relative aspect-square">
            <img src="/images/dog-walk.jpg" alt="Dog on walk" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="text-2xl font-extrabold text-white font-headline">30 Day</span>
              <p className="text-xs text-white/80 font-bold uppercase tracking-wider">Free Returns</p>
            </div>
          </div>
          <div className="relative aspect-square">
            <img src="/images/dogs-playing.jpg" alt="Dogs playing" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="text-2xl font-extrabold text-white font-headline">100%</span>
              <p className="text-xs text-white/80 font-bold uppercase tracking-wider">Secure</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section with Background */}
      <section className="relative rounded-[2rem] mx-4 mb-20 overflow-hidden">
        <img 
          src="/images/trust-puppy.jpg" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50" />
        <div className="relative z-10 p-8 md:p-16 text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-[2.5rem] font-bold text-white font-headline tracking-tighter">
            The PetHub Difference
          </h2>
          <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
            We believe that the items we bring into our homes should be beautiful, functional, and ethically made. Our curated selection of pet goods reflects a commitment to quality over quantity.
          </p>
          <button 
            onClick={() => navigate('story')}
            className="text-white font-bold hover:opacity-70 transition-opacity inline-flex items-center gap-2 text-lg border border-white/30 rounded-full px-6 py-3">
            Learn Our Story <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}

function Badge({ icon: Icon, label, subtitle }: { icon: any, label: string, subtitle: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Icon className="text-primary w-7 h-7" />
      <span className="text-xs font-bold text-on-surface uppercase tracking-widest">{label}</span>
      <span className="text-[10px] text-on-surface-variant font-medium">{subtitle}</span>
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
