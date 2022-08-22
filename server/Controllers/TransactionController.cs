using Cube.Data;
using Cube.Extensions;
using Cube.Models;
using Cube.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cube.Controllers;

[ApiController]
[Route("[controller]")]
public class TransactionController : ControllerBase
{
    private readonly ApplicationContext _context;
    private readonly ITransactionService _transactionService;

    public TransactionController(ApplicationContext context, ITransactionService transactionService)
    {
        (_context, _transactionService) = (context, transactionService);
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Transaction>), StatusCodes.Status200OK)]
    public IActionResult Get()
    {
        var result = _context.Transactions.Include(t => t.Type).ToList();
        return Ok(result);
    }

    [HttpPost("file")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public IActionResult PostTransactionsFile([FromForm] IFormFile file)
    {
        _transactionService.ParseTransactions(file.ReadAsList());
        return Ok();
    }

}

