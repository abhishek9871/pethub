import { Send, Mail, Clock } from 'lucide-react';

export function ContactView() {
  return (
    <div className="animate-in fade-in duration-500 pt-12 px-6 max-w-4xl mx-auto mb-20">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-[3.5rem] leading-tight tracking-[-0.02em] font-extrabold text-on-surface mb-4 font-headline">Get in touch</h1>
        <p className="text-lg text-on-surface-variant max-w-xl mx-auto md:mx-0">
          We'd love to hear from you. Drop us a message, and we'll get back to you as soon as we can.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24">
        <div className="md:col-span-7 bg-surface-container-low rounded-[1.5rem] p-8 lg:p-12 soft-spring">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-bold tracking-wide uppercase text-on-surface mb-2 pl-4">Your Name</label>
              <input type="text" className="w-full bg-surface-container border-transparent rounded-[1.5rem] px-6 py-4 text-on-surface focus:outline-none" placeholder="E.g. Jane Doe" />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-wide uppercase text-on-surface mb-2 pl-4">Email Address</label>
              <input type="email" className="w-full bg-surface-container border-transparent rounded-[1.5rem] px-6 py-4 text-on-surface focus:outline-none" placeholder="hello@example.com" />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-wide uppercase text-on-surface mb-2 pl-4">How can we help?</label>
              <textarea className="w-full bg-surface-container border-transparent rounded-[1.5rem] px-6 py-4 text-on-surface focus:outline-none resize-none" rows={5} placeholder="Tell us what's on your mind..."></textarea>
            </div>
            <button className="w-full bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-dim))] text-on-primary rounded-full py-4 px-8 font-bold tracking-wide soft-spring hover:opacity-90 active:scale-95 flex justify-center items-center gap-2 shadow-[0_8px_24px_rgba(0,107,96,0.2)]">
              <span>Send Message</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="md:col-span-5 flex flex-col gap-8">
          <div className="bg-surface-container-lowest rounded-[1.5rem] p-8 shadow-[0_8px_24px_rgba(48,51,49,0.06)] flex flex-col gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center mb-2">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-on-surface font-headline">Email Us</h3>
            <p className="text-on-surface-variant text-base">For general inquiries, support, or just to say hello.</p>
            <a href="mailto:hello@pethub.com" className="text-primary font-bold mt-2 hover:opacity-70 transition-opacity">hello@pethub.com</a>
          </div>
          
           <div className="bg-surface-container-lowest rounded-[1.5rem] p-8 shadow-[0_8px_24px_rgba(48,51,49,0.06)] flex flex-col gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-2">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-on-surface font-headline">Support Hours</h3>
            <p className="text-on-surface-variant text-base">We're here to help during these times.</p>
            <div className="mt-2 space-y-1">
              <p className="text-on-surface font-medium">Monday - Friday</p>
              <p className="text-on-surface-variant">9:00 AM - 6:00 PM (EST)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
