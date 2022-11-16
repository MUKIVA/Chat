
namespace backend.Models;

public class MessageModel : UserModel
{ 
    public string Msg { get; set; } = string.Empty;
    
    public MessageModel()
    {}
}
