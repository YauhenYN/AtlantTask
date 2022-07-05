using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.BLL.Dtos.CommonDtos
{
    public record SelectionResult<T>
    {
        public IEnumerable<T> Elements { get; init; }
        public int PagesCount { get; init; }
        public int CurrentPage { get; init; }
    }
}
