import { Button, Divider, Form, Input, message } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { Store } from 'antd/lib/form/interface';
import { get } from 'lodash';
import * as queryString from 'query-string';
import React, { FC, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { loginWithEmail } from '../../../../api';
import { setToken } from '../../../../api/token';
import { Loading } from '../../../../components';
import AuthLayout from '../../../../components/auth-layout';
import { STORE_URL } from '../../../../constants';
import { redirectAppPage, useProgress, useSearchState } from '../../../../hooks';
import FormBottom from '../../components/form-bottom/FormBottom';
import FormHeader from '../../components/form-header/FormHeader';
import InnerAuth from '../../components/inner-auth/InnerAuth';
import { changeFormField, checkNoStore } from '../../utils';
import { errorCommon } from '../forgot-password';
import './style.less';

const title = 'Đăng nhập';
const subTitle = 'Bạn chưa có tài khoản?';
const forgotPasswordTitle = 'Quên mật khẩu?';
const leftTitle = 'Xin chào!';
const leftDescription = 'Bạn chưa có tài khoản? đăng ký ngay để trải nghiệm sản phẩm của chúng tôi';
const signUpTitle = 'Đăng ký';
const errorWrongEmailPassword = 'Email hoặc mật khẩu không đúng, vui lòng kiểm tra lại';
const contentBottom = 'Hoặc đăng ký với';

const Login: FC = () => {
    const history = useHistory();
    const loading = useProgress();
    const [form] = useForm();
    const searchState = useSearchState();

    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

    const handleSubmit = async (value: Store): Promise<void> => {
        try {
            setLoadingSubmit(true);
            const response = await loginWithEmail(value);

            const isNoStore = checkNoStore(response);

            let params: any = {
                token: JSON.stringify(response),
                remember: true,
                location: '/',
                isHasStore: !isNoStore,
            };

            if (!response.accessToken) {
                message.error(errorCommon);
                return;
            }

            setToken({ token: response, remember: true });

            const search = queryString.stringify(params);

            if (Object.keys(searchState).length === 0) {
                window.location.href = `${STORE_URL}save-token?${search}`;
            } else {
                redirectAppPage(response, searchState);
            }
        } catch (error) {
            const errorMessage =
                get(error, 'response.data.message') === 'EMAIL_OR_PASSWORD_INCORRECT'
                    ? errorWrongEmailPassword
                    : errorCommon;
            message.error(errorMessage);
        } finally {
            setLoadingSubmit(false);
        }
    };

    const goToSignUp = () => {
        history.push(`/sign-up${history.location.search}`);
    };

    if (loading) {
        return <Loading full />;
    }

    return (
        <>
            <AuthLayout title={title}>
                <InnerAuth
                    reverse
                    authContent={
                        <div>
                            <p className='auth-content-title'>{leftTitle}</p>
                            <p className='auth-content-des'>{leftDescription}</p>

                            <Button
                                htmlType='submit'
                                block
                                className='auth-content-button'
                                onClick={goToSignUp}
                            >
                                {signUpTitle}
                            </Button>
                        </div>
                    }
                >
                    <div>
                        <FormHeader title={title} />
                        <Form
                            onFinish={handleSubmit}
                            layout='vertical'
                            className='form'
                            form={form}
                        >
                            <div className='form-content'>
                                <p className='form-content-title-sign-in'>
                                    {subTitle}{' '}
                                    <a href='/sign-up'>
                                        <span className='login-title '>{signUpTitle}</span>
                                    </a>
                                </p>
                                <Form.Item
                                    name='email'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Email',
                                        },
                                        {
                                            type: 'email',
                                            message: 'Email không hợp lệ',
                                        },
                                    ]}
                                >
                                    <Input
                                        size='large'
                                        placeholder='Email'
                                        className='input-auth'
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                            changeFormField(form, 'email', event.target.value)
                                        }
                                    />
                                </Form.Item>
                                <Form.Item
                                    style={{ marginBottom: 'unset' }}
                                    name='password'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng Nhập mật khẩu',
                                        },
                                    ]}
                                >
                                    <Input.Password
                                        size='large'
                                        type='password'
                                        placeholder='Mật khẩu'
                                        className='input-auth'
                                    />
                                </Form.Item>
                                <div>
                                    <Link
                                        to={`/forgot-password${history.location.search}`}
                                        className='forgot-pass'
                                    >
                                        {forgotPasswordTitle}
                                    </Link>
                                </div>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    className='button-login'
                                    loading={loadingSubmit}
                                >
                                    {title}
                                </Button>
                                <Divider />
                                <FormBottom title={contentBottom} />
                            </div>
                        </Form>
                    </div>
                </InnerAuth>
            </AuthLayout>
        </>
    );
};

export default Login;
