import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

import { ThemeProvider } from '@/components/ThemeProvider';
import { SidebarProvider } from '@/components/SidebarProvider';

export const metadata: Metadata = {
  title: 'AntiGravity — Sales Monitor',
  description:
    'Premium sales monitoring dashboard for tracking revenue, customers, quotations, orders, and analytics.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <SidebarProvider>
            <div className="app-layout">
              <Sidebar />
              <div className="main-content">
                <Header />
                <main className="page-container">{children}</main>
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
