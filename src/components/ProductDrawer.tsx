import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppState } from '../store/AppStateContext';
import { useCart } from '../store/CartContext';
import { X, Check, ShieldCheck, Truck, ChevronDown, Star, Package } from 'lucide-react';

export function ProductDrawer() {
  const { selectedProduct, closeProduct } = useAppState();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  // Reset state when product changes
  useEffect(() => {
    if (selectedProduct) {
      setAdded(false);
      // Initialize variants with first option
      const initial: Record<string, string> = {};
      selectedProduct.variants.forEach((v) => {
        if (v.options.length > 0) initial[v.label] = v.options[0];
      });
      setSelectedVariants(initial);
    }
  }, [selectedProduct]);

  useEffect(() => {
    if (added) {
      const timer = setTimeout(() => setAdded(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [added]);

  const handleAddToCart = () => {
    if (selectedProduct) {
      addItem(selectedProduct, 1, selectedVariants);
      setAdded(true);
    }
  };

  return (
    <AnimatePresence>
      {selectedProduct && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProduct}
            className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-50 lg:hidden"
          />

          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 w-full h-[90vh] bg-surface z-50 rounded-t-[2.5rem] overflow-hidden flex flex-col shadow-[0_-8px_32px_rgba(0,0,0,0.1)] lg:top-0 lg:right-0 lg:left-auto lg:w-[500px] lg:h-full lg:rounded-none lg:shadow-[-8px_0_32px_rgba(0,0,0,0.1)]"
            // For desktop, slide from right instead
            variants={{
              mobile: { y: '100%', x: 0 },
              desktop: { x: '100%', y: 0 }
            }}
          >
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={closeProduct}
                className="w-10 h-10 bg-surface/80 backdrop-blur flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container soft-spring shadow-sm"
                aria-label="Close product drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 pb-32 no-scrollbar">
              {/* Product Image */}
              <div className="w-full aspect-square bg-white border-b border-surface-container">
                <img
                  src={selectedProduct.images[0]}
                  alt={selectedProduct.title}
                  className="w-full h-full object-contain p-6"
                  width={800}
                  height={800}
                />
              </div>

              <div className="p-6 md:p-8">
                {/* Category & Rating */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[0.75rem] font-bold tracking-[0.05em] text-primary uppercase block font-label">
                    {selectedProduct.category}
                  </span>
                  {selectedProduct.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-bold text-on-surface">{selectedProduct.rating.score}</span>
                      <span className="text-xs text-on-surface-variant">
                        ({selectedProduct.rating.count.toLocaleString()} reviews)
                      </span>
                    </div>
                  )}
                </div>

                {/* Title & Price */}
                <div className="flex justify-between items-start mb-4 gap-4">
                  <h2 className="text-[2rem] leading-tight font-bold text-on-surface font-headline tracking-tight">
                    {selectedProduct.title}
                  </h2>
                  <div className="flex flex-col items-end flex-shrink-0">
                    <span className="text-[1.5rem] font-medium text-on-surface font-headline">
                      ${selectedProduct.pricing.sellPrice.toFixed(2)}
                    </span>
                    {selectedProduct.pricing.compareAtPrice && (
                      <span className="text-sm text-on-surface-variant line-through">
                        ${selectedProduct.pricing.compareAtPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Hook */}
                <p className="text-lg text-primary font-bold leading-snug mb-6">
                  {selectedProduct.hook}
                </p>

                {/* Description */}
                <p className="text-base text-on-surface-variant font-medium leading-relaxed mb-8">
                  {selectedProduct.description}
                </p>

                {/* Variant Selectors */}
                {selectedProduct.variants.length > 0 && (
                  <div className="space-y-6 mb-8">
                    {selectedProduct.variants.map((variant) => (
                      <div key={variant.label}>
                        <h4 className="text-sm font-bold text-on-surface mb-3 font-headline">
                          {variant.label}: <span className="text-primary">{selectedVariants[variant.label]}</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {variant.options.map((option) => (
                            <button
                              key={option}
                              onClick={() => setSelectedVariants((prev) => ({ ...prev, [variant.label]: option }))}
                              className={`px-4 py-2 rounded-full text-sm font-medium soft-spring border-2 ${
                                selectedVariants[variant.label] === option
                                  ? 'border-primary bg-primary/10 text-primary font-bold'
                                  : 'border-surface-container-high bg-surface-container-lowest text-on-surface-variant hover:border-primary/30'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Benefits */}
                <div className="bg-surface-container-low rounded-[1.5rem] p-6 mb-8">
                  <h3 className="text-sm font-bold text-on-surface uppercase tracking-wider mb-4 font-headline">Why You'll Love It</h3>
                  <ul className="space-y-4">
                    {selectedProduct.benefits.map((benefit, i) => (
                      <li key={i} className="flex justify-start border-b border-surface-container-high pb-4 last:border-0 last:pb-0">
                        <Check className="text-primary w-5 h-5 mr-3 shrink-0" />
                        <span className="text-on-surface text-sm font-bold">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Trust Line */}
                <div className="flex items-center gap-3 bg-tertiary-container/30 text-on-tertiary-container p-4 rounded-xl mb-8">
                  <ShieldCheck className="w-6 h-6 shrink-0" />
                  <p className="text-sm font-bold tracking-wide">{selectedProduct.trustLine}</p>
                </div>

                {/* FAQ */}
                <div className="space-y-4 mb-8">
                  <h3 className="text-lg font-bold text-on-surface font-headline mb-4">Frequently Asked Questions</h3>
                  {selectedProduct.faq.map((item, i) => (
                    <details key={i} className="group border border-surface-container-high rounded-xl p-4 soft-spring">
                      <summary className="font-bold text-sm cursor-pointer list-none flex justify-between items-center text-on-surface [&::-webkit-details-marker]:hidden">
                        {item.question}
                        <ChevronDown className="w-4 h-4 text-on-surface-variant group-open:rotate-180 transition-transform duration-300" />
                      </summary>
                      <p className="pt-3 text-sm text-on-surface-variant leading-relaxed">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>

                {/* Shipping */}
                <div className="flex items-center gap-3 text-sm text-on-surface-variant font-medium pb-4 border-b border-surface-container mb-4">
                  <Truck className="w-5 h-5 text-primary shrink-0" />
                  <span>{selectedProduct.shippingNote}</span>
                </div>

                {/* Returns */}
                <div className="flex items-center gap-3 text-sm text-on-surface-variant font-medium pb-8">
                  <Package className="w-5 h-5 text-primary shrink-0" />
                  <span>30-day hassle-free returns • No questions asked</span>
                </div>
              </div>
            </div>

            {/* Sticky bottom CTA */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-surface/90 backdrop-blur-xl border-t border-surface-container shadow-[0_-8px_24px_rgba(48,51,49,0.06)]">
              <button 
                onClick={handleAddToCart}
                disabled={added}
                id={`add-to-cart-${selectedProduct.id}`}
                className="w-full bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-dim))] text-on-primary rounded-full py-4 text-base font-bold font-headline uppercase tracking-wide soft-spring hover:opacity-90 active:scale-95 flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(0,107,96,0.2)] disabled:opacity-70"
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart!
                  </>
                ) : (
                  `${selectedProduct.ctaText} — $${selectedProduct.pricing.sellPrice.toFixed(2)}`
                )}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
