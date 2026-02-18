'use client';

import { usePathname } from 'next/navigation';
import { Bell, Search, User, Sun, Moon, Menu, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useSidebar } from '@/components/SidebarProvider';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/customer': 'Customers',
  '/quotation': 'Quotations',
  '/booking': 'Bookings',
  '/analysis': 'Analysis',
  '/report': 'Reports',
};

export default function Header() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || 'Dashboard';
  const { theme, toggleTheme } = useTheme();
  const { isCollapsed, toggleCollapse, toggleMobileMenu } = useSidebar();

  return (
    <header className="header">
      <div className="header-left">
        <button
          className="header-icon-btn mobile-menu-btn"
          onClick={toggleMobileMenu}
          style={{ marginRight: '12px', display: 'none' }} // Visible only on mobile via CSS
        >
          <Menu size={20} />
        </button>

        <button
          className="header-icon-btn desktop-collapse-btn"
          onClick={toggleCollapse}
          style={{ marginRight: '12px' }}
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
        </button>

        <h2 className="header-title">{title}</h2>
      </div>

      <div className="header-right">
        <div className="header-search">
          <Search size={16} className="header-search-icon" />
          <input
            type="text"
            placeholder="Search anything..."
            className="header-search-input"
          />
        </div>

        <button
          className="header-icon-btn"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button className="header-icon-btn" title="Notifications">
          <Bell size={18} />
          <span className="notification-dot" />
        </button>

        <div className="header-avatar">
          <User size={18} />
        </div>
      </div>


    </header>
  );
}
