import * as conf from '../configuration';
import axios from 'axios';

export const GetManyDetailsThunkСreator = (pageNumber, elementsCount) => {
    return async (dispatch) => {
        return await axios.get(conf.getManyDetailsLink(), {
            params: {
                pageNumber: pageNumber,
                elementsCount: elementsCount
            }
        }, {});
    }
};

export const GetDetailThunkСreator = (id) => {
    return async (dispatch) => {
        return await axios.get(conf.getDetailLink(id), {}, {});
    }
};

export const RemoveDetailThunkСreator = (id) => {
    return async (dispatch) => {
        return await axios.delete(conf.removeDetailLink(id), {});
    }
};

export const AddDetailThunkСreator = (nomenclatureCode, name, count, storeKeeperId, creationDate) => {
    return async (dispatch) => {
        return await axios.post(conf.addDetailLink(), {
            nomenclatureCode: nomenclatureCode,
            name: name,
            count: count,
            storeKeeperId: storeKeeperId,
            creationDate: creationDate
        });
    }
};

export const GetManyStoreKeepersThunkСreator = (pageNumber, elementsCount) => {
    return async (dispatch) => {
        return await axios.get(conf.getManyStoreKeepersLink(), {
            params: {
                pageNumber: pageNumber,
                elementsCount: elementsCount
            }
        }, {});
    }
};

export const GetStoreKeeperThunkСreator = (id) => {
    return async (dispatch) => {
        return await axios.get(conf.getStoreKeeperLink(id), {}, {});
    }
};

export const RemoveStoreKeeperThunkСreator = (id) => {
    return async (dispatch) => {
        return await axios.delete(conf.removeStoreKeeperLink(id), {});
    }
};

export const AddStoreKeeperThunkСreator = (fullName) => {
    return async (dispatch) => {
        return await axios.post(conf.addStoreKeeperLink(), {
            fullName: fullName
        });
    }
};

export const GetStoreKeeperDetailsCountThunkСreator = (storeKeeperid) => {
    return async (dispatch) => {
        return await axios.get(conf.getDetailsCount(storeKeeperid), {}, {});
    }
};