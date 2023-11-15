
global using api.Models;
global using api.Servises.AccountService;
global using api.Servises.ContentService;
global using Microsoft.EntityFrameworkCore;
global using api.Servises.UploadFileService;
global using api.Dtos.Account;
global using api.Dtos.Content;
global using api.Data;
global using api.Servises.TrackingService;
global using api.Servises.CommentService;
global using api.Dtos.Comment;
using WebApi.Middlewares;
using Microsoft.OpenApi.Models;


var builder = WebApplication.CreateBuilder(args);
// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "dotnet_hero", Version = "v1" });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement{
                    {
                        new OpenApiSecurityScheme{
                            Reference = new OpenApiReference{
                                Id = "Bearer",
                                Type = ReferenceType.SecurityScheme,
                            },
                            Scheme = "Bearer",
                            Name = "Bearer",
                            In = ParameterLocation.Header
                        },
                        new List<string>()
                    }
    });
});

builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IContentService, ContentService>();
builder.Services.AddScoped<IUploadFileService, UploadFileService>();
builder.Services.AddScoped<ITrackingService, TrackingService>();
builder.Services.AddScoped<ICommentService, CommentService>();
builder.Services.AddDbContext<DataContext>();

#region Cors
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "_myAllowSpecificOrigins",
        policy =>
        {
            policy
            .WithOrigins(
                "http://localhost:5173", 
                "https://tee.kru.ac.th", 
                "http://10.103.0.16"
                )
            //.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials()
            ;
        });
});
#endregion

var app = builder.Build();

#region  //สร้ำงข้อมูลจำลอง Fake data 
using var scope = app.Services.CreateScope(); //using หลังทำงำนเสร็จจะถูกทำลายจาก Memory 
var context = scope.ServiceProvider.GetRequiredService<DataContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
    // orm
    await context.Database.MigrateAsync();
}
catch (Exception ex)
{
    logger.LogError(ex, "Problem migrating data");
}
#endregion

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

#region ส่ง error ไปให้ Axios ตอนทำ Interceptor
app.UseMiddleware<ExceptionMiddleware>();
#endregion

app.UseCors("_myAllowSpecificOrigins");

app.UseDefaultFiles();

app.UseStaticFiles();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
