'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  FileText,
  CalendarCheck,
  BarChart3,
  ClipboardList,
  Sparkles,
} from 'lucide-react';

import { useSidebar } from '@/components/SidebarProvider';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/customer', label: 'Customer', icon: Users },
  { href: '/quotation', label: 'Quotation', icon: FileText },
  { href: '/order', label: 'Order', icon: CalendarCheck },
  { href: '/analysis', label: 'Analysis', icon: BarChart3 },
  { href: '/report', label: 'Report', icon: ClipboardList },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { closeMobileMenu } = useSidebar();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">
          <Sparkles size={22} />
        </div>
        <div className="sidebar-brand-text">
          <span className="sidebar-brand-name">AntiGravity</span>
          <span className="sidebar-brand-sub">Sales Monitor</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-nav-label">MAIN MENU</div>
        {navItems.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <item.icon size={19} />
              <span>{item.label}</span>
              {isActive && <div className="sidebar-active-indicator" />}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-card">
          <div className="sidebar-footer-dot" />
          <span>API Connected</span>
        </div>
      </div>


    </aside>
  );
}
