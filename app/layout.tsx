import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

// Since we have a root layout per locale, we need a root layout at the top level
// to avoid Next.js warnings, but it should be minimal.
export default function RootLayout({ children }: Props) {
    return children;
}
