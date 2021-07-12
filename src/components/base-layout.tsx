import React, {useEffect, ReactNode} from 'react';
import {Helmet} from 'react-helmet';

import {TITLE_APP} from '../constants';

interface IProps {
    title?: string;
    children: ReactNode;
}

const BaseLayout = ({title, children}: IProps) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {children}
        </>
    );
};

BaseLayout.defaultProps = {
    title: TITLE_APP,
};

export default BaseLayout;
