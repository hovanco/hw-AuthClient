import {axiosClient} from './axiosClient';

export const connectFanpageApi = async ({
    payload,
    storeId,
    token,
}: {
    payload: {shortLiveToken: string};
    storeId: string;
    token: string;
}): Promise<any> => {
    const url = `/social-network/v1/stores/${storeId}/facebook-pages/link`;

    return axiosClient({
        url,
        method: 'POST',
        data: payload,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};
