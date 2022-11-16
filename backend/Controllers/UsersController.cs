using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.DbTools;
using System.Text;
using System.Text.Json;

namespace backend.Controllers;


[ApiController]
public class UsersController : Controller
{
    [Route("api/users")]
    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        try
        {
            var users = await DbExpressions.GetAllUsers();
            return Json(users);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return BadRequest();
        }
    }

    [Route("api/users/add_user")]
    [HttpPost]
    public async Task<IActionResult> AddUser()
    {
        var user = await JsonSerializer.DeserializeAsync<UserModel>(Request.Body);
        try
        {
            await DbExpressions.AddUser(user!.Name);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return BadRequest();
        }
        return Ok();
    }
}