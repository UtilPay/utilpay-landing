'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function Pricing() {
  const t = useTranslations('pricing');

  const plans = ['free', 'premium', 'business'];

  const scrollToHero = () => {
    const element = document.getElementById('hero');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="section">
      <div className="container-landing">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm font-medium mb-4"
          >
            {t('sectionTitle')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl font-display font-bold"
          >
            {t('title')}
          </motion.h2>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => {
            const isPopular = plan === 'premium';
            const features = t.raw(`plans.${plan}.features`) as string[];

            return (
              <motion.div
                key={plan}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  'relative rounded-2xl p-6 md:p-8',
                  isPopular
                    ? 'bg-black text-white shadow-xl'
                    : 'bg-white border border-gray-200'
                )}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent text-white text-xs font-medium rounded-full">
                    Popular
                  </span>
                )}

                {/* Plan Name */}
                <h3
                  className={cn(
                    'text-lg font-display font-semibold mb-4',
                    isPopular ? 'text-white' : 'text-gray-900'
                  )}
                >
                  {t(`plans.${plan}.name`)}
                </h3>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-mono font-bold">
                    €{t(`plans.${plan}.price`)}
                  </span>
                  <span
                    className={cn(
                      'text-sm',
                      isPopular ? 'text-gray-300' : 'text-gray-500'
                    )}
                  >
                    {t(`plans.${plan}.period`)}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check
                        size={18}
                        className={cn(
                          'flex-shrink-0 mt-0.5',
                          isPopular ? 'text-accent' : 'text-accent'
                        )}
                      />
                      <span
                        className={cn(
                          'text-sm',
                          isPopular ? 'text-gray-300' : 'text-gray-600'
                        )}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant={isPopular ? 'accent' : 'secondary'}
                  className="w-full"
                  onClick={scrollToHero}
                >
                  {t(`plans.${plan}.cta`)}
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Processing Fee Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-500 text-sm mt-8"
        >
          {t('processingFee')}
        </motion.p>
      </div>
    </section>
  );
}
