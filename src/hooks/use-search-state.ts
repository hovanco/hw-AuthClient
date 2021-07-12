import {useLocation} from 'react-router-dom';
import * as queryString from 'query-string';

export interface ISearchState {
    url?: string;
    location?: string;
    isLogout?: string;
    guest?: string;
    saleChannel?: string;
    isHasStore?: boolean;
}

const useSearchState = () => {
    const location = useLocation();

    const searchState: ISearchState = queryString.parse(location.search);

    return searchState;
};

export {useSearchState};
