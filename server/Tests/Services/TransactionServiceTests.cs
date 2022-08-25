using System.Data.Common;
using Cube.Data;
using Cube.Services.Default;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace Cube.Tests;

public class TransactionServiceTests
{
    private readonly DbConnection _connection;
    private readonly DbContextOptions<ApplicationContext> _contextOptions;

    private readonly TransactionService _transactionService;

    public TransactionServiceTests()
    {
        _connection = new SqliteConnection("Filename=:memory:");
        _connection.Open();

        _contextOptions = new DbContextOptionsBuilder<ApplicationContext>()
            .UseSqlite(_connection)
            .Options;

        var context = new ApplicationContext(_contextOptions, true);
        if (context.Database.EnsureCreated())
        {
            _transactionService = new TransactionService(context);
        }
        else
        {
            throw new SystemException("Could not initialize database");
        }
    }

    [Fact]
    public void ShouldCreateTransactionsRange()
    {
        // Arrange
        List<string> list = new List<string>();
        list.Add("12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS");
        list.Add("12021-12-03T11:46:02-03:00DOMINANDO INVESTIMENTOS       0000050000MARIA CANDIDA");
        list.Add("22022-01-16T14:13:54-03:00CURSO DE BEM-ESTAR            0000012750THIAGO OLIVEIRA");
        list.Add("32022-01-16T14:13:54-03:00CURSO DE BEM-ESTAR            0000004500THIAGO OLIVEIRA");
        list.Add("42022-01-16T14:13:54-03:00CURSO DE BEM-ESTAR            0000004500JOSE CARLOS");

        IEnumerable<string> transactionList = list;

        // Act
        var parsedTransactions = _transactionService.ParseTransactions(transactionList);

        // Assert
        Assert.Equal(5, parsedTransactions.Count);
    }

    [Fact]
    public void WhenLineLengthIsLessThanMinimun_ShouldThrowArgumentException()
    {
        // Arrange
        List<string> list = new List<string>();
        list.Add("12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012");

        IEnumerable<string> transactionList = list;

        // Act
        try
        {
            _transactionService.ParseTransactions(transactionList);
        }
        catch (System.ArgumentException e)
        {
            // Assert
            Assert.Contains(_transactionService.MalformedLineMessage, e.Message);
        }
    }

    [Fact]
    public void WhenFirstCharacterIsNotAValidTypeId_ShouldThrowArgumentException()
    {
        // Arrange
        List<string> list = new List<string>();
        list.Add("A2022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS");

        IEnumerable<string> transactionList = list;

        // Act
        try
        {
            _transactionService.ParseTransactions(transactionList);
        }
        catch (System.ArgumentException e)
        {
            // Assert
            Assert.Contains(_transactionService.InvalidTypeIdMessage, e.Message);
        }
    }

    [Fact]
    public void WhenTheGivenTypeIdWasNotFound_ShouldThrowArgumentException()
    {
        // Arrange
        List<string> list = new List<string>();
        list.Add("62022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS");

        IEnumerable<string> transactionList = list;

        // Act
        try
        {
            _transactionService.ParseTransactions(transactionList);
        }
        catch (System.ArgumentException e)
        {
            // Assert
            Assert.Contains(_transactionService.TypeIdNotFoundMessage, e.Message);
        }
    }

    [Fact]
    public void WhenValueIsNotAValid_ShouldThrowArgumentException()
    {
        // Arrange
        List<string> list = new List<string>();
        list.Add("12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            00000XYZ50JOSE CARLOS");

        IEnumerable<string> transactionList = list;

        // Act
        try
        {
            _transactionService.ParseTransactions(transactionList);
        }
        catch (System.ArgumentException e)
        {
            // Assert
            Assert.Contains(_transactionService.InvalidTransactionValueMessage, e.Message);
        }
    }
}