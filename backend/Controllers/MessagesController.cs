using System.Net.Mime;
using System.Text.Json;
using backend.DbTools;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
namespace backend.Controllers
{
    [ApiController]
    public class MessagesController : Controller
    {
        [Route("api/messages/add_message")]
        [HttpPost]
        public async Task<IActionResult> AddMessage()
        {
            var message = await JsonSerializer.DeserializeAsync<MessageModel>(Request.Body);
            try
            {
                await DbExpressions.AddMessage(message!.Name, message!.Msg);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest();
            }
            return Ok();
        }

        [Route("api/messages/get_message_range")]
        [HttpGet]
        public async Task<IActionResult> GetMessageRange(int offset, int count)
        {
            try
            {
                var data = await DbExpressions.GetMessagesRange(offset, count);
                return Json(data);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest();
            }
        }
    }
}