import { useAppState } from '../store/AppStateContext';
import { Product } from '../data/products';
import { ArrowRight, Star } from 'lucide-react';

export function ProductCard({ product }: { product: Product }) {
  const { openProduct } = useAppState();

  return (
    <article
      className="flex flex-col group cursor-pointer soft-spring"
      onClick={() => openProduct(product)}
      id={`product-card-${product.id}`}
    >
      <div className="relative w-full aspect-square rounded-[1.5rem] overflow-hidden bg-white mb-6 border border-surface-container">
        <img
          src={product.images[0]}
          alt={product.title}
          className="object-contain w-full h-full p-4 soft-spring group-hover:scale-105"
          loading="lazy"
          width={400}
          height={400}
        />

        {/* Badges — stacked vertically on top-left, clean layout */}
        {product.badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.badges.slice(0, 1).map((badge) => (
              <span
                key={badge}
                className="bg-on-surface text-surface-container-lowest px-3 py-1 rounded-full text-[0.65rem] font-bold tracking-[0.03em] uppercase shadow-sm whitespace-nowrap"
              >
                {badge}
              </span>
            ))}
          </div>
        )}

        {product.pricing.compareAtPrice && (
          <div className="absolute top-3 right-3">
            <span className="bg-red-600 text-white px-2.5 py-1 rounded-full text-[0.65rem] font-bold tracking-[0.03em] shadow-sm whitespace-nowrap">
              Save ${(product.pricing.compareAtPrice - product.pricing.sellPrice).toFixed(0)}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col px-1">
        <h3 className="text-base font-bold tracking-tight text-on-surface mb-1 font-headline leading-snug">
          {product.title}
        </h3>
        <p className="text-xs text-on-surface-variant mb-2">
          {product.category}
        </p>

        {product.rating && (
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i < Math.round(product.rating!.score) ? 'text-amber-400 fill-amber-400' : 'text-surface-container-high'}`}
                />
              ))}
            </div>
            <span className="text-xs text-on-surface-variant font-medium">
              ({product.rating.count.toLocaleString()})
            </span>
          </div>
        )}

        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-on-surface">${product.pricing.sellPrice.toFixed(2)}</span>
            {product.pricing.compareAtPrice && (
              <span className="text-sm text-on-surface-variant line-through">
                ${product.pricing.compareAtPrice.toFixed(2)}
              </span>
            )}
          </div>
          <ArrowRight className="text-primary w-5 h-5 soft-spring group-hover:translate-x-1" />
        </div>
      </div>
    </article>
  );
}
