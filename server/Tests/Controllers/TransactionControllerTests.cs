using Cube.Data;
using Cube.Controllers;
using Microsoft.AspNetCore.Mvc;
using Xunit;
using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using Cube.Services.Default;
using Microsoft.Data.Sqlite;

namespace Cube.Tests;

public class TransactionControllerTests
{
    private readonly DbConnection _connection;

    private readonly DbContextOptions<ApplicationContext> _contextOptions;

    private readonly TransactionController _transactionController;

    public TransactionControllerTests()
    {
        _connection = new SqliteConnection("Filename=:memory:");
        _connection.Open();

        _contextOptions = new DbContextOptionsBuilder<ApplicationContext>()
            .UseSqlite(_connection)
            .Options;

        var context = new ApplicationContext(_contextOptions, true);
        if (context.Database.EnsureCreated())
        {
            var transactionService = new TransactionService(context);
            _transactionController = new TransactionController(context, transactionService);
        }
        else
        {
            throw new SystemException("Could not initialize database");
        }
    }

    [Fact]
    public void ShouldGetTransactions()
    {
        var response = _transactionController.Get() as OkObjectResult;
        Assert.Equal(StatusCodes.Status200OK, response?.StatusCode);
    }

    [Fact]
    public void ShouldPostTransactionsFile()
    {
        var content = "12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS";
        var fileName = "test.txt";
        var stream = new MemoryStream();
        var writer = new StreamWriter(stream);
        writer.Write(content);
        writer.Flush();
        stream.Position = 0;

        IFormFile file = new FormFile(stream, 0, stream.Length, fileName, fileName);

        var response = _transactionController.PostTransactionsFile(file) as CreatedResult;
        Assert.Equal(StatusCodes.Status201Created, response?.StatusCode);
    }
}