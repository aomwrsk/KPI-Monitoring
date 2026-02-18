import axios from 'axios';
import {
    Customer,
    Quotation,
    Booking,
    SalesData,
    DashboardStats,
    ProductPerformance,
    RegionData,
    ReportTemplate,
    ReportData,
    DashboardFilter,
} from '@/types';
import * as mock from './mockData';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = API_URL
    ? axios.create({
        baseURL: API_URL,
        timeout: 10000,
        headers: { 'Content-Type': 'application/json' },
    })
    : null;

// Helper: fetch from API or return mock data
async function fetchOrMock<T>(endpoint: string, mockData: T): Promise<T> {
    if (!apiClient) return mockData;
    try {
        const response = await apiClient.get<T>(endpoint);
        return response.data;
    } catch (error) {
        console.warn(`API call to ${endpoint} failed, using mock data`, error);
        return mockData;
    }
}

// Dashboard
export async function getDashboardStats(filters?: DashboardFilter): Promise<DashboardStats> {
    const query = filters ? new URLSearchParams(filters as any).toString() : '';
    return fetchOrMock(`/api/dashboard/stats?${query}`, mock.dashboardStats);
}

export async function getMonthlySales(filters?: DashboardFilter): Promise<SalesData[]> {
    const query = filters ? new URLSearchParams(filters as any).toString() : '';
    return fetchOrMock(`/api/dashboard/monthly-sales?${query}`, mock.monthlySales);
}

export async function getProductPerformance(filters?: DashboardFilter): Promise<ProductPerformance[]> {
    const query = filters ? new URLSearchParams(filters as any).toString() : '';
    return fetchOrMock(`/api/dashboard/products?${query}`, mock.productPerformance);
}

export async function getRegionData(filters?: DashboardFilter): Promise<RegionData[]> {
    const query = filters ? new URLSearchParams(filters as any).toString() : '';
    return fetchOrMock(`/api/dashboard/regions?${query}`, mock.regionData);
}

// Customers
export async function getCustomers(): Promise<Customer[]> {
    return fetchOrMock('/api/customers', mock.customers);
}

export async function getCustomerById(id: string): Promise<Customer | undefined> {
    if (!apiClient) return mock.customers.find((c) => c.id === id);
    try {
        const response = await apiClient.get<Customer>(`/api/customers/${id}`);
        return response.data;
    } catch {
        return mock.customers.find((c) => c.id === id);
    }
}

// Quotations
export async function getQuotations(): Promise<Quotation[]> {
    return fetchOrMock('/api/quotations', mock.quotations);
}

// Bookings
export async function getBookings(): Promise<Booking[]> {
    return fetchOrMock('/api/bookings', mock.bookings);
}

// Analysis
export async function getYearlyComparison() {
    return fetchOrMock('/api/analysis/yearly', mock.yearlyComparison);
}

export async function getCustomerSegmentation() {
    return fetchOrMock('/api/analysis/segmentation', mock.customerSegmentation);
}

// Reports
export async function getReportTemplates(): Promise<ReportTemplate[]> {
    return fetchOrMock('/api/reports/templates', mock.reportTemplates);
}

export async function getReportData(): Promise<ReportData[]> {
    return fetchOrMock('/api/reports/data', mock.reportData);
}
