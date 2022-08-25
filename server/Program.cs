using Cube.Data;
using Cube.Services;
using Cube.Services.Default;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMvc();
builder.Services.AddDbContext<ApplicationContext>();
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.WebHost.UseUrls("http://*:8080");

var app = builder.Build();

app.Use(async (context, next) =>
{
    await next();
    if (context.Response.StatusCode == 404)
    {
        context.Request.Path = "/";
        await next();
    }
});
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "Cube v1");
    options.RoutePrefix = "swagger";
});
app.UseDefaultFiles();
app.UseStaticFiles();
app.MapControllers();

app.Run();
