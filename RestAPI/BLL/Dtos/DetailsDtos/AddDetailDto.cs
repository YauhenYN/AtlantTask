using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.BLL.Dtos.DetailsDtos
{
    public record AddDetailDto : IValidatableObject
    {
        [Required]
        [StringLength(20, MinimumLength = 1)]
        public string NomenclatureCode { get; init; }
        [Required]
        [StringLength(20, MinimumLength = 1)]
        public string Name { get; init; }
        [Range(0, 1000000)]
        public int? Count { get; init; }
        [Required]
        public int StoreKeeperId { get; init; }
        [Required]
        public DateTime CreationDate { get; init; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            List<ValidationResult> errors = new List<ValidationResult>();
            if (CreationDate > DateTime.UtcNow) errors.Add(new ValidationResult("Creation Date Shouldn't be more than current"));
            return errors;
        }
    }
}
