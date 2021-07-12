import * as queryString from 'query-string';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { logout } from '../api';
import { getToken, getTokenLocal, IToken, removeToken } from '../api/token';
import { STORE_URL } from '../constants';
import { checkNoStore } from '../features/auth/utils';
import { ISearchState, useSearchState } from './use-search-state';

async function redirectAppPage(token: IToken, searchState: ISearchState) {
    const isNoStore = await checkNoStore(token);

    let params: any = {
        token: JSON.stringify(token),
        remember: true,
        location: isNoStore ? '/' : searchState.location,
        isHasStore: !isNoStore,
    };

    if (searchState.saleChannel) {
        params = {
            ...params,
            saleChannel: searchState.saleChannel,
        };
    }

    const search = queryString.stringify(params);

    if (isNoStore) {
        window.location.href = `${STORE_URL}save-token?${search}`;
    } else {
        window.location.href = `${searchState.url}?${search}`;
    }
}

async function handleLogout() {
    try {
        const refreshToken = getToken('refreshToken');
        if (refreshToken) {
            await logout(refreshToken);
        }
    } catch (error) {
    } finally {
        removeToken();
    }
}

async function getUrl(pathname: string): Promise<string> {
    if (pathname === '/sign-up') {
        await handleLogout();
        return '/sign-up';
    }
    return '/404';
}

const useProgress = () => {
    const history = useHistory();
    const searchState = useSearchState();
    const [loading, setLoading] = useState<boolean>(true);
    const { pathname } = history.location;

    useEffect(() => {
        async function handleProgress() {
            if (pathname === '/reset-password') {
                setLoading(false);
                return;
            }

            if (!searchState.url || !searchState.location) {
                const url = await getUrl(pathname);

                history.push(url);
                setLoading(false);

                return;
            }

            if (searchState.isLogout === 'true') {
                await handleLogout();

                if (searchState.guest === 'true') {
                    const search = queryString.stringify({
                        location: searchState.location,
                        guest: true,
                    });

                    window.location.href = `${searchState.url}?${search}`;
                }

                setLoading(false);

                return;
            }

            const accessToken = getToken('accessToken');

            if (!accessToken) {
                setLoading(false);
                return;
            }


            const token = getTokenLocal();

            if (token) {
                redirectAppPage(token, searchState);
            }

            setLoading(false);
        }

        handleProgress();
    }, []);

    return loading;
};

export { useProgress, redirectAppPage };
