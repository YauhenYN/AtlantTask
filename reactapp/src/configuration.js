export const apiLink = "https://localhost:44379";

export const listElementsCount = 10;

//Details
export const getManyDetailsLink = () => apiLink + "/Details/Many";
export const getDetailLink = (id) => apiLink + "/Details/" + id;
export const removeDetailLink = (id) => apiLink + "/Details/" + id;
export const addDetailLink = () => apiLink + "/Details";

//StoreKeepers
export const getManyStoreKeepersLink = () => apiLink + "/StoreKeepers/Many";
export const getStoreKeeperLink = (id) => apiLink + "/StoreKeepers/" + id;
export const removeStoreKeeperLink = (id) => apiLink + "/StoreKeepers/" + id;
export const addStoreKeeperLink = () => apiLink + "/StoreKeepers";
export const getDetailsCount = (id) => apiLink + "/StoreKeepers/" + id;

