import { Button, Center, Title } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

export function NotFound() {
  const { t } = useTranslation('errors');

  return (
    <Center className="h-screen w-screen flex-col gap-y-4">
      <Title>{t('notFound.title')}</Title>
      <Button component={Link} to="/">
        {t('notFound.button.back')}
      </Button>
    </Center>
  );
}
