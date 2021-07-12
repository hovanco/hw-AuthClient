import { Col, Row } from 'antd';
import React, { FC, ReactNode } from 'react';
import './inner-auth.less';

interface Props {
    children: ReactNode;
    authContent: ReactNode;
    reverse?: boolean;
}

const InnerAuth: FC<Props> = ({ children, authContent, reverse }) => {
    return (
        <div className='inner-auth'>
            <Row
                className='inner-auth-wrap'
                style={{ flexDirection: reverse ? 'row-reverse' : 'row' }}
            >
                <Col className='inner-auth-form'>{children}</Col>
            </Row>
        </div>
    );
};

export default InnerAuth;
