import React, {FC, ReactNode} from 'react';
import BaseLayout from './base-layout';
import './auth-layout.less';

interface Props {
    children: ReactNode;
    title?: string;
}

const AuthLayout: FC<Props> = ({children, title}) => {
    return (
        <BaseLayout title={title}>
            <div className="auth-layout">{children}</div>
        </BaseLayout>
    );
};

export default AuthLayout;
