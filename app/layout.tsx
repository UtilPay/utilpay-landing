import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// Root layout just passes through - locale layout handles html/body
export default function RootLayout({ children }: Props) {
  return children;
}
