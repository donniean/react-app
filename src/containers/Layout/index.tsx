import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

function Layout({ children }: Props): JSX.Element {
  return <div>{children}</div>;
}

export default Layout;
