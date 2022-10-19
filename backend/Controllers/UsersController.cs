using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

[Route("api/users")]
[ApiController]
public class UsersController : Controller
{
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