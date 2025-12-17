'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Camera, CreditCard, BarChart3 } from 'lucide-react';
import Card from '@/components/ui/Card';

const solutionIcons = {
  providers: Camera,
  payment: CreditCard,
  analytics: BarChart3,
};

export default function Solution() {
  const t = useTranslations('solution');

  const solutions = [
    { key: 'providers', icon: solutionIcons.providers, step: 1 },
    { key: 'payment', icon: solutionIcons.payment, step: 2 },
    { key: 'analytics', icon: solutionIcons.analytics, step: 3 },
  ];

  return (
    <section className="section">
      <div className="container-landing">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4"
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

        {/* Solution Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <motion.div
                key={solution.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full relative">
                  {/* Step Number */}
                  <span className="absolute -top-3 -left-3 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    {solution.step}
                  </span>

                  <div className="pt-2">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 rounded-2xl mb-4">
                      <Icon className="text-accent" size={28} />
                    </div>
                    <h3 className="text-xl font-display font-semibold mb-3">
                      {t(`cards.${solution.key}.title`)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {t(`cards.${solution.key}.description`)}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
