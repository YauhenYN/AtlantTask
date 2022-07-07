using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.BLL.Dtos.DetailsDtos
{
    public record DetailDto
    {
        public int DetailId { get; init; }
        public string NomenclatureCode { get; init; }
        public string Name { get; init; }
        public int? Count { get; init; }
        public int StoreKeeperId { get; init; }
        public string StoreKeeperName { get; init; }
        public DateTime CreationDate { get; init; }
        public DateTime? RemovingDate { get; init; }
    }
}
