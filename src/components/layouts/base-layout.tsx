import type { PropsWithChildren } from 'react';

export function BaseLayout({ children }: Readonly<PropsWithChildren>) {
  return <div>{children}</div>;
}
