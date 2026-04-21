import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useCart } from '../store/CartContext';
import { useAppState } from '../store/AppStateContext';
import { X, Minus, Plus, Lock, ShieldCheck, Truck, CheckCircle, AlertCircle } from 'lucide-react';

export function CartDrawer() {
  const {
    isCartOpen, setCartOpen, items, updateQuantity, removeItem,
    subtotal, shippingCost, total, isFreeShipping, clearCart
  } = useCart();
  const { navigate } = useAppState();
  const [paypalError, setPaypalError] = useState<string | null>(null);

  const shippingThreshold = 75;
  const remainingForFree = shippingThreshold - subtotal;

  const handlePaymentSuccess = () => {
    clearCart();
    setCartOpen(false);
    navigate('checkout-success');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full h-full md:w-[450px] bg-surface z-50 shadow-[-8px_0_32px_rgba(0,0,0,0.1)] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-surface-container">
              <h2 className="text-xl font-bold tracking-tight text-on-surface">Your Cart</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="w-10 h-10 bg-surface-container-low flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container soft-spring"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 no-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-on-surface-variant">
                  <ShoppingBagEmpty />
                  <p className="mt-4 font-medium">Your cart is currently empty.</p>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="mt-6 text-primary font-bold underline underline-offset-4 hover:opacity-70 soft-spring"
                  >
                    Continue Exploring
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Free shipping progress bar */}
                  {!isFreeShipping && (
                    <div className="bg-tertiary-container/30 rounded-xl p-4">
                      <p className="text-sm font-bold text-on-tertiary-container mb-2">
                        🚚 Add <span className="text-primary">${remainingForFree.toFixed(2)}</span> more for free shipping!
                      </p>
                      <div className="w-full bg-surface-container-high rounded-full h-2">
                        <div
                          className="bg-primary rounded-full h-2 transition-all duration-500 ease-out"
                          style={{ width: `${Math.min((subtotal / shippingThreshold) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {isFreeShipping && (
                    <div className="bg-primary/10 rounded-xl p-4 flex items-center gap-2">
                      <Truck className="w-5 h-5 text-primary shrink-0" />
                      <p className="text-sm font-bold text-primary">
                        🎉 You've unlocked free shipping!
                      </p>
                    </div>
                  )}

                  {items.map((item) => (
                    <article key={item.product.id} className="flex gap-4">
                      <div className="w-24 h-24 rounded-xl overflow-hidden bg-surface-container shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h3 className="font-bold text-on-surface leading-tight text-sm mb-1">{item.product.title}</h3>
                            <p className="text-on-surface-variant text-xs">{item.product.category}</p>
                            {item.selectedVariants && Object.keys(item.selectedVariants).length > 0 && (
                              <p className="text-primary text-xs font-medium mt-0.5">
                                {Object.entries(item.selectedVariants).map(([k, v]) => `${k}: ${v}`).join(' • ')}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-on-surface-variant/50 hover:text-error soft-spring"
                            aria-label={`Remove ${item.product.title}`}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex justify-between items-end">
                          <div className="flex items-center bg-surface-container rounded-full px-1 py-1">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-on-surface hover:bg-surface-container-high rounded-full"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-on-surface hover:bg-surface-container-high rounded-full"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-bold text-sm text-on-surface">
                            ${(item.product.pricing.sellPrice * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-surface-container-lowest border-t border-surface-container-high">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm text-on-surface-variant">
                    <span>Subtotal</span>
                    <span className="font-medium text-on-surface">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-on-surface-variant">
                    <span>Shipping</span>
                    <span className={`font-medium ${isFreeShipping ? 'text-primary' : 'text-on-surface'}`}>
                      {isFreeShipping ? 'Free' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-on-surface pt-3 border-t border-surface-container">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* PayPal Error */}
                {paypalError && (
                  <div className="flex items-center gap-2 bg-error/10 text-error p-3 rounded-xl mb-4">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <p className="text-sm font-medium">{paypalError}</p>
                  </div>
                )}

                {/* PayPal Smart Buttons */}
                <div className="mb-4 rounded-xl overflow-hidden" id="paypal-button-container">
                  <PayPalButtons
                    style={{
                      layout: 'vertical',
                      color: 'gold',
                      shape: 'pill',
                      label: 'pay',
                      height: 50,
                    }}
                    createOrder={async () => {
                      setPaypalError(null);
                      try {
                        const response = await fetch('/api/paypal/create-order', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            items: items.map((item) => ({
                              productId: item.product.id,
                              quantity: item.quantity,
                              variant: item.selectedVariants,
                            })),
                          }),
                        });

                        if (!response.ok) {
                          const data = await response.json().catch(() => ({}));
                          throw new Error(data.error || 'Failed to create order');
                        }

                        const data = await response.json();
                        return data.id; // PayPal Order ID
                      } catch (err: any) {
                        setPaypalError(err.message || 'Could not initiate payment. Please try again.');
                        throw err;
                      }
                    }}
                    onApprove={async (data) => {
                      try {
                        const response = await fetch('/api/paypal/capture-order', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ orderID: data.orderID }),
                        });

                        if (!response.ok) {
                          const errData = await response.json().catch(() => ({}));
                          throw new Error(errData.error || 'Payment capture failed');
                        }

                        const captureData = await response.json();
                        console.log('[PayPal] Payment captured:', captureData);

                        // Success!
                        handlePaymentSuccess();
                      } catch (err: any) {
                        setPaypalError(err.message || 'Payment was approved but capture failed. Please contact support.');
                      }
                    }}
                    onError={(err) => {
                      console.error('[PayPal] Button error:', err);
                      setPaypalError('Payment could not be processed. Please try again.');
                    }}
                    onCancel={() => {
                      // User closed the PayPal popup — do nothing, they can try again
                    }}
                  />
                </div>

                <div className="flex justify-center gap-6 text-on-surface-variant">
                  <div className="flex flex-col items-center gap-1">
                    <Lock className="w-4 h-4" />
                    <span className="text-[9px] uppercase tracking-wider font-bold">Secure</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Truck className="w-4 h-4" />
                    <span className="text-[9px] uppercase tracking-wider font-bold">Fast Ship</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-[9px] uppercase tracking-wider font-bold">30-Day</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ShoppingBagEmpty() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-20">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
