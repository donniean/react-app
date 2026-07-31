import { useTranslation } from 'react-i18next';

export function AppLoader() {
  const { t } = useTranslation('common');

  return (
    <output className="relative block h-screen w-screen">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          aria-hidden="true"
          className="border-primary h-10 w-10 animate-spin rounded-full border-4 border-t-transparent"
        />
        <span className="sr-only">{t(($) => $['loading'])}</span>
      </div>
    </output>
  );
}
