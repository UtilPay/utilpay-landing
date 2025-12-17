'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { ChevronDown, Globe } from 'lucide-react';
import { routing, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

const localeLabels: Record<Locale, string> = {
  sr: 'SR',
  en: 'EN',
  hu: 'HU',
  de: 'DE',
  ru: 'RU',
};

const localeFlags: Record<Locale, string> = {
  sr: '🇷🇸',
  en: '🇬🇧',
  hu: '🇭🇺',
  de: '🇩🇪',
  ru: '🇷🇺',
};

export default function LanguageSwitcher() {
  const t = useTranslations('language');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium',
          'text-gray-600 hover:text-black hover:bg-gray-50 transition-colors'
        )}
        aria-label={t('select')}
      >
        <Globe size={16} />
        <span>{localeLabels[locale]}</span>
        <ChevronDown
          size={14}
          className={cn('transition-transform', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-40 bg-white rounded-xl shadow-card-hover border border-gray-100 z-50">
          {routing.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLocaleChange(loc)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-2 text-sm text-left',
                'hover:bg-gray-50 transition-colors',
                loc === locale ? 'text-accent font-medium' : 'text-gray-600'
              )}
            >
              <span>{localeFlags[loc]}</span>
              <span>{t(loc)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
