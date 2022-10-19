using Microsoft.AspNetCore.Mvc;
using System.Text;
using IO = System.IO;

namespace backend.Controllers;


[Route("api/file")]
[ApiController]
public class FileManagerController : Controller
{
    [HttpGet]
    public async Task<IActionResult> GetFile(string path)
    {
        if (!IO.File.Exists(path))
            return NotFound("Invalid file or derictory");

        string text = await IO.File.ReadAllTextAsync(path);
        return Ok(text);
    }
}