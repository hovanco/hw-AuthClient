import { GooglePlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { FC, memo } from 'react';
import { useGoogleLogin } from 'react-google-login';
import { GOOGLE_APP_ID } from '../../constants';
import './style.less';

interface Props {
    style?: {};
    loginGoogle: (arg: any) => void;
}

const LoginGoogleBtn: FC<Props> = ({ style, loginGoogle }): JSX.Element => {
    // const { signIn, loaded } = useGoogleLogin({
    const { signIn } = useGoogleLogin({
        clientId: GOOGLE_APP_ID as string,
        onSuccess: loginGoogle,
        onFailure: () => {},
    });

    return (
        <Button
            type='primary'
            danger
            icon={<GooglePlusOutlined />}
            onClick={signIn}
            style={{ ...style }}
            className='loginGoogle'
        >
            <span style={{ backgroundColor: 'white', color: '#545454' }}>Google</span>
        </Button>
    );
};

export default memo(LoginGoogleBtn);
