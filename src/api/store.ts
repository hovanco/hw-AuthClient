import {axiosClient} from './axiosClient';

const getStore = async (token: string): Promise<any> => {
    const response = await axiosClient({
        method: 'GET',
        url: '/store/v1/stores',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response;
};

export {getStore};
