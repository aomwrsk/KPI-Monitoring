'use client';

import { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import {
    FileBarChart,
    Download,
    Calendar,
    Eye,
} from 'lucide-react';
import { getReportTemplates, getReportData } from '@/lib/api';
import type { ReportTemplate, ReportData } from '@/types';

export default function ReportPage() {
    const [templates, setTemplates] = useState<ReportTemplate[]>([]);
    const [reportData, setReportData] = useState<ReportData[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [dateFrom, setDateFrom] = useState('2025-09-01');
    const [dateTo, setDateTo] = useState('2026-02-28');

    useEffect(() => {
        Promise.all([getReportTemplates(), getReportData()]).then(([t, d]) => {
            setTemplates(t);
            setReportData(d);
        });
    }, []);

    const filteredTemplates =
        categoryFilter === 'all'
            ? templates
            : templates.filter((t) => t.category === categoryFilter);

    const formatCurrency = (v?: number | null) => (v || 0).toLocaleString('en-US', { style: 'currency', currency: 'THB' }).replace('THB', '฿');

    return (
        <div>
            <h1 className="page-title">Reports</h1>
            <p className="page-subtitle">Generate and export comprehensive business reports.</p>

            {/* Filters */}
            <div className="flex-between mb-24" style={{ flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <select
                        className="filter-select"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option value="all">All Categories</option>
                        <option value="sales">Sales</option>
                        <option value="customer">Customer</option>
                        <option value="product">Product</option>
                        <option value="financial">Financial</option>
                    </select>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar size={15} style={{ color: 'var(--text-muted)' }} />
                        <input
                            type="date"
                            className="date-input"
                            value={dateFrom}
                            onChange={(e) => setDateFrom(e.target.value)}
                        />
                        <span style={{ color: 'var(--text-muted)' }}>to</span>
                        <input
                            type="date"
                            className="date-input"
                            value={dateTo}
                            onChange={(e) => setDateTo(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Report Templates */}
            <div className="report-grid">
                {filteredTemplates.map((t, i) => (
                    <div
                        key={t.id}
                        className={`glass-card report-card fade-in fade-in-delay-${(i % 4) + 1}`}
                        onClick={() => setSelectedTemplate(selectedTemplate === t.id ? null : t.id)}
                        style={{
                            borderColor:
                                selectedTemplate === t.id
                                    ? 'var(--accent-start)'
                                    : undefined,
                        }}
                    >
                        <span className={`report-card-category category-${t.category}`}>
                            {t.category}
                        </span>
                        <div className="report-card-title">{t.name}</div>
                        <div className="report-card-desc">{t.description}</div>
                        <div className="flex-between">
                            <span className="report-card-date">
                                Last generated: {t.lastGenerated}
                            </span>
                            <div style={{ display: 'flex', gap: '6px' }}>
                                <button
                                    className="btn btn-secondary"
                                    style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                                    title="Preview"
                                >
                                    <Eye size={13} />
                                </button>
                                <button
                                    className="btn btn-primary"
                                    style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                                    title="Download"
                                >
                                    <Download size={13} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Report Preview */}
            <div className="charts-grid">
                <div className="glass-card chart-card fade-in">
                    <div className="chart-card-header">
                        <div>
                            <div className="chart-card-title">Revenue Overview</div>
                            <div className="chart-card-subtitle">Period trend</div>
                        </div>
                        <FileBarChart size={18} style={{ color: 'var(--accent-start)' }} />
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={[...reportData].reverse()}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" />
                            <XAxis dataKey="period" stroke="#64748b" fontSize={11} />
                            <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                            <Tooltip
                                formatter={(value) => [formatCurrency(Number(value)), 'Revenue']}
                                contentStyle={{
                                    background: '#111827',
                                    border: '1px solid rgba(99,102,241,0.15)',
                                    borderRadius: '10px',
                                }}
                                labelStyle={{ color: '#f1f5f9' }}
                            />
                            <Bar dataKey="totalRevenue" fill="#6366f1" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Report Data Table */}
                <div className="glass-card data-table-container fade-in">
                    <div className="table-header">
                        <span className="table-title">Report Data</span>
                        <button className="btn btn-primary" style={{ fontSize: '0.82rem' }}>
                            <Download size={14} /> Export CSV
                        </button>
                    </div>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Period</th>
                                <th>Revenue</th>
                                <th>Orders</th>
                                <th>Avg Order</th>
                                <th>Top Product</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.map((r) => (
                                <tr key={r.period}>
                                    <td style={{ fontWeight: 600 }}>{r.period}</td>
                                    <td>{formatCurrency(r.totalRevenue)}</td>
                                    <td>{r.totalOrders}</td>
                                    <td>{formatCurrency(r.avgOrderValue)}</td>
                                    <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                        {r.topProduct}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
