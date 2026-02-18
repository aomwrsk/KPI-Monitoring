'use client';

import { useEffect, useState } from 'react';
import { Search, CalendarCheck, Package, CreditCard } from 'lucide-react';
import { getBookings } from '@/lib/api';
import type { Booking } from '@/types';

export default function BookingPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 8;

    useEffect(() => {
        getBookings().then(setBookings);
    }, []);

    const filtered = bookings.filter((b) => {
        const matchSearch =
            b.bookingNo.toLowerCase().includes(search.toLowerCase()) ||
            b.customerName.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'all' || b.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    const formatCurrency = (v: number) => '฿' + v.toLocaleString('en-US');

    // Quick stats: today, this week, this month (simplified with mock)
    const todayCount = bookings.filter((b) => b.date === '2026-02-16').length;
    const weekCount = bookings.filter((b) => b.date >= '2026-02-10').length;
    const monthCount = bookings.length;
    const totalValue = bookings.reduce((s, b) => s + b.totalAmount, 0);

    return (
        <div>
            <h1 className="page-title">Booking Management</h1>
            <p className="page-subtitle">Track all bookings and delivery schedules.</p>

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
                        Booking List
                    </span>
                    <div className="table-actions">
                        <div className="search-wrapper">
                            <Search size={15} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search bookings..."
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
                            <th>Booking No</th>
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
                        {paginated.map((b) => (
                            <tr key={b.id}>
                                <td className="font-mono" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                                    {b.bookingNo}
                                </td>
                                <td>{b.customerName}</td>
                                <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                    {b.date}
                                </td>
                                <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                    {b.deliveryDate}
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
                                        {b.items.length} item{b.items.length > 1 ? 's' : ''}
                                    </span>
                                </td>
                                <td style={{ fontWeight: 600 }}>{formatCurrency(b.totalAmount)}</td>
                                <td>
                                    <span className={`badge badge-${b.status}`}>{b.status}</span>
                                </td>
                                <td>
                                    <span className={`badge badge-${b.paymentStatus}`}>
                                        <CreditCard size={11} /> {b.paymentStatus}
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
