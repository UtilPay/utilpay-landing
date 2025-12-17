'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  ScanLine,
  Building2,
  TrendingUp,
  Bell,
  Users,
  History,
} from 'lucide-react';
import Card from '@/components/ui/Card';

const featureIcons = {
  aiScan: ScanLine,
  multiProperty: Building2,
  analytics: TrendingUp,
  reminders: Bell,
  groupAccess: Users,
  history: History,
};

export default function Features() {
  const t = useTranslations('features');

  const features = [
    'aiScan',
    'multiProperty',
    'analytics',
    'reminders',
    'groupAccess',
    'history',
  ];

  return (
    <section id="features" className="section-alt">
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

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = featureIcons[feature as keyof typeof featureIcons];
            return (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Icon className="text-gray-700" size={22} />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold mb-1">
                        {t(`items.${feature}.title`)}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {t(`items.${feature}.description`)}
                      </p>
                    </div>
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
