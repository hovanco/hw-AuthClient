import {get, isUndefined} from 'lodash';
import {getStore} from '../../../api';
import {IToken} from '../../../api/token';

const getStoreId = async (token: IToken): Promise<string> => {

    const store = await getStore(token.accessToken);

    return get(store, '_id');
};

const checkNoStore = async (token: IToken): Promise<boolean> => {
    const storeId = await getStoreId(token);

    return isUndefined(storeId);
};

export {getStoreId, checkNoStore};
