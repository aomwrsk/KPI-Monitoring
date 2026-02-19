'use client';

import { useEffect, useState } from 'react';
import { Search, CalendarCheck, Package, CreditCard } from 'lucide-react';
import { getOrders } from '@/lib/api';
import type { Order } from '@/types';

export default function OrderPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [yearFilter, setYearFilter] = useState<string>('2026');
    const [monthFilter, setMonthFilter] = useState<string>('2');
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 8;

    useEffect(() => {
        const filter = {
            year: yearFilter !== 'all' ? parseInt(yearFilter) : undefined,
            month: monthFilter !== 'all' ? parseInt(monthFilter) : undefined,
        };
        getOrders(filter).then(setOrders);
    }, [yearFilter, monthFilter]);

    const filtered = orders.filter((o) => {
        const matchSearch =
            o.orderNo.toLowerCase().includes(search.toLowerCase()) ||
            o.customerName.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'all' || o.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    const formatCurrency = (v?: number | null) => (v || 0).toLocaleString('en-US', { style: 'currency', currency: 'THB' }).replace('THB', '฿');

    // Quick stats: today, this week, this month
    const todayCount = orders.filter((o) => o.date === '2026-02-16').length;
    const weekCount = orders.filter((o) => o.date >= '2026-02-10').length;
    const monthCount = orders.length;
    const totalValue = orders.reduce((s, o) => s + (o.totalAmount || 0), 0);

    return (
        <div>
            <h1 className="page-title">Order Management</h1>
            <p className="page-subtitle">Track all orders. Filtering is based on <strong>Shipment Date</strong>.</p>

            {/* Quick Stats */}
            <div className="quick-stats">
                <div className="glass-card quick-stat-item fade-in fade-in-delay-1">
                    <div className="quick-stat-label">Today</div>
                    <div className="quick-stat-value" style={{ color: 'var(--accent-start)' }}>
                        {todayCount}
                    </div>
                </div>
                <div className="glass-card quick-stat-item fade-in fade-in-delay-2">
                    <div className="quick-stat-label">This Week</div>
                    <div className="quick-stat-value" style={{ color: 'var(--info)' }}>
                        {weekCount}
                    </div>
                </div>
                <div className="glass-card quick-stat-item fade-in fade-in-delay-3">
                    <div className="quick-stat-label">This Month</div>
                    <div className="quick-stat-value">{monthCount}</div>
                </div>
                <div className="glass-card quick-stat-item fade-in fade-in-delay-4">
                    <div className="quick-stat-label">Total Value</div>
                    <div className="quick-stat-value">{formatCurrency(totalValue)}</div>
                </div>
            </div>

            {/* Table */}
            <div className="glass-card data-table-container fade-in">
                <div className="table-header">
                    <span className="table-title">
                        <CalendarCheck size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
                        Order List
                    </span>
                    <div className="table-actions">
                        <div className="search-wrapper">
                            <Search size={15} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search orders..."
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
                            value={yearFilter}
                            onChange={(e) => {
                                setYearFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                        >
                            <option value="all">All Year</option>
                            <option value="2024">2024</option>
                            <option value="2025">2025</option>
                            <option value="2026">2026</option>
                        </select>
                        <select
                            className="filter-select"
                            value={monthFilter}
                            onChange={(e) => {
                                setMonthFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                        >
                            <option value="all">All Month</option>
                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>
                        <select
                            className="filter-select"
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Order No</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Delivery</th>
                            <th>Items</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Payment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.map((o) => (
                            <tr key={o.id}>
                                <td className="font-mono" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                                    {o.orderNo}
                                </td>
                                <td>{o.customerName}</td>
                                <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                    {o.date}
                                </td>
                                <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                    {o.shipment_date ? new Date(o.shipment_date).toLocaleDateString() : '-'}
                                </td>
                                <td>
                                    <span
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '5px',
                                            fontSize: '0.85rem',
                                        }}
                                    >
                                        <Package size={13} style={{ color: 'var(--text-muted)' }} />
                                        {o.items.length} item{o.items.length > 1 ? 's' : ''}
                                    </span>
                                </td>
                                <td style={{ fontWeight: 600 }}>{formatCurrency(o.totalAmount)}</td>
                                <td>
                                    <span className={`badge badge-${o.status}`}>{o.status}</span>
                                </td>
                                <td>
                                    <span className={`badge badge-${o.paymentStatus}`}>
                                        <CreditCard size={11} /> {o.paymentStatus}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="pagination">
                    <span className="pagination-info">
                        Showing {(currentPage - 1) * perPage + 1}–
                        {Math.min(currentPage * perPage, filtered.length)} of {filtered.length}
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
                                className={`pagination-btn ${currentPage === i + 1 ? 'active' : ''}`}
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
