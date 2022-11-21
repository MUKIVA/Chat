using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using backend.DbTools;
using System.Text.Json;
using backend.Models;

namespace backend.Hubs
{
    public class ChatHub : Hub
    {
        public async Task Send(string message, string username)
        {
            int id = await DbExpressions.AddMessage(username, message);
            await Clients.All.SendAsync("Receive", 
            id,
            message, 
            username, 
            DateTime.UtcNow
                    .Subtract(new DateTime(1970,1,1,0,0,0,DateTimeKind.Utc))
                    .TotalMilliseconds);
        }

        public async Task Delete(int id)
        {
            await DbExpressions.DeleteMessage(id);
            await Clients.All.SendAsync("Delete", id);
        }

        public async Task Update(UpdateMessage msg)
        {
            await DbExpressions.UpdateMessage(msg.id, msg.text);
            await Clients.All.SendAsync("Update", msg);
        }
    }
}