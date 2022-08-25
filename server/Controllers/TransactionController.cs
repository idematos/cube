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
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult PostTransactionsFile([FromForm] IFormFile file)
    {
        try
        {
            var transactions = _transactionService.ParseTransactions(file.ReadAsList());
            return Created("/transaction", transactions);
        }
        catch (ArgumentException e)
        {
            return ValidationProblem(e.Message);
        }
    }
}

