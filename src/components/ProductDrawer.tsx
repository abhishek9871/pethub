import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAppState } from '../store/AppStateContext';
import { useCart } from '../store/CartContext';
import { X, Check, ShieldCheck, Truck, ChevronDown } from 'lucide-react';

export function ProductDrawer() {
  const { selectedProduct, closeProduct } = useAppState();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (added) {
      const timer = setTimeout(() => setAdded(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [added]);

  const handleAddToCart = () => {
    if (selectedProduct) {
      addItem(selectedProduct, 1);
      setAdded(true);
      // closeProduct(); // optional: close on add
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
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 pb-32 no-scrollbar">
              <div className="w-full aspect-[4/5] bg-surface-container-low">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 md:p-8">
                <span className="text-[0.75rem] font-bold tracking-[0.05em] text-primary uppercase mb-2 block font-label">
                  {selectedProduct.category}
                </span>
                
                <div className="flex justify-between items-start mb-4 gap-4">
                  <h2 className="text-[2rem] leading-tight font-bold text-on-surface font-headline tracking-tight">
                    {selectedProduct.name}
                  </h2>
                  <span className="text-[1.5rem] font-medium text-on-surface font-headline flex-shrink-0">
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                </div>

                <p className="text-lg text-primary font-bold leading-snug mb-6">
                  {selectedProduct.hook}
                </p>

                <p className="text-base text-on-surface-variant font-medium leading-relaxed mb-8">
                  {selectedProduct.description}
                </p>

                <div className="bg-surface-container-low rounded-[1.5rem] p-6 mb-8">
                  <ul className="space-y-4">
                    {selectedProduct.features.map((feature, i) => (
                      <li key={i} className="flex justify-start border-b border-surface-container-high pb-4 last:border-0 last:pb-0">
                        <Check className="text-primary w-5 h-5 mr-3 shrink-0" />
                        <span className="text-on-surface text-sm font-bold">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-3 bg-tertiary-container/30 text-on-tertiary-container p-4 rounded-xl mb-8">
                  <ShieldCheck className="w-6 h-6 shrink-0" />
                  <p className="text-sm font-bold tracking-wide">{selectedProduct.trustLine}</p>
                </div>

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

                <div className="flex items-center gap-2 text-sm text-on-surface-variant font-medium pb-8 border-b border-surface-container mb-8">
                  <Truck className="w-4 h-4 text-primary shrink-0" />
                  <span>{selectedProduct.shippingNote}</span>
                </div>
              </div>
            </div>

            {/* Sticky bottom CTA */}
            <div className="absolute bottom-0 left-0 w-full p-6 bg-surface/90 backdrop-blur-xl border-t border-surface-container shadow-[0_-8px_24px_rgba(48,51,49,0.06)]">
              <button 
                onClick={handleAddToCart}
                disabled={added}
                className="w-full bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-dim))] text-on-primary rounded-full py-4 text-base font-bold font-headline uppercase tracking-wide soft-spring hover:opacity-90 active:scale-95 flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(0,107,96,0.2)]"
              >
                {added ? "Added to Cart" : `${selectedProduct.ctaText} - $${selectedProduct.price.toFixed(2)}`}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
