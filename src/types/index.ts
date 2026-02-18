export interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    totalSpend: number;
    totalOrders: number;
    status: 'active' | 'inactive';
    joinDate: string;
    lastOrder: string;
}

export interface QuotationItem {
    id: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

export interface Quotation {
    id: string;
    quotationNo: string;
    customerName: string;
    date: string;
    expiryDate: string;
    items: QuotationItem[];
    totalAmount: number;
    status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
    createdBy: string;
}

export interface Booking {
    id: string;
    bookingNo: string;
    customerName: string;
    date: string;
    deliveryDate: string;
    items: string[];
    totalAmount: number;
    status: 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled';
    paymentStatus: 'unpaid' | 'partial' | 'paid';
    notes: string;
}

export interface SalesData {
    month: string;
    revenue: number;
    orders: number;
    customers: number;
}

export interface ProductPerformance {
    name: string;
    sales: number;
    revenue: number;
    growth: number;
}

export interface RegionData {
    name: string;
    value: number;
}

export interface DashboardStats {
    totalSales: number;
    totalCustomers: number;
    totalQuotations: number;
    totalBookings: number;
    salesGrowth: number;
    customerGrowth: number;
    quotationGrowth: number;
    bookingGrowth: number;
}

export interface ReportTemplate {
    id: string;
    name: string;
    description: string;
    category: 'sales' | 'customer' | 'product' | 'financial';
    lastGenerated: string;
}

export interface ReportData {
    period: string;
    totalRevenue: number;
    totalOrders: number;
    avgOrderValue: number;
    topProduct: string;
    topCustomer: string;
}

export interface DashboardFilter {
    year: string;
    month: string;
    customerType: string;
}
