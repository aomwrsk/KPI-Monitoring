'use client';

import { useEffect, useState } from 'react';
import { Search, FileText, Clock, CheckCircle, XCircle, Send } from 'lucide-react';
import { getQuotations } from '@/lib/api';
import type { Quotation } from '@/types';

const statusIcons: Record<string, React.ReactNode> = {
    draft: <Clock size={13} />,
    sent: <Send size={13} />,
    accepted: <CheckCircle size={13} />,
    rejected: <XCircle size={13} />,
    expired: <Clock size={13} />,
};

export default function QuotationPage() {
    const [quotations, setQuotations] = useState<Quotation[]>([]);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [yearFilter, setYearFilter] = useState<string>('2026');
    const [monthFilter, setMonthFilter] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 8;

    useEffect(() => {
        const filter = {
            year: yearFilter !== 'all' ? parseInt(yearFilter) : undefined,
            month: monthFilter !== 'all' ? parseInt(monthFilter) : undefined,
        };
        getQuotations(filter).then(setQuotations);
    }, [yearFilter, monthFilter]);

    const filtered = quotations.filter((q) => {
        const matchSearch =
            q.quotationNo.toLowerCase().includes(search.toLowerCase()) ||
            q.customerName.toLowerCase().includes(search.toLowerCase());
        const matchStatus = statusFilter === 'all' || q.status === statusFilter;
        return matchSearch && matchStatus;
    });

    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    const formatCurrency = (v?: number | null) => (v || 0).toLocaleString('en-US', { style: 'currency', currency: 'THB' }).replace('THB', '฿');

    const countByStatus = (status: string) =>
        quotations.filter((q) => q.status === status).length;

    const totalValue = quotations.reduce((s, q) => s + (q.totalAmount || 0), 0);

    return (
        <div>
            <h1 className="page-title">Quotation Management</h1>
            <p className="page-subtitle">Track and manage all quotations.</p>

            {/* Quick Stats */}
            <div className="quick-stats">
                <div className="glass-card quick-stat-item fade-in fade-in-delay-1">
                    <div className="quick-stat-label">Total</div>
                    <div className="quick-stat-value">{quotations.length}</div>
                </div>
                <div className="glass-card quick-stat-item fade-in fade-in-delay-2">
                    <div className="quick-stat-label">Accepted</div>
                    <div className="quick-stat-value" style={{ color: 'var(--success)' }}>
                        {countByStatus('accepted')}
                    </div>
                </div>
                <div className="glass-card quick-stat-item fade-in fade-in-delay-3">
                    <div className="quick-stat-label">Pending</div>
                    <div className="quick-stat-value" style={{ color: 'var(--info)' }}>
                        {countByStatus('sent')}
                    </div>
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
                        <FileText size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
                        Quotation List
                    </span>
                    <div className="table-actions">
                        <div className="search-wrapper">
                            <Search size={15} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search quotations..."
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
                            <option value="draft">Draft</option>
                            <option value="sent">Sent</option>
                            <option value="accepted">Accepted</option>
                            <option value="rejected">Rejected</option>
                            <option value="expired">Expired</option>
                        </select>
                    </div>
                </div>

                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Quotation No</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Expiry</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Created By</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated.map((q) => (
                            <tr key={q.id}>
                                <td className="font-mono" style={{ fontSize: '0.82rem', fontWeight: 600 }}>
                                    {q.quotationNo}
                                </td>
                                <td>{q.customerName}</td>
                                <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                    {q.date}
                                </td>
                                <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                    {q.expiryDate}
                                </td>
                                <td style={{ fontWeight: 600 }}>{formatCurrency(q.totalAmount)}</td>
                                <td>
                                    <span className={`badge badge-${q.status}`}>
                                        {statusIcons[q.status]} {q.status}
                                    </span>
                                </td>
                                <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                    {q.createdBy}
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
