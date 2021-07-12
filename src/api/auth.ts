import {axiosClient} from './axiosClient';

interface FormAuthDate {
    email?: string;
    password?: string;
    accessToken?: string;
}
interface IResetPassword {
    password?: string;
    token?: string;
}

async function getUser(): Promise<any> {
    const url = '/authentication/v1/users/info';

    const response = await axiosClient({
        url,
        method: 'GET',
    });

    return response;
}

async function loginWithEmail(
    data: FormAuthDate,
    service?: string,
): Promise<any> {
    const url = service
        ? `/authentication/v1/signin/${service}`
        : '/authentication/v1/signin';
    const response = await axiosClient({
        method: 'POST',
        url,
        data,
    });

    return response;
}

async function forgotPassword(data: FormAuthDate): Promise<any> {
    const url = '/authentication/v1/forgot-password';
    const response = await axiosClient({
        method: 'POST',
        url,
        data,
    });

    return response;
}

async function resetPassword(data: IResetPassword): Promise<any> {
    const url = '/authentication/v1/reset-password';
    const response = await axiosClient({
        method: 'POST',
        url,
        data,
    });

    return response;
}

async function signupWithEmail(data: FormAuthDate): Promise<void> {
    const response = await axiosClient({
        method: 'POST',
        url: '/authentication/v1/signup',
        data,
    });

    return response.data;
}

async function loginActionWithService(
    data: FormAuthDate,
    service?: any,
): Promise<any> {
    const response = await loginWithEmail(data, service);
    return response;
}

async function refreshAccessToken(refreshToken: string): Promise<any> {
    const response = await axiosClient({
        method: 'POST',
        url: 'authentication/v1/auth/refresh-token',
        data: {
            refreshToken,
        },
    });

    return response;
}

async function existingRefreshToken(refreshToken: string): Promise<any> {
    const response = await axiosClient({
        method: 'POST',
        url: '/authentication/v1/auth/existing-refresh-token',
        data: {
            refreshToken,
        },
    });

    return response
}

async function logout(refreshToken: string): Promise<any> {
    const response = await axiosClient({
        method: 'POST',
        url: '/authentication/v1/auth/logout',
        data: {
            refreshToken,
        },
    });

    return response.data;
}

export {
    getUser,
    loginWithEmail,
    signupWithEmail,
    loginActionWithService,
    forgotPassword,
    resetPassword,
    refreshAccessToken,
    existingRefreshToken,
    logout
};
