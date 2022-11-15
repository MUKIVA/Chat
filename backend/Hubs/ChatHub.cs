using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System.Text.Json;
using backend.Models;

namespace backend.Hubs
{
    public class ChatHub : Hub
    {
        public async Task Send(string message, string username)
        {
            // var s = JsonSerializer.Serialize<MessageModel>(new ("Ivan", "Some text", DateTime.UtcNow.Date));
            await Clients.All.SendAsync("Receive", 
            message, 
            username, 
            DateTime.UtcNow
                    .Subtract(new DateTime(1970,1,1,0,0,0,DateTimeKind.Utc))
                    .TotalMilliseconds);
        }
    }
}