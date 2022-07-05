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
        public string FullName { get; init; }
    }
}
