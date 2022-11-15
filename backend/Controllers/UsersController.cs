using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;


[ApiController]
public class UsersController : Controller
{
    [Route("api/users")]
    public IActionResult GetUsers()
    {
        var users = new[]
        {
            new {Name = "Ivan"},
            new {Name = "Oleg"}
        };
        return Ok(users);        
    }
}