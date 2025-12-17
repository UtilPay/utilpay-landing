'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Copy, Check, Gift } from 'lucide-react';
import WaitlistForm from '@/components/forms/WaitlistForm';

export default function FinalCTA() {
  const t = useTranslations('cta');
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSuccess = (code: string) => {
    setReferralCode(code);
  };

  const copyReferralLink = () => {
    const link = `${window.location.origin}?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 md:py-28 bg-gray-900 text-white">
      <div className="container-landing">
        <div className="max-w-2xl mx-auto text-center">
          {!referralCode ? (
            <>
              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-display font-bold mb-4"
              >
                {t('title')}
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-gray-400 mb-10"
              >
                {t('subtitle')}
              </motion.p>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <WaitlistForm variant="inline" onSuccess={handleSuccess} />
              </motion.div>
            </>
          ) : (
            <>
              {/* Success State */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                  <Check className="text-accent" size={32} />
                </div>

                <h2 className="text-3xl md:text-4xl font-display font-bold">
                  {t('referral.title')}
                </h2>

                {/* Referral Code Box */}
                <div className="bg-gray-800 rounded-2xl p-6 max-w-md mx-auto">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Gift className="text-accent" size={20} />
                    <span className="text-gray-400 text-sm">
                      {t('referral.description')}
                    </span>
                  </div>

                  <div className="bg-gray-900 rounded-xl p-4 flex items-center justify-between">
                    <code className="text-xl font-mono font-bold text-accent">
                      {referralCode}
                    </code>
                    <button
                      onClick={copyReferralLink}
                      className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-dark text-white rounded-lg transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check size={16} />
                          <span className="text-sm">{t('referral.copied')}</span>
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          <span className="text-sm">Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-gray-500 text-sm mt-4">
                    {t('referral.reward')}
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
