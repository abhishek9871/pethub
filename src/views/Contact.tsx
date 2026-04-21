import { useState } from 'react';
import { Send, Mail, Clock, CheckCircle, AlertCircle } from 'lucide-react';

export function ContactView() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    }
  };

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
          {status === 'sent' ? (
            <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-on-surface font-headline">Message Sent!</h3>
              <p className="text-on-surface-variant max-w-sm">
                Thanks for reaching out! We'll get back to you within 24 hours.
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="text-primary font-bold hover:opacity-70 mt-4"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {status === 'error' && (
                <div className="flex items-center gap-2 bg-red-50 text-red-600 p-4 rounded-xl">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p className="text-sm font-medium">{errorMsg}</p>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold tracking-wide uppercase text-on-surface mb-2 pl-4">Your Name *</label>
                <input 
                  type="text" 
                  required
                  value={form.name}
                  onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                  className="w-full bg-surface-container border-transparent rounded-[1.5rem] px-6 py-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30" 
                  placeholder="E.g. Jane Doe" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wide uppercase text-on-surface mb-2 pl-4">Email Address *</label>
                <input 
                  type="email" 
                  required
                  value={form.email}
                  onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full bg-surface-container border-transparent rounded-[1.5rem] px-6 py-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30" 
                  placeholder="hello@example.com" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wide uppercase text-on-surface mb-2 pl-4">Subject</label>
                <input 
                  type="text" 
                  value={form.subject}
                  onChange={(e) => setForm(f => ({ ...f, subject: e.target.value }))}
                  className="w-full bg-surface-container border-transparent rounded-[1.5rem] px-6 py-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30" 
                  placeholder="Order inquiry, product question, etc." 
                />
              </div>
              <div>
                <label className="block text-xs font-bold tracking-wide uppercase text-on-surface mb-2 pl-4">How can we help? *</label>
                <textarea 
                  required
                  value={form.message}
                  onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full bg-surface-container border-transparent rounded-[1.5rem] px-6 py-4 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" 
                  rows={5} 
                  placeholder="Tell us what's on your mind..."
                ></textarea>
              </div>
              <button 
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-dim))] text-on-primary rounded-full py-4 px-8 font-bold tracking-wide soft-spring hover:opacity-90 active:scale-95 flex justify-center items-center gap-2 shadow-[0_8px_24px_rgba(0,107,96,0.2)] disabled:opacity-60"
              >
                {status === 'sending' ? (
                  <>
                    <span className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        <div className="md:col-span-5 flex flex-col gap-8">
          <div className="bg-surface-container-lowest rounded-[1.5rem] p-8 shadow-[0_8px_24px_rgba(48,51,49,0.06)] flex flex-col gap-4 items-start">
            <div className="w-12 h-12 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center mb-2">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-on-surface font-headline">Email Us</h3>
            <p className="text-on-surface-variant text-base">For general inquiries, support, or just to say hello.</p>
            <a href="mailto:support@lovepethub.com" className="text-primary font-bold mt-2 hover:opacity-70 transition-opacity">support@lovepethub.com</a>
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
