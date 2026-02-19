import {
    Customer,
    Quotation,
    Order,
    SalesData,
    ProductPerformance,
    RegionData,
    DashboardStats,
    ReportTemplate,
    ReportData,
} from '@/types';

export const dashboardStats: DashboardStats = {
    totalSales: 2847650,
    totalCustomers: 1284,
    totalQuotations: 456,
    totalOrders: 389,
    salesGrowth: 12.5,
    customerGrowth: 8.3,
    quotationGrowth: -2.1,
    orderGrowth: 15.7,
};

export const monthlySales: SalesData[] = [
    { month: 'Jan', revenue: 186000, orders: 120, customers: 89 },
    { month: 'Feb', revenue: 205000, orders: 135, customers: 95 },
    { month: 'Mar', revenue: 237000, orders: 148, customers: 102 },
    { month: 'Apr', revenue: 218000, orders: 142, customers: 98 },
    { month: 'May', revenue: 259000, orders: 165, customers: 110 },
    { month: 'Jun', revenue: 271000, orders: 172, customers: 115 },
    { month: 'Jul', revenue: 248000, orders: 158, customers: 108 },
    { month: 'Aug', revenue: 295000, orders: 185, customers: 125 },
    { month: 'Sep', revenue: 312000, orders: 198, customers: 132 },
    { month: 'Oct', revenue: 278000, orders: 176, customers: 120 },
    { month: 'Nov', revenue: 325000, orders: 210, customers: 140 },
    { month: 'Dec', revenue: 350000, orders: 225, customers: 150 },
];

export const productPerformance: ProductPerformance[] = [
    { name: 'Premium Widget A', sales: 1250, revenue: 562500, growth: 18.2 },
    { name: 'Standard Kit B', sales: 980, revenue: 392000, growth: 12.5 },
    { name: 'Enterprise Suite C', sales: 456, revenue: 684000, growth: 25.8 },
    { name: 'Basic Package D', sales: 2100, revenue: 315000, growth: 5.3 },
    { name: 'Pro Bundle E', sales: 675, revenue: 472500, growth: -3.2 },
    { name: 'Starter Pack F', sales: 1800, revenue: 270000, growth: 8.7 },
    { name: 'Ultimate Plan G', sales: 320, revenue: 480000, growth: 32.1 },
    { name: 'Custom Solution H', sales: 150, revenue: 375000, growth: 15.4 },
];

export const regionData: RegionData[] = [
    { name: 'Bangkok', value: 850000 },
    { name: 'Central', value: 520000 },
    { name: 'North', value: 380000 },
    { name: 'Northeast', value: 310000 },
    { name: 'South', value: 420000 },
    { name: 'East', value: 367650 },
];

export const customers: Customer[] = [
    { id: '1', name: 'Somchai Jaidee', email: 'somchai@example.com', phone: '081-234-5678', company: 'Thai Tech Co., Ltd.', totalSpend: 245000, totalOrders: 15, status: 'active', joinDate: '2024-03-15', lastOrder: '2026-02-10' },
    { id: '2', name: 'Pranee Sukjai', email: 'pranee@example.com', phone: '089-876-5432', company: 'Bangkok Solutions', totalSpend: 189000, totalOrders: 12, status: 'active', joinDate: '2024-05-22', lastOrder: '2026-02-08' },
    { id: '3', name: 'Wichai Rattana', email: 'wichai@example.com', phone: '092-111-2233', company: 'Northern Industries', totalSpend: 312000, totalOrders: 22, status: 'active', joinDate: '2023-11-10', lastOrder: '2026-01-28' },
    { id: '4', name: 'Suda Mingkwan', email: 'suda@example.com', phone: '085-444-5566', company: 'Siam Digital', totalSpend: 98000, totalOrders: 6, status: 'inactive', joinDate: '2024-08-05', lastOrder: '2025-11-15' },
    { id: '5', name: 'Kittipong Chai', email: 'kittipong@example.com', phone: '063-777-8899', company: 'Eastern Trading', totalSpend: 456000, totalOrders: 28, status: 'active', joinDate: '2023-06-18', lastOrder: '2026-02-14' },
    { id: '6', name: 'Naree Boonma', email: 'naree@example.com', phone: '091-222-3344', company: 'South Connect', totalSpend: 167000, totalOrders: 10, status: 'active', joinDate: '2024-01-20', lastOrder: '2026-02-05' },
    { id: '7', name: 'Arthit Srisuk', email: 'arthit@example.com', phone: '087-555-6677', company: 'Central Corp', totalSpend: 523000, totalOrders: 35, status: 'active', joinDate: '2023-02-14', lastOrder: '2026-02-12' },
    { id: '8', name: 'Wilai Thongdee', email: 'wilai@example.com', phone: '064-888-9900', company: 'Metro Systems', totalSpend: 78000, totalOrders: 4, status: 'inactive', joinDate: '2025-03-10', lastOrder: '2025-09-20' },
    { id: '9', name: 'Prasit Kaewkla', email: 'prasit@example.com', phone: '082-333-4455', company: 'Smart Solutions', totalSpend: 287000, totalOrders: 18, status: 'active', joinDate: '2024-04-08', lastOrder: '2026-02-11' },
    { id: '10', name: 'Duangjai Phrom', email: 'duangjai@example.com', phone: '095-666-7788', company: 'Creative Hub', totalSpend: 134000, totalOrders: 8, status: 'active', joinDate: '2024-09-25', lastOrder: '2026-01-30' },
    { id: '11', name: 'Chaiwat Pongsa', email: 'chaiwat@example.com', phone: '088-999-0011', company: 'Apex Industries', totalSpend: 395000, totalOrders: 24, status: 'active', joinDate: '2023-08-12', lastOrder: '2026-02-13' },
    { id: '12', name: 'Kannika Sripai', email: 'kannika@example.com', phone: '061-112-2334', company: 'Flora Co.', totalSpend: 56000, totalOrders: 3, status: 'inactive', joinDate: '2025-06-01', lastOrder: '2025-10-18' },
];

export const quotations: Quotation[] = [
    { id: '1', quotationNo: 'QT-2026-001', customerName: 'Somchai Jaidee', date: '2026-02-15', expiryDate: '2026-03-15', items: [{ id: '1', productName: 'Premium Widget A', quantity: 50, unitPrice: 450, total: 22500 }], totalAmount: 22500, status: 'sent', createdBy: 'Admin' },
    { id: '2', quotationNo: 'QT-2026-002', customerName: 'Kittipong Chai', date: '2026-02-14', expiryDate: '2026-03-14', items: [{ id: '1', productName: 'Enterprise Suite C', quantity: 5, unitPrice: 15000, total: 75000 }], totalAmount: 75000, status: 'accepted', createdBy: 'Admin' },
    { id: '3', quotationNo: 'QT-2026-003', customerName: 'Arthit Srisuk', date: '2026-02-12', expiryDate: '2026-03-12', items: [{ id: '1', productName: 'Pro Bundle E', quantity: 20, unitPrice: 700, total: 14000 }], totalAmount: 14000, status: 'draft', createdBy: 'Sales Team' },
    { id: '4', quotationNo: 'QT-2026-004', customerName: 'Pranee Sukjai', date: '2026-02-10', expiryDate: '2026-03-10', items: [{ id: '1', productName: 'Standard Kit B', quantity: 100, unitPrice: 400, total: 40000 }], totalAmount: 40000, status: 'sent', createdBy: 'Admin' },
    { id: '5', quotationNo: 'QT-2026-005', customerName: 'Wichai Rattana', date: '2026-02-08', expiryDate: '2026-03-08', items: [{ id: '1', productName: 'Ultimate Plan G', quantity: 2, unitPrice: 15000, total: 30000 }], totalAmount: 30000, status: 'rejected', createdBy: 'Sales Team' },
    { id: '6', quotationNo: 'QT-2026-006', customerName: 'Naree Boonma', date: '2026-02-05', expiryDate: '2026-03-05', items: [{ id: '1', productName: 'Basic Package D', quantity: 200, unitPrice: 150, total: 30000 }], totalAmount: 30000, status: 'accepted', createdBy: 'Admin' },
    { id: '7', quotationNo: 'QT-2026-007', customerName: 'Prasit Kaewkla', date: '2026-02-03', expiryDate: '2026-03-03', items: [{ id: '1', productName: 'Custom Solution H', quantity: 1, unitPrice: 25000, total: 25000 }], totalAmount: 25000, status: 'expired', createdBy: 'Admin' },
    { id: '8', quotationNo: 'QT-2026-010', customerName: 'Duangjai Phrom', date: '2026-02-01', expiryDate: '2026-03-01', items: [{ id: '1', productName: 'Starter Pack F', quantity: 150, unitPrice: 150, total: 22500 }], totalAmount: 22500, status: 'sent', createdBy: 'Sales Team' },
    { id: '9', quotationNo: 'QT-2026-009', customerName: 'Chaiwat Pongsa', date: '2026-01-28', expiryDate: '2026-02-28', items: [{ id: '1', productName: 'Premium Widget A', quantity: 80, unitPrice: 450, total: 36000 }], totalAmount: 36000, status: 'accepted', createdBy: 'Admin' },
    { id: '10', quotationNo: 'QT-2026-010', customerName: 'Suda Mingkwan', date: '2026-01-25', expiryDate: '2026-02-25', items: [{ id: '1', productName: 'Standard Kit B', quantity: 30, unitPrice: 400, total: 12000 }], totalAmount: 12000, status: 'draft', createdBy: 'Sales Team' },
];

export const orders: Order[] = [
    { id: '1', orderNo: 'BK-2026-001', customerName: 'Kittipong Chai', date: '2026-02-16', deliveryDate: '2026-02-25', items: ['Enterprise Suite C x5'], totalAmount: 75000, status: 'confirmed', paymentStatus: 'paid', notes: 'Priority delivery' },
    { id: '2', orderNo: 'BK-2026-002', customerName: 'Somchai Jaidee', date: '2026-02-15', deliveryDate: '2026-02-28', items: ['Premium Widget A x50'], totalAmount: 22500, status: 'processing', paymentStatus: 'partial', notes: '' },
    { id: '3', orderNo: 'BK-2026-003', customerName: 'Arthit Srisuk', date: '2026-02-14', deliveryDate: '2026-02-22', items: ['Pro Bundle E x20', 'Starter Pack F x10'], totalAmount: 15500, status: 'completed', paymentStatus: 'paid', notes: 'Regular customer' },
    { id: '4', orderNo: 'BK-2026-004', customerName: 'Naree Boonma', date: '2026-02-13', deliveryDate: '2026-02-26', items: ['Basic Package D x200'], totalAmount: 30000, status: 'pending', paymentStatus: 'unpaid', notes: 'Awaiting approval' },
    { id: '5', orderNo: 'BK-2026-005', customerName: 'Chaiwat Pongsa', date: '2026-02-12', deliveryDate: '2026-02-20', items: ['Premium Widget A x80'], totalAmount: 36000, status: 'confirmed', paymentStatus: 'paid', notes: '' },
    { id: '6', orderNo: 'BK-2026-006', customerName: 'Pranee Sukjai', date: '2026-02-11', deliveryDate: '2026-02-24', items: ['Standard Kit B x100'], totalAmount: 40000, status: 'processing', paymentStatus: 'partial', notes: 'Second batch' },
    { id: '7', orderNo: 'BK-2026-007', customerName: 'Prasit Kaewkla', date: '2026-02-10', deliveryDate: '2026-02-18', items: ['Custom Solution H x1'], totalAmount: 25000, status: 'completed', paymentStatus: 'paid', notes: 'Custom installation required' },
    { id: '8', orderNo: 'BK-2026-008', customerName: 'Wichai Rattana', date: '2026-02-09', deliveryDate: '2026-02-23', items: ['Ultimate Plan G x2'], totalAmount: 30000, status: 'cancelled', paymentStatus: 'unpaid', notes: 'Customer requested cancellation' },
    { id: '9', orderNo: 'BK-2026-009', customerName: 'Duangjai Phrom', date: '2026-02-08', deliveryDate: '2026-02-19', items: ['Starter Pack F x150'], totalAmount: 22500, status: 'pending', paymentStatus: 'unpaid', notes: '' },
    { id: '10', orderNo: 'BK-2026-010', customerName: 'Kannika Sripai', date: '2026-02-07', deliveryDate: '2026-02-21', items: ['Basic Package D x50'], totalAmount: 7500, status: 'confirmed', paymentStatus: 'paid', notes: 'New customer' },
];

export const reportTemplates: ReportTemplate[] = [
    { id: '1', name: 'Sales Summary Report', description: 'Comprehensive overview of sales performance including revenue, orders, and growth trends', category: 'sales', lastGenerated: '2026-02-15' },
    { id: '2', name: 'Customer Analysis Report', description: 'Detailed analysis of customer behavior, retention rates, and lifetime value', category: 'customer', lastGenerated: '2026-02-14' },
    { id: '3', name: 'Product Performance Report', description: 'Product-wise sales analysis with growth indicators and revenue contribution', category: 'product', lastGenerated: '2026-02-12' },
    { id: '4', name: 'Financial Summary Report', description: 'Financial overview with profit margins, expense breakdown, and forecasting', category: 'financial', lastGenerated: '2026-02-10' },
    { id: '5', name: 'Monthly Sales Report', description: 'Month-over-month sales comparison with trend analysis', category: 'sales', lastGenerated: '2026-02-01' },
    { id: '6', name: 'Top Customers Report', description: 'Ranking of customers by revenue contribution and order frequency', category: 'customer', lastGenerated: '2026-01-28' },
];

export const reportData: ReportData[] = [
    { period: 'Feb 2026', totalRevenue: 350000, totalOrders: 225, avgOrderValue: 1556, topProduct: 'Enterprise Suite C', topCustomer: 'Kittipong Chai' },
    { period: 'Jan 2026', totalRevenue: 325000, totalOrders: 210, avgOrderValue: 1548, topProduct: 'Premium Widget A', topCustomer: 'Arthit Srisuk' },
    { period: 'Dec 2025', totalRevenue: 312000, totalOrders: 198, avgOrderValue: 1576, topProduct: 'Ultimate Plan G', topCustomer: 'Chaiwat Pongsa' },
    { period: 'Nov 2025', totalRevenue: 295000, totalOrders: 185, avgOrderValue: 1595, topProduct: 'Enterprise Suite C', topCustomer: 'Kittipong Chai' },
    { period: 'Oct 2025', totalRevenue: 278000, totalOrders: 176, avgOrderValue: 1580, topProduct: 'Premium Widget A', topCustomer: 'Wichai Rattana' },
    { period: 'Sep 2025', totalRevenue: 271000, totalOrders: 172, avgOrderValue: 1576, topProduct: 'Custom Solution H', topCustomer: 'Prasit Kaewkla' },
];

export const yearlyComparison = [
    { month: 'Jan', thisYear: 325000, lastYear: 265000 },
    { month: 'Feb', thisYear: 350000, lastYear: 280000 },
    { month: 'Mar', thisYear: 0, lastYear: 310000 },
    { month: 'Apr', thisYear: 0, lastYear: 295000 },
    { month: 'May', thisYear: 0, lastYear: 315000 },
    { month: 'Jun', thisYear: 0, lastYear: 330000 },
    { month: 'Jul', thisYear: 0, lastYear: 305000 },
    { month: 'Aug', thisYear: 0, lastYear: 340000 },
    { month: 'Sep', thisYear: 0, lastYear: 355000 },
    { month: 'Oct', thisYear: 0, lastYear: 320000 },
    { month: 'Nov', thisYear: 0, lastYear: 345000 },
    { month: 'Dec', thisYear: 0, lastYear: 360000 },
];

export const customerSegmentation = [
    { name: 'Enterprise', customers: 45, revenue: 1250000 },
    { name: 'SMB', customers: 320, revenue: 890000 },
    { name: 'Startup', customers: 580, revenue: 420000 },
    { name: 'Individual', customers: 339, revenue: 287650 },
];
