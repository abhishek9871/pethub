import { ShieldCheck, Heart, Leaf } from 'lucide-react';
import { useAppState } from '../store/AppStateContext';

export function StoryView() {
  const { navigate } = useAppState();

  return (
    <div className="animate-in fade-in duration-500 pt-12 max-w-4xl mx-auto mb-20">
      <div className="mb-16 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-on-surface mb-6 font-headline">
          The PetHub Story
        </h1>
        <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
          We started with a simple belief: pets aren't just animals, they're family. And family deserves the absolute best.
        </p>
      </div>

      <div className="w-full aspect-[21/9] bg-surface-container-low mb-20 overflow-hidden md:rounded-[2rem]">
        <img 
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2669&auto=format&fit=crop" 
          alt="Two dogs running happily"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-12 px-6 mb-20 items-center">
        <div>
          <h2 className="text-3xl font-bold text-on-surface font-headline mb-6">Born from Frustration</h2>
          <div className="space-y-4 text-on-surface-variant text-lg leading-relaxed">
            <p>
              Like many pet parents, we were tired of choosing between aesthetically pleasing home goods and functional pet supplies. The options were either beautiful but impractical, or durable but an eyesore in our living rooms.
            </p>
            <p>
              We founded PetHub to bridge that gap. We curate and meticulously test every single product to ensure it meets a three-pillar standard: <strong>Safety, Functionality, and Design.</strong>
            </p>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-[0_8px_32px_rgba(48,51,49,0.04)] border border-surface-container-low">
          <h3 className="text-xl font-bold font-headline mb-6 flex items-center gap-2">
            <ShieldCheck className="text-primary w-6 h-6" /> Our Promise
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <span className="text-primary font-bold">1.</span>
              <p className="text-on-surface-variant">We never sell anything we wouldn't use for our own pets.</p>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">2.</span>
              <p className="text-on-surface-variant">We source from ethical, highly-vetted manufacturers.</p>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">3.</span>
              <p className="text-on-surface-variant">We prioritize sustainable, non-toxic, pet-safe materials.</p>
            </li>
          </ul>
        </div>
      </div>

      <div className="px-6 mb-20">
        <div className="bg-primary text-on-primary rounded-[2rem] p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h2 className="text-3xl font-bold font-headline mb-6 relative z-10">
            Join the Family
          </h2>
          <p className="text-lg text-primary-container leading-relaxed max-w-xl mx-auto mb-10 relative z-10">
            Discover the difference a thoughtfully designed product makes in your pet's daily life. Let us help you create a true sanctuary for your best friend.
          </p>
          <button 
            onClick={() => navigate('home')}
            className="bg-on-primary text-primary font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-full hover:opacity-90 active:scale-95 transition-all shadow-lg relative z-10"
          >
            Shop the Collection
          </button>
        </div>
      </div>

    </div>
  );
}
