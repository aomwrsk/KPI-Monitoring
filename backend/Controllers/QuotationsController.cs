using Microsoft.AspNetCore.Mvc;
using SalesMonitor.API.Models;
using SalesMonitor.API.Services;

namespace SalesMonitor.API.Controllers;

[ApiController]
[Route("api/quotations")]
public class QuotationsController : ControllerBase
{
    private readonly DataService _dataService;

    public QuotationsController(DataService dataService)
    {
        _dataService = dataService;
    }

    [HttpGet]
    public ActionResult<List<Quotation>> GetAll([FromQuery] int? year, [FromQuery] int? month)
    {
        var filter = new DashboardFilter { Year = year, Month = month };
        return Ok(_dataService.GetQuotations(filter));
    }
}
