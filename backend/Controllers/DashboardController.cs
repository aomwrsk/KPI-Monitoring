using Microsoft.AspNetCore.Mvc;
using SalesMonitor.API.Models;
using SalesMonitor.API.Services;

namespace SalesMonitor.API.Controllers;

[ApiController]
[Route("api/dashboard")]
public class DashboardController : ControllerBase
{
    private readonly DataService _dataService;

    public DashboardController(DataService dataService)
    {
        _dataService = dataService;
    }

    [HttpGet("stats")]
    public ActionResult<DashboardStats> GetStats([FromQuery] int? year, [FromQuery] int? month, [FromQuery] string? customerType)
    {
        var filter = new DashboardFilter { Year = year, Month = month, CustomerType = customerType };
        return Ok(_dataService.GetDashboardStats(filter));
    }

    [HttpGet("monthly-sales")]
    public ActionResult<List<SalesData>> GetMonthlySales([FromQuery] int? year, [FromQuery] int? month, [FromQuery] string? customerType)
    {
        var filter = new DashboardFilter { Year = year, Month = month, CustomerType = customerType };
        return Ok(_dataService.GetMonthlySales(filter));
    }

    [HttpGet("products")]
    public ActionResult<List<ProductPerformance>> GetProducts([FromQuery] int? year, [FromQuery] int? month, [FromQuery] string? customerType)
    {
        return Ok(_dataService.GetProductPerformance());
    }

    [HttpGet("regions")]
    public ActionResult<List<RegionData>> GetRegions([FromQuery] int? year, [FromQuery] int? month, [FromQuery] string? customerType)
    {
        return Ok(_dataService.GetRegionData());
    }
}
