/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { AppStateProvider, useAppState } from './store/AppStateContext';
import { CartProvider, useCart } from './store/CartContext';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { ProductDrawer } from './components/ProductDrawer';
import { CartDrawer } from './components/CartDrawer';
import { MenuDrawer } from './components/MenuDrawer';
import { HomeView } from './views/Home';
import { FAQView } from './views/FAQ';
import { ShippingView } from './views/Shipping';
import { ContactView } from './views/Contact';
import { StoryView } from './views/Story';
import { CheckoutSuccessView } from './views/CheckoutSuccess';
import { CheckoutCancelView } from './views/CheckoutCancel';

// PayPal client ID — loaded from env or defaults to sandbox test ID
// In production, set VITE_PAYPAL_CLIENT_ID in your .env file
const PAYPAL_CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'test';

function Layout() {
  const { currentView, selectedProduct, isMenuOpen } = useAppState();
  const { isCartOpen } = useCart();

  useEffect(() => {
    if (selectedProduct || isCartOpen || isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProduct, isCartOpen, isMenuOpen]);

  return (
    <>
      <TopBar />
      <main className="pt-24 pb-20 md:pb-10 min-h-screen">
        {currentView === 'home' && <HomeView />}
        {currentView === 'faq' && <FAQView />}
        {currentView === 'shipping' && <ShippingView />}
        {currentView === 'contact' && <ContactView />}
        {currentView === 'story' && <StoryView />}
        {currentView === 'checkout-success' && <CheckoutSuccessView />}
        {currentView === 'checkout-cancel' && <CheckoutCancelView />}
      </main>
      <Footer />
      <BottomNav />
      <ProductDrawer />
      <CartDrawer />
      <MenuDrawer />
    </>
  );
}

export default function App() {
  return (
    <PayPalScriptProvider
      options={{
        clientId: PAYPAL_CLIENT_ID,
        currency: 'USD',
        intent: 'capture',
        components: 'buttons',
      }}
    >
      <AppStateProvider>
        <CartProvider>
          <Layout />
        </CartProvider>
      </AppStateProvider>
    </PayPalScriptProvider>
  );
}
