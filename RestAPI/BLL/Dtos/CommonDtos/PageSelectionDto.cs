using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.BLL.Dtos.CommonDtos
{
    public record PageSelectionDto
    {
        [Required]
        public int PageNumber { get; init; }
        [Required]
        public int ElementsCount { get; init; }
    }
}
