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
    }
}
