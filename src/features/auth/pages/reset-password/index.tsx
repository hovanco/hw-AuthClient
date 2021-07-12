import { Button, Form, Input, message, Tooltip } from 'antd';
import { InfoCircleOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { Store } from 'antd/lib/form/interface';
import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as queryString from 'query-string';
import { get } from 'lodash';

import { resetPassword } from '../../../../api';
import { STORE_URL } from '../../../../constants';
import AuthLayout from '../../../../components/auth-layout';
import FormHeader from '../../components/form-header/FormHeader';
import InnerAuth from '../../components/inner-auth/InnerAuth';
import { errorCommon } from '../forgot-password';
import './style.less';

const title = 'Đặt lại mật khẩu';
const subTitle = '';
const subTitleSuccess = 'Mật khẩu của bạn đã được thay đổi thành công';
const loginTitle = 'Đăng nhập';
const errorExpireToken = 'Token của bạn đã hết hạn, vui lòng kiểm tra lại';
const errorPasswordNotModified = 'Mật khẩu mới không được trùng mật khẩu cũ';
const passwordWarning = 'Mật khẩu phải chứa tối thiểu 6 ký tự. Phân biệt viết thường và viết hoa.';

enum errMsg {
    TOKEN_EXPIRED = 'TOKEN_EXPIRED',
    PASSWORD_NOT_MODIFIED = 'PASSWORD_NOT_MODIFIED'
}

export interface ResetPasswordProps {}

const ResetPassword: FC<ResetPasswordProps> = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const history = useHistory();

    const searchState: {
        token?: string;
    } = queryString.parse(history.location.search);

    const onClickLogin = () => {
        const search = queryString.stringify({
            url: `${STORE_URL}save-token`,
            location: JSON.stringify({
                pathname: '/',
            }),
            isLogout: true,
        });
        history.push(`/login?${search}`);
    };

    useEffect(() => {
        if (!searchState.token) {
            history.push('/reset-password');
        }
    }, []);

    const handleSubmit = async (value: Store): Promise<void> => {
        try {
            setLoading(true);
            const response = await resetPassword({
                password: value.password,
                token: searchState.token,
            });
            if (response?.status !== 200) {
                message.error(errorCommon);
                return;
            }
            setSuccess(true);
        } catch (error) {
            const errorMessage = get(error, 'response.data.message');
            
            switch (errorMessage) {
                case errMsg.TOKEN_EXPIRED:
                    message.error(errorExpireToken);
                    break;
                case errMsg.PASSWORD_NOT_MODIFIED:
                    message.error(errorPasswordNotModified);
                    break;
                default:
                    message.error(errorCommon);
                    break;
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title={title}>
            <InnerAuth
                authContent={
                    <div>
                        <Button
                            htmlType='submit'
                            block
                            className='auth-content-button'
                            onClick={onClickLogin}
                        >
                            {loginTitle}
                        </Button>
                    </div>
                }
            >
                <div>
                    <FormHeader title={title} showSocialLogin={false} />

                    <Form onFinish={handleSubmit} layout='vertical' className='form'>
                        <div className='form-content'>
                            {success ? (
                                <>
                                    <p className='form-content-title'>{subTitleSuccess}</p>
                                    <Button
                                        block
                                        className='auth-content-button'
                                        type='primary'
                                        onClick={onClickLogin}
                                    >
                                        {loginTitle}
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <p className='form-content-title'>{subTitle}</p>

                                    <Form.Item
                                        name='password'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nhập mật khẩu',
                                            },
                                        ]}
                                    >
                                        <Input
                                            type='password'
                                            placeholder='Mật khẩu mới'
                                            className='input-auth'
                                            suffix={
                                                <>
                                                    <EyeInvisibleOutlined className='icon-eye-password ' />
                                                    <Tooltip
                                                        title={passwordWarning}
                                                        color={'#4353ff'}
                                                    >
                                                        <InfoCircleOutlined
                                                            style={{ color: '#4353ff' }}
                                                        />
                                                    </Tooltip>
                                                </>
                                            }
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name='confirm'
                                        dependencies={['password']}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Nhập mật khẩu',
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (
                                                        !value ||
                                                        getFieldValue('password') === value
                                                    ) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(
                                                        new Error(
                                                            'Hai mật khẩu bạn đã nhập không giống nhau!',
                                                        ),
                                                    );
                                                },
                                            }),
                                        ]}
                                    >
                                        <Input.Password
                                            type='password'
                                            placeholder='Xác nhận mật khẩu mới'
                                            className='input-auth'
                                        />
                                    </Form.Item>

                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        className='form-button'
                                        loading={loading}
                                    >
                                        {title}
                                    </Button>
                                </>
                            )}
                        </div>
                    </Form>
                </div>
            </InnerAuth>
        </AuthLayout>
    );
};
export default ResetPassword;
