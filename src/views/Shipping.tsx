export function ShippingView() {
  return (
    <div className="animate-in fade-in duration-500 pt-12 px-6 max-w-4xl mx-auto mb-20 text-on-surface-variant">
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-on-surface mb-6 font-headline">Shipping & Returns</h1>
        <p className="text-lg leading-relaxed max-w-2xl mx-auto md:mx-0">
          We believe in transparency and care, just like you do for your pets. Here is everything you need to know about how our curated products make their way to your home.
        </p>
      </div>

      <section className="bg-surface-container-low rounded-[1.5rem] p-8 md:p-12 mb-8 relative overflow-hidden">
        <h2 className="text-2xl font-bold text-on-surface mb-8 font-headline">Shipping Policy</h2>
        <div className="space-y-8 leading-relaxed">
          <div>
            <h3 className="text-lg font-bold text-on-surface mb-3 font-headline">Processing Time</h3>
            <p>All orders from PetHub are curated and prepared with attention to detail. Orders are processed within 1-2 business days. You will receive a confirmation email with tracking information once your package has left our facility.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-on-surface mb-3 font-headline">Domestic Shipping (US)</h3>
            <ul className="space-y-3 list-disc list-inside">
              <li><strong>Standard (3-5 Business Days):</strong> Complimentary on all orders over $75. For orders under $75, a flat rate of $8 applies.</li>
              <li><strong>Expedited (2 Business Days):</strong> Available for a flat rate of $15.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
