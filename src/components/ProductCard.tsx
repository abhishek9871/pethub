import { useAppState } from '../store/AppStateContext';
import { Product } from '../data/products';
import { cn } from '../lib/utils';
import { Heart, ArrowRight } from 'lucide-react';

export function ProductCard({ product }: { product: Product }) {
  const { openProduct } = useAppState();

  return (
    <article 
      className="flex flex-col group cursor-pointer soft-spring"
      onClick={() => openProduct(product)}
    >
      <div className="relative w-full aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-surface-container-low mb-6">
        <img 
          src={product.thumbnail} 
          alt={product.name}
          className="object-cover w-full h-full soft-spring group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        
        {product.badges.length > 0 && (
          <div className="absolute top-4 left-4">
            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-[0.5rem] text-[0.75rem] font-bold tracking-[0.05em] uppercase shadow-sm">
              {product.badges[0]}
            </span>
          </div>
        )}
        
        <button 
          className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-surface-container-lowest shadow-[0_8px_24px_rgba(48,51,49,0.06)] flex items-center justify-center text-on-surface soft-spring hover:scale-110 active:scale-95"
          onClick={(e) => {
            e.stopPropagation();
            // Optional wishlist functionality here
          }}
        >
          <Heart className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex flex-col px-2">
        <h3 className="text-lg font-bold tracking-tight text-on-surface mb-1 font-headline">
          {product.name}
        </h3>
        <p className="text-sm text-on-surface-variant mb-3 line-clamp-1">
          {product.category}
        </p>
        
        <div className="flex justify-between items-center mt-auto">
          <span className="text-lg font-bold text-on-surface">${product.price.toFixed(2)}</span>
          <ArrowRight className="text-primary w-5 h-5 soft-spring group-hover:translate-x-1" />
        </div>
      </div>
    </article>
  );
}
