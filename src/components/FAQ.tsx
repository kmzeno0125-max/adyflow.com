import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type FaqItem = { question: string; answer: string };

const FAQ = () => {
  const { t } = useTranslation();
  const [openLeft, setOpenLeft] = useState<number | null>(null);
  const [openRight, setOpenRight] = useState<number | null>(null);

  const leftFaqs = t('faq.left', { returnObjects: true }) as FaqItem[];
  const rightFaqs = t('faq.right', { returnObjects: true }) as FaqItem[];

  const renderFaqItem = (
    faq: FaqItem,
    index: number,
    openIndex: number | null,
    setOpenIndex: (i: number | null) => void
  ) => (
    <div
      key={index}
      className="bg-white rounded-xl overflow-hidden border border-slate-200 transition-all duration-300 hover:border-purple-300 hover:shadow-lg"
    >
      <button
        onClick={() => setOpenIndex(openIndex === index ? null : index)}
        className="w-full px-6 py-5 flex items-center justify-between text-left transition-colors hover:bg-slate-50"
      >
        <span className="text-lg font-semibold text-slate-900 pr-8">
          {faq.question}
        </span>
        <ChevronDown
          className={`w-6 h-6 text-purple-600 flex-shrink-0 transition-transform duration-300 ${
            openIndex === index ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          openIndex === index ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-6 pb-5 border-t border-slate-200">
          <div className="text-slate-600 leading-relaxed space-y-2">
            {faq.answer.split('\n').map((line, i) => (
              line.trim() === '' ? <div key={i} className="h-1" /> : <p key={i}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="pt-0 pb-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-xl text-slate-600">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            {leftFaqs.map((faq, index) => renderFaqItem(faq, index, openLeft, setOpenLeft))}
          </div>
          <div className="space-y-4">
            {rightFaqs.map((faq, index) => renderFaqItem(faq, index, openRight, setOpenRight))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
