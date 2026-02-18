'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface SidebarContextType {
    isCollapsed: boolean;
    isMobileOpen: boolean;
    toggleCollapse: () => void;
    toggleMobileMenu: () => void;
    closeMobileMenu: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    // Initialize with false, but checking localStorage could be good
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Initialize from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('sidebar-collapsed');
        if (stored === 'true') {
            setIsCollapsed(true);
            document.documentElement.setAttribute('data-sidebar-collapsed', 'true');
        }
    }, []);

    const toggleCollapse = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        localStorage.setItem('sidebar-collapsed', String(newState));
        if (newState) {
            document.documentElement.setAttribute('data-sidebar-collapsed', 'true');
        } else {
            document.documentElement.removeAttribute('data-sidebar-collapsed');
        }
    };

    const toggleMobileMenu = () => {
        const newState = !isMobileOpen;
        setIsMobileOpen(newState);
        if (newState) {
            document.documentElement.setAttribute('data-sidebar-mobile-open', 'true');
        } else {
            document.documentElement.removeAttribute('data-sidebar-mobile-open');
        }
    };

    const closeMobileMenu = () => {
        setIsMobileOpen(false);
        document.documentElement.removeAttribute('data-sidebar-mobile-open');
    };

    // Close mobile menu on route change implicitly handled by user action or hook in component? 
    // No, better to handle in Sidebar.tsx usage of usePathname

    return (
        <SidebarContext.Provider
            value={{
                isCollapsed,
                isMobileOpen,
                toggleCollapse,
                toggleMobileMenu,
                closeMobileMenu,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
}
