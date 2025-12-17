'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle, FileText, Quote } from 'lucide-react';
import Card from '@/components/ui/Card';

const problemIcons = {
  time: Clock,
  chaos: AlertTriangle,
  manual: FileText,
};

export default function Problem() {
  const t = useTranslations('problem');

  const problems = [
    { key: 'time', icon: problemIcons.time },
    { key: 'chaos', icon: problemIcons.chaos },
    { key: 'manual', icon: problemIcons.manual },
  ];

  return (
    <section className="section-alt">
      <div className="container-landing">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-sm font-medium mb-4"
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

        {/* Problem Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={problem.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-red-50 rounded-xl mb-4">
                    <Icon className="text-red-500" size={24} />
                  </div>
                  <h3 className="text-lg font-display font-semibold mb-2">
                    {t(`cards.${problem.key}.title`)}
                  </h3>
                  <p className="text-2xl font-mono font-medium text-red-500 mb-3">
                    {t(`cards.${problem.key}.stat`)}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {t(`cards.${problem.key}.description`)}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <Card variant="bordered" className="relative">
            <Quote className="absolute top-4 left-4 text-gray-200" size={32} />
            <div className="pl-12">
              <p className="text-lg text-gray-700 italic mb-4">
                &ldquo;{t('testimonial.quote')}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-600">
                    {t('testimonial.author').charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {t('testimonial.author')}
                  </p>
                  <p className="text-sm text-gray-500">
                    {t('testimonial.role')}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
