import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

export function NotFound() {
  const { t } = useTranslation('errors');

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-y-4">
      <h1 className="text-5xl">{t('notFound.title')}</h1>
      <Link to="/">{t('notFound.actions.back')}</Link>
    </div>
  );
}
