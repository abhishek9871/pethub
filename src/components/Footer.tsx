import { useAppState } from '../store/AppStateContext';

export function Footer() {
  const { navigate } = useAppState();

  return (
    <footer className="w-full rounded-t-[3rem] mt-16 bg-surface-container-low flex flex-col items-center text-center px-10 py-16 gap-8 pb-32 md:pb-16 text-primary">
      <div className="text-xl font-bold text-on-surface mb-6 font-headline tracking-tighter">
        PetHub
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 w-full justify-center text-xs tracking-widest uppercase text-on-surface-variant font-bold">
        <button onClick={() => navigate('story')} className="hover:text-primary transition-colors soft-spring">Our Story</button>
        <button onClick={() => navigate('shipping')} className="hover:text-primary transition-colors soft-spring">Shipping</button>
        <button onClick={() => navigate('faq')} className="hover:text-primary transition-colors soft-spring">FAQ</button>
        <button onClick={() => navigate('contact')} className="hover:text-primary transition-colors soft-spring">Contact</button>
      </div>
      
      <div className="mt-8 text-on-surface-variant/40 font-medium text-xs tracking-widest">
        © {new Date().getFullYear()} PetHub. All rights reserved.
      </div>
    </footer>
  );
}
