'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import WaitlistForm from '@/components/forms/WaitlistForm';

export default function Hero() {
  const t = useTranslations('hero');

  const trustIndicators = [
    { key: 'free', text: t('trustIndicators.free') },
    { key: 'noCard', text: t('trustIndicators.noCard') },
    { key: 'launch', text: t('trustIndicators.launch') },
  ];

  return (
    <section id="hero" className="pt-24 md:pt-32 pb-16 md:pb-24">
      <div className="container-landing">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight"
          >
            <span className="text-black">{t('title')}</span>
            <br />
            <span className="text-accent">{t('titleHighlight')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>

          {/* Time Comparison Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 inline-flex items-center gap-4 md:gap-8 px-6 md:px-8 py-4 bg-gray-50 rounded-2xl"
          >
            <div className="text-center">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                {t('before')}
              </p>
              <p className="text-2xl md:text-3xl font-mono font-medium text-gray-900">
                {t('timeBefore')}
              </p>
            </div>
            <ArrowRight className="text-accent" size={24} />
            <div className="text-center">
              <p className="text-xs text-accent uppercase tracking-wide mb-1">
                {t('after')}
              </p>
              <p className="text-2xl md:text-3xl font-mono font-medium text-accent">
                {t('timeAfter')}
              </p>
            </div>
          </motion.div>

          {/* Waitlist Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 max-w-xl mx-auto"
          >
            <WaitlistForm variant="inline" />
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-4 md:gap-6"
          >
            {trustIndicators.map((indicator) => (
              <div
                key={indicator.key}
                className="flex items-center gap-2 text-sm text-gray-500"
              >
                <Check size={16} className="text-accent" />
                <span>{indicator.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
