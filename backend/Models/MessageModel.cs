
namespace backend.Models;

public class MessageModel
{
    public string Name { get; set; } = string.Empty; 
    public string Msg { get; set; } = string.Empty;
    public DateTime Time { get; set; }
    public MessageModel(string name, string msg, DateTime time)
    {
        Name = name;
        Msg = msg;
        Time = time;
    }
}
