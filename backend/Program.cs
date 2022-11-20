using backend.Hubs;
using backend.DbTools;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSignalR();
builder.Services.AddControllersWithViews();
builder.Services.AddCors(options => options.AddPolicy("CorsPolicy",
    (opt) => opt
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader())
);

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

// app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseDefaultFiles();


app.UseRouting();
app.UseCors("CorsPolicy");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapHub<ChatHub>("/chat"); // route: api/chat

DbConfig.InitConnection();
app.Run();
