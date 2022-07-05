using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.DAL.Models
{
    [Table("Details")]
    public class Detail
    {
        public int DetailId { get; set; }
        [Required]
        public string NomenclatureCode { get; set; }
        [Required]
        public string Name { get; set; }
        public int? Count { get; set; }
        [Required]
        public int StoreKeeperId { get; set; }
        [ForeignKey("StoreKeeperId")]
        public StoreKeeper StoreKeeper { get; set; }
        [Required]
        [Column(TypeName = "datetime")]
        public DateTime CreationDate { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? RemovingDate { get; set; }
    }
}
