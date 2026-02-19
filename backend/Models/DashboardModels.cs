namespace SalesMonitor.API.Models;

public class DashboardStats
{
    public decimal TotalSales { get; set; }
    public int TotalCustomers { get; set; }
    public int TotalQuotations { get; set; }
    public int TotalOrders { get; set; }
    public double SalesGrowth { get; set; }
    public double CustomerGrowth { get; set; }
    public double QuotationGrowth { get; set; }
    public double OrderGrowth { get; set; }
}

public class SalesData
{
    public required string Month { get; set; }
    public decimal Revenue { get; set; }
    public int Orders { get; set; }
    public int Customers { get; set; }
}

public class ProductPerformance
{
    public required string Name { get; set; }
    public int Sales { get; set; }
    public decimal Revenue { get; set; }
    public double Growth { get; set; }
}

public class RegionData
{
    public required string Name { get; set; }
    public decimal Value { get; set; }
}

public class DashboardFilter
{
    public int? Year { get; set; }
    public int? Month { get; set; }
    public string? CustomerType { get; set; }
}
