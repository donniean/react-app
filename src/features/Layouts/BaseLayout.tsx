import type { ReactNode } from 'react';

interface BaseLayoutProps {
  readonly children: ReactNode;
}

export function BaseLayout({ children }: BaseLayoutProps) {
  return <div>{children}</div>;
}
