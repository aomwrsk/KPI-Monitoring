using Microsoft.AspNetCore.Mvc;
using SalesMonitor.API.Models;
using SalesMonitor.API.Services;

namespace SalesMonitor.API.Controllers;

[ApiController]
[Route("api/orders")]
public class OrdersController : ControllerBase
{
    private readonly DataService _dataService;

    public OrdersController(DataService dataService)
    {
        _dataService = dataService;
    }

    [HttpGet]
    public ActionResult<List<Order>> GetAll([FromQuery] int? year, [FromQuery] int? month)
    {
        var filter = new DashboardFilter { Year = year, Month = month };
        return Ok(_dataService.GetOrders(filter));
    }
}
