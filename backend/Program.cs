using SalesMonitor.API.Services;
using SalesMonitor.API.Data;
using Microsoft.EntityFrameworkCore;
using dotenv.net;

DotEnv.Load();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddOpenApi();

// Register DataService
builder.Services.AddScoped<DataService>();

// Configure Database Connection (Env or AppSettings)
var dbHost = Environment.GetEnvironmentVariable("DB_HOST");
var dbPort = Environment.GetEnvironmentVariable("DB_PORT") ?? "1433";
var dbName = Environment.GetEnvironmentVariable("DB_NAME") ?? "SalesMonitor";
var dbUser = Environment.GetEnvironmentVariable("DB_USER");
var dbPass = Environment.GetEnvironmentVariable("DB_PASSWORD");

string connectionString;
if (!string.IsNullOrEmpty(dbHost) && !string.IsNullOrEmpty(dbUser))
{
    connectionString = $"Server={dbHost},{dbPort};Database={dbName};User Id={dbUser};Password={dbPass};TrustServerCertificate=True;";
    Console.WriteLine($"Using Database: {dbHost} ({dbName})");
}
else
{
    connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
        ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
    Console.WriteLine("Using DefaultConnection from appsettings.json");
}

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();

