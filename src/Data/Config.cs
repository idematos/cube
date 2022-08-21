namespace Cube.Data;

public class Config
{
    public static string ConnectionString { get; set; }

    static Config () 
    { 
        var host = Environment.GetEnvironmentVariable("DB_HOST");
        var database = Environment.GetEnvironmentVariable("DB_NAME");
        var user = Environment.GetEnvironmentVariable("DB_USER");
        var password = Environment.GetEnvironmentVariable("DB_PASWORD");
         
        if (host != null && database != null && user != null && password != null)
        {
            ConnectionString = $"Host={host};Database={database};Username={user};Password={password}";
        } else 
        {
            throw new SystemException("Missing required environment variables.");
        }
    }
}