'use client';

import { useEffect, useState } from 'react';
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import { TrendingUp, Users, Package, Target } from 'lucide-react';
import {
    getMonthlySales,
    getProductPerformance,
    getYearlyComparison,
    getCustomerSegmentation,
} from '@/lib/api';
import type { SalesData, ProductPerformance } from '@/types';

const CHART_COLORS = ['#6366f1', '#06b6d4', '#22c55e', '#f59e0b', '#ef4444', '#a855f7'];

export default function AnalysisPage() {
    const [sales, setSales] = useState<SalesData[]>([]);
    const [products, setProducts] = useState<ProductPerformance[]>([]);
    const [yearly, setYearly] = useState<{ month: string; thisYear: number; lastYear: number }[]>([]);
    const [segments, setSegments] = useState<{ name: string; customers: number; revenue: number }[]>([]);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        Promise.all([
            getMonthlySales(),
            getProductPerformance(),
            getYearlyComparison(),
            getCustomerSegmentation(),
        ]).then(([s, p, y, seg]) => {
            setSales(s);
            setProducts(p);
            setYearly(y);
            setSegments(seg);
        });
    }, []);

    const formatCurrency = (v?: number | null) => (v || 0).toLocaleString('en-US', { style: 'currency', currency: 'THB' }).replace('THB', '฿');
    const totalRevenue = sales.reduce((s, d) => s + (d.revenue || 0), 0);
    const avgMonthly = sales.length ? Math.round(totalRevenue / sales.length) : 0;
    const peakMonth = sales.reduce((max, d) => ((d.revenue || 0) > (max.revenue || 0) ? d : max), sales[0]);
    const totalOrders = sales.reduce((s, d) => s + (d.orders || 0), 0);

    if (!sales.length) {
        return (
            <div className="loading-container">
                <div className="spinner" />
            </div>
        );
    }

    return (
        <div>
            <h1 className="page-title">Sales Analysis</h1>
            <p className="page-subtitle">Deep insights into your sales performance and trends.</p>

            {/* Tabs */}
            <div className="tabs">
                {['overview', 'products', 'customers'].map((tab) => (
                    <button
                        key={tab}
                        className={`tab ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Quick Stats */}
            <div className="quick-stats">
                <div className="glass-card quick-stat-item fade-in fade-in-delay-1">
                    <div className="quick-stat-label">Total Revenue</div>
                    <div className="quick-stat-value">{formatCurrency(totalRevenue)}</div>
                </div>
                <div className="glass-card quick-stat-item fade-in fade-in-delay-2">
                    <div className="quick-stat-label">Avg Monthly</div>
                    <div className="quick-stat-value">{formatCurrency(avgMonthly)}</div>
                </div>
                <div className="glass-card quick-stat-item fade-in fade-in-delay-3">
                    <div className="quick-stat-label">Peak Month</div>
                    <div className="quick-stat-value" style={{ color: 'var(--success)' }}>
                        {peakMonth?.month}
                    </div>
                </div>
                <div className="glass-card quick-stat-item fade-in fade-in-delay-4">
                    <div className="quick-stat-label">Total Orders</div>
                    <div className="quick-stat-value">{totalOrders.toLocaleString()}</div>
                </div>
            </div>

            {activeTab === 'overview' && (
                <>
                    {/* YoY Comparison */}
                    <div className="charts-grid">
                        <div className="glass-card chart-card fade-in">
                            <div className="chart-card-header">
                                <div>
                                    <div className="chart-card-title">Year-over-Year Comparison</div>
                                    <div className="chart-card-subtitle">2026 vs 2025</div>
                                </div>
                                <TrendingUp size={18} style={{ color: 'var(--success)' }} />
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={yearly}>
                                    <defs>
                                        <linearGradient id="thisYearGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                                            <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="lastYearGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.15} />
                                            <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" />
                                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                                    <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                                    <Tooltip
                                        formatter={(value, name) => [
                                            formatCurrency(Number(value)),
                                            name === 'thisYear' ? '2026' : '2025',
                                        ]}
                                        contentStyle={{ background: '#111827', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '10px' }}
                                        labelStyle={{ color: '#f1f5f9' }}
                                    />
                                    <Legend formatter={(value) => (value === 'thisYear' ? '2026' : '2025')} />
                                    <Area type="monotone" dataKey="thisYear" stroke="#6366f1" strokeWidth={2.5} fill="url(#thisYearGrad)" />
                                    <Area type="monotone" dataKey="lastYear" stroke="#06b6d4" strokeWidth={2} strokeDasharray="5 5" fill="url(#lastYearGrad)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Orders & Customers trend */}
                        <div className="glass-card chart-card fade-in">
                            <div className="chart-card-header">
                                <div>
                                    <div className="chart-card-title">Orders & Customers</div>
                                    <div className="chart-card-subtitle">Monthly trend</div>
                                </div>
                                <Target size={18} style={{ color: 'var(--accent-start)' }} />
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={sales}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" />
                                    <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                                    <YAxis stroke="#64748b" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{ background: '#111827', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '10px' }}
                                        labelStyle={{ color: '#f1f5f9' }}
                                    />
                                    <Legend />
                                    <Line type="monotone" dataKey="orders" stroke="#22c55e" strokeWidth={2.5} dot={{ r: 4 }} />
                                    <Line type="monotone" dataKey="customers" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'products' && (
                <div className="charts-grid">
                    {/* Product revenue bar */}
                    <div className="glass-card chart-card fade-in">
                        <div className="chart-card-header">
                            <div>
                                <div className="chart-card-title">Product Revenue</div>
                                <div className="chart-card-subtitle">Revenue by product line</div>
                            </div>
                            <Package size={18} style={{ color: 'var(--warning)' }} />
                        </div>
                        <ResponsiveContainer width="100%" height={320}>
                            <BarChart data={products}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" />
                                <XAxis
                                    dataKey="name"
                                    stroke="#64748b"
                                    fontSize={11}
                                    tickFormatter={(v) => (v.length > 12 ? v.slice(0, 10) + '…' : v)}
                                />
                                <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                                <Tooltip
                                    formatter={(value) => [formatCurrency(Number(value)), 'Revenue']}
                                    contentStyle={{ background: '#111827', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '10px' }}
                                    labelStyle={{ color: '#f1f5f9' }}
                                />
                                <Bar dataKey="revenue" radius={[6, 6, 0, 0]}>
                                    {products.map((_, idx) => (
                                        <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Growth table */}
                    <div className="glass-card data-table-container fade-in">
                        <div className="table-header">
                            <span className="table-title">Product Growth</span>
                        </div>
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Sales</th>
                                    <th>Revenue</th>
                                    <th>Growth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p) => (
                                    <tr key={p.name}>
                                        <td style={{ fontWeight: 600 }}>{p.name}</td>
                                        <td>{(p.sales || 0).toLocaleString()}</td>
                                        <td>{formatCurrency(p.revenue)}</td>
                                        <td>
                                            <span
                                                style={{
                                                    color: (p.growth || 0) >= 0 ? 'var(--success)' : 'var(--danger)',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                {(p.growth || 0) >= 0 ? '+' : ''}{p.growth || 0}%
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === 'customers' && (
                <div className="charts-grid">
                    {/* Segmentation Pie */}
                    <div className="glass-card chart-card fade-in">
                        <div className="chart-card-header">
                            <div>
                                <div className="chart-card-title">Customer Segmentation</div>
                                <div className="chart-card-subtitle">By business type</div>
                            </div>
                            <Users size={18} style={{ color: 'var(--info)' }} />
                        </div>
                        <ResponsiveContainer width="100%" height={320}>
                            <PieChart>
                                <Pie
                                    data={segments}
                                    dataKey="customers"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={110}
                                    paddingAngle={3}
                                    strokeWidth={0}
                                >
                                    {segments.map((_, idx) => (
                                        <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ background: '#111827', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '10px' }}
                                    labelStyle={{ color: '#f1f5f9' }}
                                />
                                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Segment revenue bar */}
                    <div className="glass-card chart-card fade-in">
                        <div className="chart-card-header">
                            <div>
                                <div className="chart-card-title">Revenue by Segment</div>
                                <div className="chart-card-subtitle">Customer segment contribution</div>
                            </div>
                        </div>
                        <ResponsiveContainer width="100%" height={320}>
                            <BarChart data={segments}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                                <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                                <Tooltip
                                    formatter={(value, name) => [
                                        name === 'revenue' ? formatCurrency(Number(value)) : value,
                                        name === 'revenue' ? 'Revenue' : 'Customers',
                                    ]}
                                    contentStyle={{ background: '#111827', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '10px' }}
                                    labelStyle={{ color: '#f1f5f9' }}
                                />
                                <Legend />
                                <Bar dataKey="revenue" fill="#6366f1" radius={[6, 6, 0, 0]} />
                                <Bar dataKey="customers" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}
        </div>
    );
}
