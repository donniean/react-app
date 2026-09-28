import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export function NotFound() {
  const { t } = useTranslation('errors');

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-y-12">
      <h1 className="text-5xl">{t(($) => $['notFound.title'])}</h1>
      <Link
        className="rounded-md bg-primary px-4 py-2 text-white shadow-sm transition-transform duration-150 hover:bg-primary/90 active:scale-98 active:bg-primary/80"
        to="/"
      >
        {t(($) => $['notFound.actions.back'])}
      </Link>
    </div>
  );
}
