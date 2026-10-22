import type { Metadata } from 'next';
import Link from 'next/link';
import '@aws-amplify/ui-react/styles.css';
import './globals.css';
import ConfigureAmplify from '@/components/ConfigureAmplify';

export const metadata: Metadata = {
  title: 'Notes',
  description: 'A small notes app secured with Amazon Cognito',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body>
        <ConfigureAmplify />
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/notes">Notes</Link>
          <Link href="/tokens">Tokens</Link>
        </nav>
        <main className="main">{children}</main>
      </body>
    </html>
  );
}