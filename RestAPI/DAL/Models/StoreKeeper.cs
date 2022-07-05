using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.DAL.Models
{
    [Table("StoreKeepers")]
    public class StoreKeeper
    {
        public int StoreKeeperId { get; set; }
        [Required]
        public string FullName { get; set; }
        public List<Detail> Details { get; set; }
    }
}
