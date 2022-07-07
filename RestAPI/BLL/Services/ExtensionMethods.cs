using RestAPI.BLL.Dtos.DetailsDtos;
using RestAPI.BLL.Dtos.StoreKeepersDtos;
using RestAPI.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestAPI.BLL.Services
{
    public static class ExtensionMethods
    {
        public static StoreKeeperDto ToStoreKeeperDto(this StoreKeeper storeKeeper)
        {
            return new StoreKeeperDto()
            {
                FullName = storeKeeper.FullName,
                DetailsCount = storeKeeper.Details.Count,
                StoreKeeperId = storeKeeper.StoreKeeperId
            };
        }
        public static DetailDto ToDetailDto(this Detail detail)
        {
            return new DetailDto()
            {
                DetailId = detail.DetailId,
                CreationDate = detail.CreationDate,
                RemovingDate = detail.RemovingDate,
                Count = detail.Count,
                NomenclatureCode = detail.NomenclatureCode,
                Name = detail.Name,
                StoreKeeperId = detail.StoreKeeperId,
                StoreKeeperName = detail.StoreKeeper.FullName
            };
        }
    }
}
