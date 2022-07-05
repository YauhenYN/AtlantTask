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
        public string NomenclatureCode { get; init; }
        [Required]
        public string Name { get; init; }
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
