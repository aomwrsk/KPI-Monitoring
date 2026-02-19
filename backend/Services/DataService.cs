using Microsoft.EntityFrameworkCore;
using SalesMonitor.API.Data;
using SalesMonitor.API.Models;

namespace SalesMonitor.API.Services;

public class DataService
{
    private readonly ApplicationDbContext _context;

    public DataService(ApplicationDbContext context)
    {
        _context = context;
    }

    private void SeedData()
    {
        if (!_context.Customers.Any())
        {
            _context.Customers.AddRange(new List<Customer>
            {
                new() { Id = "1", Name = "Somchai Jaidee", Email = "somchai@example.com", Phone = "081-234-5678", Company = "Thai Tech Co., Ltd.", TotalSpend = 245000, TotalOrders = 15, Status = "active", JoinDate = DateTime.Parse("2024-03-15"), LastOrder = DateTime.Parse("2026-02-10") },
                new() { Id = "2", Name = "Pranee Sukjai", Email = "pranee@example.com", Phone = "089-876-5432", Company = "Bangkok Solutions", TotalSpend = 189000, TotalOrders = 12, Status = "active", JoinDate = DateTime.Parse("2024-05-22"), LastOrder = DateTime.Parse("2026-02-08") },
                new() { Id = "3", Name = "Wichai Rattana", Email = "wichai@example.com", Phone = "092-111-2233", Company = "Northern Industries", TotalSpend = 312000, TotalOrders = 22, Status = "active", JoinDate = DateTime.Parse("2023-11-10"), LastOrder = DateTime.Parse("2026-01-28") },
                new() { Id = "4", Name = "Suda Mingkwan", Email = "suda@example.com", Phone = "085-444-5566", Company = "Siam Digital", TotalSpend = 98000, TotalOrders = 6, Status = "inactive", JoinDate = DateTime.Parse("2024-08-05"), LastOrder = DateTime.Parse("2025-11-15") },
                new() { Id = "5", Name = "Kittipong Chai", Email = "kittipong@example.com", Phone = "063-777-8899", Company = "Eastern Trading", TotalSpend = 456000, TotalOrders = 28, Status = "active", JoinDate = DateTime.Parse("2023-06-18"), LastOrder = DateTime.Parse("2026-02-14") },
                new() { Id = "6", Name = "Naree Boonma", Email = "naree@example.com", Phone = "091-222-3344", Company = "South Connect", TotalSpend = 167000, TotalOrders = 10, Status = "active", JoinDate = DateTime.Parse("2024-01-20"), LastOrder = DateTime.Parse("2026-02-05") },
                new() { Id = "7", Name = "Arthit Srisuk", Email = "arthit@example.com", Phone = "087-555-6677", Company = "Central Corp", TotalSpend = 523000, TotalOrders = 35, Status = "active", JoinDate = DateTime.Parse("2023-02-14"), LastOrder = DateTime.Parse("2026-02-12") },
                new() { Id = "8", Name = "Wilai Thongdee", Email = "wilai@example.com", Phone = "064-888-9900", Company = "Metro Systems", TotalSpend = 78000, TotalOrders = 4, Status = "inactive", JoinDate = DateTime.Parse("2025-03-10"), LastOrder = DateTime.Parse("2025-09-20") },
                new() { Id = "9", Name = "Prasit Kaewkla", Email = "prasit@example.com", Phone = "082-333-4455", Company = "Smart Solutions", TotalSpend = 287000, TotalOrders = 18, Status = "active", JoinDate = DateTime.Parse("2024-04-08"), LastOrder = DateTime.Parse("2026-02-11") },
                new() { Id = "10", Name = "Duangjai Phrom", Email = "duangjai@example.com", Phone = "095-666-7788", Company = "Creative Hub", TotalSpend = 134000, TotalOrders = 8, Status = "active", JoinDate = DateTime.Parse("2024-09-25"), LastOrder = DateTime.Parse("2026-01-30") }
            });
        }

        if (!_context.Orders.Any())
        {
            _context.Orders.AddRange(new List<Order>
            {
                new() { Id = "1", OrderNo = "BK-2026-001", CustomerName = "Kittipong Chai", Date = DateTime.Parse("2026-02-16"), shipment_date = DateTime.Parse("2026-02-25"), Items = new List<string> { "Enterprise Suite C x5" }, TotalAmount = 75000, Status = "confirmed", PaymentStatus = "paid", Notes = "Priority delivery" },
                new() { Id = "2", OrderNo = "BK-2026-002", CustomerName = "Somchai Jaidee", Date = DateTime.Parse("2026-02-15"), shipment_date = DateTime.Parse("2026-02-28"), Items = new List<string> { "Premium Widget A x50" }, TotalAmount = 22500, Status = "processing", PaymentStatus = "partial", Notes = "" },
                new() { Id = "3", OrderNo = "BK-2026-003", CustomerName = "Arthit Srisuk", Date = DateTime.Parse("2026-02-14"), shipment_date = DateTime.Parse("2026-02-22"), Items = new List<string> { "Pro Bundle E x20", "Starter Pack F x10" }, TotalAmount = 15500, Status = "completed", PaymentStatus = "paid", Notes = "Regular customer" },
                new() { Id = "4", OrderNo = "BK-2026-004", CustomerName = "Naree Boonma", Date = DateTime.Parse("2026-02-13"), shipment_date = DateTime.Parse("2026-02-26"), Items = new List<string> { "Basic Package D x200" }, TotalAmount = 30000, Status = "pending", PaymentStatus = "unpaid", Notes = "Awaiting approval" },
                new() { Id = "5", OrderNo = "BK-2026-005", CustomerName = "Chaiwat Pongsa", Date = DateTime.Parse("2026-02-12"), shipment_date = DateTime.Parse("2026-02-20"), Items = new List<string> { "Premium Widget A x80" }, TotalAmount = 36000, Status = "confirmed", PaymentStatus = "paid", Notes = "" }
            });
        }

        if (!_context.Quotations.Any())
        {
             _context.Quotations.AddRange(new List<Quotation>
            {
                new() { Id = "1", QuotationNo = "QT-2026-001", CustomerName = "Somchai Jaidee", Date = DateTime.Parse("2026-02-15"), ExpiryDate = DateTime.Parse("2026-03-15"), TotalAmount = 22500, Status = "sent", CreatedBy = "Admin", Items = new List<QuotationItem>() },
                new() { Id = "2", QuotationNo = "QT-2026-002", CustomerName = "Kittipong Chai", Date = DateTime.Parse("2026-02-14"), ExpiryDate = DateTime.Parse("2026-03-14"), TotalAmount = 75000, Status = "accepted", CreatedBy = "Admin", Items = new List<QuotationItem>() },
                new() { Id = "3", QuotationNo = "QT-2026-003", CustomerName = "Arthit Srisuk", Date = DateTime.Parse("2026-02-12"), ExpiryDate = DateTime.Parse("2026-03-12"), TotalAmount = 14000, Status = "draft", CreatedBy = "Sales Team", Items = new List<QuotationItem>() },
                new() { Id = "4", QuotationNo = "QT-2026-004", CustomerName = "Pranee Sukjai", Date = DateTime.Parse("2026-02-10"), ExpiryDate = DateTime.Parse("2026-03-10"), TotalAmount = 40000, Status = "sent", CreatedBy = "Admin", Items = new List<QuotationItem>() },
                new() { Id = "5", QuotationNo = "QT-2026-005", CustomerName = "Wichai Rattana", Date = DateTime.Parse("2026-02-08"), ExpiryDate = DateTime.Parse("2026-03-08"), TotalAmount = 30000, Status = "rejected", CreatedBy = "Sales Team", Items = new List<QuotationItem>() }
            });
        }

        _context.SaveChanges();
    }

    private string ApplyDateFilter(string sql, string dateColumn, DashboardFilter filter)
    {
        var whereClauses = new List<string>();
        if (filter.Year.HasValue)
            whereClauses.Add($"YEAR({dateColumn}) = {filter.Year.Value}");
        if (filter.Month.HasValue)
            whereClauses.Add($"MONTH({dateColumn}) = {filter.Month.Value}");

        if (whereClauses.Count > 0)
        {
            string where = string.Join(" AND ", whereClauses);
            if (sql.Contains("WHERE", StringComparison.OrdinalIgnoreCase))
                return $"{sql} AND {where}";
            else
                return $"{sql} WHERE {where}";
        }
        return sql;
    }

    // Dashboard Stats
    public DashboardStats GetDashboardStats(DashboardFilter filter)
    {
        // Example using Raw SQL for aggregation
        decimal totalOrderAmount = 0;
        try 
        {
            string salesSql = ApplyDateFilter("SELECT ISNULL(SUM(total_before_vat), 0) AS Value FROM VIEW_SO_SUM", "shipment_date", filter);
            totalOrderAmount = _context.Database.SqlQueryRaw<decimal>(salesSql).FirstOrDefault();
        }
        catch { /* Fallback if table doesn't exist yet */ }

        int customerCount = 0;
        int quotationCount = 0;
        int orderCount = 0;

        try
        {
            string custSql = ApplyDateFilter("SELECT COUNT(*) AS Value FROM appoint_head", "record_date", filter);
            string qtSql = ApplyDateFilter("SELECT COUNT(*) AS Value FROM cost_sheet_head", "qt_date", filter);
            string orderSql = ApplyDateFilter("SELECT COUNT(*) AS Value FROM order_head", "shipment_date", filter);

            customerCount = _context.Database.SqlQueryRaw<int>(custSql).FirstOrDefault();
            quotationCount = _context.Database.SqlQueryRaw<int>(qtSql).FirstOrDefault();
            orderCount = _context.Database.SqlQueryRaw<int>(orderSql).FirstOrDefault();
        }
        catch { /* Fallback for trial run */ }
        
        return new DashboardStats
        {
            TotalSales = totalOrderAmount > 0 ? totalOrderAmount : 2847650,
            TotalCustomers = customerCount > 0 ? customerCount : 1284,
            TotalQuotations = quotationCount > 0 ? quotationCount : 456,
            TotalOrders = orderCount > 0 ? orderCount : 389,
            SalesGrowth = 12.5,
            CustomerGrowth = 8.3,
            QuotationGrowth = -2.1,
            OrderGrowth = 15.7
        };
    }

    // Monthly Sales (Mock - stays as list for now)
    public List<SalesData> GetMonthlySales(DashboardFilter filter)
    {
        return new List<SalesData>
        {
            new() { Month = "Jan", Revenue = 186000, Orders = 120, Customers = 89 },
            new() { Month = "Feb", Revenue = 205000, Orders = 135, Customers = 95 },
            new() { Month = "Mar", Revenue = 237000, Orders = 148, Customers = 102 },
            new() { Month = "Apr", Revenue = 218000, Orders = 142, Customers = 98 },
            new() { Month = "May", Revenue = 259000, Orders = 165, Customers = 110 },
            new() { Month = "Jun", Revenue = 271000, Orders = 172, Customers = 115 },
            new() { Month = "Jul", Revenue = 248000, Orders = 158, Customers = 108 },
            new() { Month = "Aug", Revenue = 295000, Orders = 185, Customers = 125 },
            new() { Month = "Sep", Revenue = 312000, Orders = 198, Customers = 132 },
            new() { Month = "Oct", Revenue = 278000, Orders = 176, Customers = 120 },
            new() { Month = "Nov", Revenue = 325000, Orders = 210, Customers = 140 },
            new() { Month = "Dec", Revenue = 350000, Orders = 225, Customers = 150 }
        };
    }

    // Product Perf (Mock)
    public List<ProductPerformance> GetProductPerformance()
    {
        return new List<ProductPerformance>
        {
            new() { Name = "Premium Widget A", Sales = 1250, Revenue = 562500, Growth = 18.2 },
            new() { Name = "Standard Kit B", Sales = 980, Revenue = 392000, Growth = 12.5 },
            new() { Name = "Enterprise Suite C", Sales = 456, Revenue = 684000, Growth = 25.8 },
            new() { Name = "Basic Package D", Sales = 2100, Revenue = 315000, Growth = 5.3 },
            new() { Name = "Pro Bundle E", Sales = 675, Revenue = 472500, Growth = -3.2 },
            new() { Name = "Starter Pack F", Sales = 1800, Revenue = 270000, Growth = 8.7 },
            new() { Name = "Ultimate Plan G", Sales = 320, Revenue = 480000, Growth = 32.1 },
            new() { Name = "Custom Solution H", Sales = 150, Revenue = 375000, Growth = 15.4 }
        };
    }

    // Region Data (Mock)
    public List<RegionData> GetRegionData()
    {
         return new List<RegionData>
        {
            new() { Name = "Bangkok", Value = 850000 },
            new() { Name = "Central", Value = 520000 },
            new() { Name = "North", Value = 380000 },
            new() { Name = "Northeast", Value = 310000 },
            new() { Name = "South", Value = 420000 },
            new() { Name = "East", Value = 367650 }
        };
    }

    // Customers from DB using Raw SQL
    public List<Customer> GetCustomers(DashboardFilter filter) => 
        _context.Customers.FromSqlRaw(ApplyDateFilter("SELECT * FROM appoint_head", "record_date", filter)).ToList();

    public Customer? GetCustomerById(string id) => 
        _context.Customers.FromSqlRaw("SELECT * FROM appoint_head WHERE appoint_no = {0}", id).FirstOrDefault();

    // Quotations from DB using Raw SQL
    public List<Quotation> GetQuotations(DashboardFilter filter)
    {
        try 
        {
            string baseSql = @"
                SELECT q.qt_no, q.customer_name, q.qt_date, q.so_amount, q.is_status, q.expiration_qt_date, 
                       s.fname AS staff_name
                FROM cost_sheet_head q
                LEFT JOIN hr_staff s ON q.staff_id = s.staff_id";
            
            return _context.Quotations.FromSqlRaw(ApplyDateFilter(baseSql, "qt_date", filter)).ToList();
        }
        catch (Exception ex)
        {
            Console.WriteLine("DEBUG: Quotation Query Failed: " + ex.Message);
            return new List<Quotation>();
        }
    }

    // Orders from DB using Raw SQL
    public List<Order> GetOrders(DashboardFilter filter) => 
        _context.Orders.FromSqlRaw(ApplyDateFilter("SELECT * FROM order_head", "shipment_date", filter)).ToList();
}
