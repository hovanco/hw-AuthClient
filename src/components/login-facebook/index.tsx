import React, { FC, memo } from 'react';
import FacebookLogin from 'react-facebook-login';
import { FacebookIcon } from '../../assets/icon';
import { FACEBOOK_APP_ID, FACEBOOK_SCOPE } from '../../constants';
import './style.less';

interface Props {
    loginFacebook: (data: any) => void;
}

const LoginFacebookBtn: FC<Props> = ({ loginFacebook }): JSX.Element => {
    return (
        <FacebookLogin
            appId={FACEBOOK_APP_ID as string}
            icon={<FacebookIcon />}
            size="small"
            textButton={'Facebook'}
            autoLoad={false}
            fields="name,email,picture"
            scope={FACEBOOK_SCOPE}
            callback={loginFacebook}
            cssClass="loginFacebook ant-btn ant-btn-primary"
            version="9.0"
        />
    );
};

export default memo(LoginFacebookBtn);
