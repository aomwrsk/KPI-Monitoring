using Microsoft.AspNetCore.Mvc;
using SalesMonitor.API.Models;
using SalesMonitor.API.Services;

namespace SalesMonitor.API.Controllers;

[ApiController]
[Route("api/customers")]
public class CustomersController : ControllerBase
{
    private readonly DataService _dataService;

    public CustomersController(DataService dataService)
    {
        _dataService = dataService;
    }

    [HttpGet]
    public ActionResult<List<Customer>> GetAll([FromQuery] int? year, [FromQuery] int? month)
    {
        var filter = new DashboardFilter { Year = year, Month = month };
        return Ok(_dataService.GetCustomers(filter));
    }

    [HttpGet("{id}")]
    public ActionResult<Customer> GetById(string id)
    {
        var customer = _dataService.GetCustomerById(id);
        if (customer == null)
            return NotFound();
        
        return Ok(customer);
    }
}
