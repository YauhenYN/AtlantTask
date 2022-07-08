using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.BLL.Dtos.StoreKeepersDtos
{
    public record AddStoreKeeperDto
    {
        [Required]
        [StringLength(50, MinimumLength = 1)]
        public string FullName { get; init; }
    }
}
