import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function BaseLayout({ children }: Props) {
  return <div>{children}</div>;
}
