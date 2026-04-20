export function FAQView() {
  return (
    <div className="animate-in fade-in duration-500 pt-12 px-6 max-w-2xl mx-auto mb-20">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-on-surface mb-4 font-headline">Frequently Asked</h2>
        <p className="text-lg text-on-surface-variant leading-relaxed max-w-md mx-auto">
          We're here to help make your experience perfect. Find answers to common questions below.
        </p>
      </div>

      <div className="space-y-6">
        <FAQItem 
          category="Shipping" 
          question="How long does delivery take?" 
          answer="Standard shipping typically takes 3-5 business days. Expedited options are available at checkout for 1-2 day delivery." 
        />
        <FAQItem 
          category="Shipping" 
          question="Do you ship internationally?" 
          answer="Currently, we ship within the US and Canada. We are working on expanding globally soon." 
        />
        <FAQItem 
          category="Returns" 
          question="What is your return policy?" 
          answer="We accept returns within 30 days of purchase for unused items in their original packaging. A small restocking fee may apply." 
        />
        <FAQItem 
          category="Product Care" 
          question="How do I wash the PetHub Bed?" 
          answer="The outer cover is machine washable. Use cold water on a gentle cycle, and tumble dry low or air dry to maintain softness." 
        />
      </div>
    </div>
  );
}

function FAQItem({ category, question, answer }: { category: string, question: string, answer: string }) {
  return (
    <details className="group bg-surface-container-lowest rounded-[1rem] p-6 shadow-[0_8px_24px_rgba(48,51,49,0.02)] transition-all duration-300 open:shadow-[0_8px_24px_rgba(48,51,49,0.06)]">
      <summary className="flex justify-between items-center cursor-pointer font-bold text-lg pr-2 soft-spring select-none">
        <div className="flex flex-col">
           <span className="text-xs text-primary font-bold uppercase tracking-widest mb-1">{category}</span>
           <span>{question}</span>
        </div>
      </summary>
      <div className="pt-4 text-on-surface-variant leading-relaxed">
        {answer}
      </div>
    </details>
  );
}
