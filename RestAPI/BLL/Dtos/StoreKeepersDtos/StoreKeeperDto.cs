using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.BLL.Dtos.StoreKeepersDtos
{
    public record StoreKeeperDto
    {
        public int StoreKeeperId { get; init; }
        public string FullName { get; init; }
        public int DetailsCount { get; init; }
    }
}
