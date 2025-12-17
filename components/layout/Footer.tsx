'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-landing py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-display font-bold">
              UtilPay
            </Link>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-display font-semibold mb-4">
              {t('links.product.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#features"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {t('links.product.features')}
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {t('links.product.pricing')}
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {t('links.product.faq')}
                </a>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-display font-semibold mb-4">
              {t('links.company.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {t('links.company.about')}
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@utilpay.app"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {t('links.company.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-display font-semibold mb-4">
              {t('links.legal.title')}
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {t('links.legal.privacy')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {t('links.legal.terms')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">{t('copyright')}</p>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </footer>
  );
}
