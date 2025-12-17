'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import Button from '@/components/ui/Button';
import LanguageSwitcher from './LanguageSwitcher';
import { cn } from '@/lib/utils';

export default function Header() {
  const t = useTranslations('header');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
        isScrolled ? 'bg-white shadow-header' : 'bg-white/80 backdrop-blur-sm'
      )}
    >
      <div className="container-landing">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl md:text-2xl font-display font-bold text-black">
              {t('logo')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-600 hover:text-black transition-colors font-medium"
            >
              {t('menu.features')}
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-gray-600 hover:text-black transition-colors font-medium"
            >
              {t('menu.pricing')}
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-gray-600 hover:text-black transition-colors font-medium"
            >
              {t('menu.faq')}
            </button>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Button
              variant="accent"
              size="sm"
              onClick={() => scrollToSection('hero')}
            >
              {t('joinWaitlist')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-black"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('features')}
                className="text-left text-gray-600 hover:text-black transition-colors font-medium py-2"
              >
                {t('menu.features')}
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-left text-gray-600 hover:text-black transition-colors font-medium py-2"
              >
                {t('menu.pricing')}
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="text-left text-gray-600 hover:text-black transition-colors font-medium py-2"
              >
                {t('menu.faq')}
              </button>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <LanguageSwitcher />
                <Button
                  variant="accent"
                  size="sm"
                  className="flex-1"
                  onClick={() => scrollToSection('hero')}
                >
                  {t('joinWaitlist')}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
