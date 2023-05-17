import type { ReactNode } from 'react';

interface BaseLayoutProps {
  children: ReactNode;
}

export function BaseLayout({ children }: BaseLayoutProps) {
  return <div>{children}</div>;
}
