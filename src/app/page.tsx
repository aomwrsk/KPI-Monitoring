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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  DollarSign,
  Users,
  FileText,
  CalendarCheck,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ShoppingBag,
} from 'lucide-react';
import {
  getDashboardStats,
  getMonthlySales,
  getProductPerformance,
  getRegionData,
  getBookings,
} from '@/lib/api';
import type {
  DashboardStats,
  SalesData,
  ProductPerformance,
  RegionData,
  Booking,
  DashboardFilter,
} from '@/types';

const CHART_COLORS = ['#6366f1', '#06b6d4', '#22c55e', '#f59e0b', '#ef4444', '#a855f7'];

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [sales, setSales] = useState<SalesData[]>([]);
  const [products, setProducts] = useState<ProductPerformance[]>([]);
  const [regions, setRegions] = useState<RegionData[]>([]);
  const [recentBookings, setRecentBookings] = useState<Booking[]>([]);
  const [filters, setFilters] = useState<DashboardFilter>({
    year: new Date().getFullYear().toString(),
    month: '',
    customerType: '',
  });

  useEffect(() => {
    Promise.all([
      getDashboardStats(filters),
      getMonthlySales(filters),
      getProductPerformance(filters),
      getRegionData(filters),
      getBookings(),
    ]).then(([s, sl, p, r, b]) => {
      setStats(s);
      setSales(sl);
      setProducts(p);
      setRegions(r);
      setRecentBookings(b.slice(0, 5));
    });
  }, [filters]);

  if (!stats) {
    return (
      <div className="loading-container">
        <div className="spinner" />
      </div>
    );
  }

  const formatCurrency = (v: number) =>
    '฿' + v.toLocaleString('en-US');

  const statCards = [
    {
      label: 'Total Sales',
      value: formatCurrency(stats.totalSales),
      trend: stats.salesGrowth,
      icon: DollarSign,
      color: '#6366f1',
      bg: 'rgba(99,102,241,0.12)',
    },
    {
      label: 'Customers',
      value: stats.totalCustomers.toLocaleString(),
      trend: stats.customerGrowth,
      icon: Users,
      color: '#06b6d4',
      bg: 'rgba(6,182,212,0.12)',
    },
    {
      label: 'Quotations',
      value: stats.totalQuotations.toLocaleString(),
      trend: stats.quotationGrowth,
      icon: FileText,
      color: '#f59e0b',
      bg: 'rgba(245,158,11,0.12)',
    },
    {
      label: 'Bookings',
      value: stats.totalBookings.toLocaleString(),
      trend: stats.bookingGrowth,
      icon: CalendarCheck,
      color: '#22c55e',
      bg: 'rgba(34,197,94,0.12)',
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="page-title">Dashboard Overview</h1>
          <p className="page-subtitle">Welcome back! Here&apos;s your sales performance summary.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            className="tab"
            value={filters.year}
            onChange={(e) => setFilters({ ...filters, year: e.target.value })}
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)' }}
          >
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>

          <select
            className="tab"
            value={filters.month}
            onChange={(e) => setFilters({ ...filters, month: e.target.value })}
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)' }}
          >
            <option value="">All Months</option>
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
            className="tab"
            value={filters.customerType}
            onChange={(e) => setFilters({ ...filters, customerType: e.target.value })}
            style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)' }}
          >
            <option value="">All Types</option>
            <option value="Enterprise">Enterprise</option>
            <option value="SMB">SMB</option>
            <option value="Startup">Startup</option>
            <option value="Individual">Individual</option>
          </select>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="stats-grid">
        {statCards.map((card, i) => (
          <div
            key={card.label}
            className={`glass-card stat-card fade-in fade-in-delay-${i + 1}`}
          >
            <div className="stat-card-header">
              <span className="stat-card-label">{card.label}</span>
              <div
                className="stat-card-icon"
                style={{ background: card.bg, color: card.color }}
              >
                <card.icon size={20} />
              </div>
            </div>
            <div className="stat-card-value">{card.value}</div>
            <div
              className={`stat-card-trend ${card.trend >= 0 ? 'positive' : 'negative'}`}
            >
              {card.trend >= 0 ? (
                <TrendingUp size={14} />
              ) : (
                <TrendingDown size={14} />
              )}
              {Math.abs(card.trend)}% vs last month
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="charts-grid">
        {/* Revenue Trend */}
        <div className="glass-card chart-card fade-in">
          <div className="chart-card-header">
            <div>
              <div className="chart-card-title">Revenue Trend</div>
              <div className="chart-card-subtitle">Monthly revenue overview</div>
            </div>
            <ArrowUpRight size={18} style={{ color: 'var(--success)' }} />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={sales}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
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
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                strokeWidth={2.5}
                fill="url(#revenueGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="glass-card chart-card fade-in">
          <div className="chart-card-header">
            <div>
              <div className="chart-card-title">Top Products</div>
              <div className="chart-card-subtitle">Revenue by product</div>
            </div>
            <ShoppingBag size={18} style={{ color: 'var(--accent-start)' }} />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={products.slice(0, 6)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,102,241,0.08)" />
              <XAxis type="number" stroke="#64748b" fontSize={12} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#64748b"
                fontSize={11}
                width={120}
                tickFormatter={(v) => v.length > 16 ? v.slice(0, 14) + '…' : v}
              />
              <Tooltip
                formatter={(value) => [formatCurrency(Number(value)), 'Revenue']}
                contentStyle={{
                  background: '#111827',
                  border: '1px solid rgba(99,102,241,0.15)',
                  borderRadius: '10px',
                }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Bar dataKey="revenue" radius={[0, 6, 6, 0]}>
                {products.slice(0, 6).map((_, idx) => (
                  <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="charts-grid">
        {/* Revenue by Region */}
        <div className="glass-card chart-card fade-in">
          <div className="chart-card-header">
            <div>
              <div className="chart-card-title">Revenue by Region</div>
              <div className="chart-card-subtitle">Geographic distribution</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={regions}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={105}
                paddingAngle={3}
                strokeWidth={0}
              >
                {regions.map((_, idx) => (
                  <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [formatCurrency(Number(value)), 'Revenue']}
                contentStyle={{
                  background: '#111827',
                  border: '1px solid rgba(99,102,241,0.15)',
                  borderRadius: '10px',
                }}
                labelStyle={{ color: '#f1f5f9' }}
              />
              <Legend
                verticalAlign="middle"
                align="right"
                layout="vertical"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Bookings */}
        <div className="glass-card data-table-container fade-in">
          <div className="table-header">
            <span className="table-title">Recent Bookings</span>
            <a href="/booking" style={{ color: 'var(--accent-start)', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 600 }}>
              View All →
            </a>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Booking No</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((b) => (
                <tr key={b.id}>
                  <td className="font-mono" style={{ fontSize: '0.82rem' }}>{b.bookingNo}</td>
                  <td>{b.customerName}</td>
                  <td>{formatCurrency(b.totalAmount)}</td>
                  <td>
                    <span className={`badge badge-${b.status}`}>{b.status}</span>
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
