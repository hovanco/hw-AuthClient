import jwtDecode from 'jwt-decode';
import {get} from 'lodash';

export interface IToken {
    accessToken: string;
    refreshToken: string;
    expiredIn: number;
    type: string;
}

const setToken = ({
    token,
    remember = true,
}: {
    token?: IToken;
    remember?: boolean;
}): void => {
    if (!token) {
        return;
    }

    const tokenString = JSON.stringify(token);

    if (remember) {
        return localStorage.setItem('token', tokenString);
    }

    return sessionStorage.setItem('token', tokenString);
};

const removeToken = (): void => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
};

const getTokenLocal = (): IToken | null => {
    const tokenString =
        localStorage.getItem('token') || sessionStorage.getItem('token');

    if (!tokenString) {
        return null;
    }

    const token: IToken = JSON.parse(tokenString);

    return token;
};

const getToken = (type?: 'accessToken' | 'refreshToken'): string | null => {
    const tokenLocal = getTokenLocal();

    if (!tokenLocal) {
        return null;
    }

    return get(tokenLocal, type || 'accessToken');
};

const checkToken = (token: string): boolean => {
    const tokenDecode = jwtDecode(token);
    const expToken = get(tokenDecode, 'exp');

    if (!expToken) {
        return false;
    }

    const dateNow = Math.floor(Date.now() / 1000);

    return expToken - dateNow > 0;
};

export {setToken, getTokenLocal, getToken, removeToken, checkToken};
