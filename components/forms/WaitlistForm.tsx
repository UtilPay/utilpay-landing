'use client';

import { Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const waitlistSchema = z.object({
  email: z.string().email(),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

interface WaitlistFormProps {
  variant?: 'inline' | 'full';
  onSuccess?: (referralCode: string) => void;
}

function WaitlistFormInner({ variant = 'inline', onSuccess }: WaitlistFormProps) {
  const t = useTranslations('waitlist.form');
  const tHero = useTranslations('hero');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
  });

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Get UTM params and referral code from URL
      const utmSource = searchParams.get('utm_source');
      const utmMedium = searchParams.get('utm_medium');
      const utmCampaign = searchParams.get('utm_campaign');
      const referralCode = searchParams.get('ref');

      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          language_preference: locale,
          referral_code: referralCode,
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: utmCampaign,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error === 'duplicate') {
          setError(t('errors.duplicate'));
        } else {
          setError(t('errors.generic'));
        }
        return;
      }

      reset();
      if (onSuccess) {
        onSuccess(result.referralCode);
      }
    } catch {
      setError(t('errors.generic'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              type="email"
              placeholder={tHero('emailPlaceholder')}
              {...register('email')}
              error={errors.email ? t('errors.email') : undefined}
              className="h-14"
            />
          </div>
          <Button
            type="submit"
            variant="accent"
            size="lg"
            isLoading={isSubmitting}
            className="whitespace-nowrap h-14"
          >
            {isSubmitting ? t('submitting') : tHero('ctaButton')}
          </Button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-500">{error}</p>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
      <div className="space-y-4">
        <Input
          type="email"
          label={t('email')}
          placeholder={tHero('emailPlaceholder')}
          {...register('email')}
          error={errors.email ? t('errors.email') : undefined}
        />
        <Button
          type="submit"
          variant="accent"
          size="lg"
          isLoading={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? t('submitting') : t('submit')}
        </Button>
      </div>
      {error && (
        <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
      )}
    </form>
  );
}

function FormSkeleton({ variant }: { variant?: 'inline' | 'full' }) {
  if (variant === 'inline') {
    return (
      <div className="w-full">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 h-14 bg-gray-100 rounded-xl animate-pulse" />
          <div className="h-14 w-40 bg-accent/50 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="h-12 bg-gray-100 rounded-xl animate-pulse" />
      <div className="h-12 bg-accent/50 rounded-2xl animate-pulse" />
    </div>
  );
}

export default function WaitlistForm({ variant = 'inline', onSuccess }: WaitlistFormProps) {
  return (
    <Suspense fallback={<FormSkeleton variant={variant} />}>
      <WaitlistFormInner variant={variant} onSuccess={onSuccess} />
    </Suspense>
  );
}
