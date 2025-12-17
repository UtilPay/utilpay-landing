import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['sr', 'en', 'hu', 'de', 'ru'],
  defaultLocale: 'sr',
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];
