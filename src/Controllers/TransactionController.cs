using Cube.Data;
using Cube.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cube.Controllers;

[ApiController]
[Route("[controller]")]
public class TransactionController : ControllerBase
{
    private readonly ApplicationContext _context;

    public TransactionController(ApplicationContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IEnumerable<Transaction> Get()
    {
        return _context.Transactions.Include(t => t.Type).ToList();
    }
}
