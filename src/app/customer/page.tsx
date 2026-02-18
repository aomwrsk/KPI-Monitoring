'use client';

import { useEffect, useState } from 'react';
import { Search, Mail, Phone, Building2 } from 'lucide-react';
import { getCustomers } from '@/lib/api';
import type { Customer } from '@/types';

export default function CustomerPage() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 8;

    useEffect(() => {
        getCustomers().then(setCustomers);
    }, []);

    const filtered = customers.filter((c) => {
        const matchSearch =
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase()) ||
            c.company.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'all' || c.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    const formatCurrency = (v: number) => '฿' + v.toLocaleString('en-US');

    const totalActive = customers.filter((c) => c.status === 'active').length;
    const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpend, 0);
    const avgSpend = customers.length
        ? Math.round(totalRevenue / customers.length)
        : 0;

    return (
        <div>
            <h1 className="page-title">Customer Management</h1>
            <p className="page-subtitle">
                View and manage your customer database.
            </p>

            {/* Quick Stats */}
            <div className="quick-stats">
                <div className="glass-card quick-stat-item fade-in fade-in-delay-1">
                    <div className="quick-stat-label">Total Customers</div>
                    <div className="quick-stat-value">{customers.length}</div>
                </div>
                <div className="glass-card quick-stat-item fade-in fade-in-delay-2">
                    <div className="quick-stat-label">Active</div>
                    <div className="quick-stat-value" style={{ color: 'var(--success)' }}>
                        {totalActive}
                    </div>
                </div>
                <div className="glass-card quick-stat-item fade-in fade-in-delay-3">
                    <div className="quick-stat-label">Total Revenue</div>
                    <div className="quick-stat-value">{formatCurrency(totalRevenue)}</div>
                </div>
                <div className="glass-card quick-stat-item fade-in fade-in-delay-4">
                    <div className="quick-stat-label">Avg. Spend</div>
                    <div className="quick-stat-value">{formatCurrency(avgSpend)}</div>
                </div>
            </div>

            {/* Table */}
            <div className="glass-card data-table-container fade-in">
                <div className="table-header">
                    <span className="table-title">Customer List</span>
                    <div className="table-actions">
                        <div className="search-wrapper">
                            <Search size={15} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search customers..."
                                className="search-input"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                        <select
                            className="filter-select"
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Contact</th>
                            <th>Company</th>
                            <th>Total Spend</th>
                            <th>Orders</th>
                            <th>Status</th>
                            <th>Last Order</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.map((c) => (
                            <tr key={c.id}>
                                <td>
                                    <div style={{ fontWeight: 600 }}>{c.name}</div>
                                </td>
                                <td>
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '3px',
                                            fontSize: '0.82rem',
                                        }}
                                    >
                                        <span
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                color: 'var(--text-secondary)',
                                            }}
                                        >
                                            <Mail size={12} /> {c.email}
                                        </span>
                                        <span
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                color: 'var(--text-secondary)',
                                            }}
                                        >
                                            <Phone size={12} /> {c.phone}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <span
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                        }}
                                    >
                                        <Building2 size={14} style={{ color: 'var(--text-muted)' }} />
                                        {c.company}
                                    </span>
                                </td>
                                <td style={{ fontWeight: 600 }}>{formatCurrency(c.totalSpend)}</td>
                                <td>{c.totalOrders}</td>
                                <td>
                                    <span className={`badge badge-${c.status}`}>{c.status}</span>
                                </td>
                                <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                    {c.lastOrder}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                <div className="pagination">
                    <span className="pagination-info">
                        Showing {(currentPage - 1) * perPage + 1}–
                        {Math.min(currentPage * perPage, filtered.length)} of{' '}
                        {filtered.length}
                    </span>
                    <div className="pagination-buttons">
                        <button
                            className="pagination-btn"
                            disabled={currentPage <= 1}
                            onClick={() => setCurrentPage((p) => p - 1)}
                        >
                            ‹
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''
                                    }`}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            className="pagination-btn"
                            disabled={currentPage >= totalPages}
                            onClick={() => setCurrentPage((p) => p + 1)}
                        >
                            ›
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
