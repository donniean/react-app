import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export function BaseLayout({ children }: Props) {
  return <div>{children}</div>;
}
