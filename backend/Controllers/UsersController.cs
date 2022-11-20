using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.DbTools;
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

    [Route("api/users/register_status")]
    [HttpGet]
    public async Task<IActionResult> GetUserRegisterStatus(string name)
    {
        try
        {
            var users = await DbExpressions.GetAllUsers();
            var result = users.FirstOrDefault(x => x.Name == name);
            if (result != null)
            {
                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return BadRequest();
        }
    }

    [Route("api/users/register_user")]
    [HttpPost]
    public async Task<IActionResult> RegisterUser()
    {
        var user = await JsonSerializer.DeserializeAsync<UserModel>(Request.Body);
        try
        {
            await DbExpressions.AddUser(user!.Name, user!.Password);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return BadRequest();
        }
        return Ok();
    }

    [Route("api/users/login")]
    [HttpPost]
    public async Task<IActionResult> LogInUser()
    {
        var user = await JsonSerializer.DeserializeAsync<UserModel>(Request.Body);
        try
        {
            var users = await DbExpressions.GetAllUsers();
            var result = users.FirstOrDefault(x => x.Name == user!.Name && x.Password == user.Password);
            if (result != null)
            {
                return Ok();
            }
            else
            {
                return Unauthorized();
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            return BadRequest();
        }
    }
}