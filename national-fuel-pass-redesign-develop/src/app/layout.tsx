import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import Header from '@/components/common/Header'; // Header එක Import කරගන්න

export const metadata: Metadata = {
  title: 'National Fuel Pass',
  description: 'National Fuel Pass Redesign Management System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LanguageProvider>
          {/* සියලුම පිටුවල උඩින් Header එක පෙනීමට මෙහි යොදන්න */}
          <Header />
          <main>{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}