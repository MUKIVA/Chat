using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class UpdateMessage
    {
        public int id { get; set; } = -1;
        public string userName { get; set; } = string.Empty; 
        public string text { get; set; } = string.Empty;
        public DateTime time { get; set; } = DateTime.Now;
    }
}