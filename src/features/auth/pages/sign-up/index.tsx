import { Button, Form, Input, message, Tooltip, Divider } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useForm } from 'antd/lib/form/Form';
import { pick, get } from 'lodash';
import * as queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginWithEmail, signupWithEmail } from '../../../../api';
import { IToken, removeToken, setToken } from '../../../../api/token';
import AuthLayout from '../../../../components/auth-layout';
import { HOME_URL, STORE_URL } from '../../../../constants';
import FormHeader from '../../components/form-header/FormHeader';
import InnerAuth from '../../components/inner-auth/InnerAuth';
import { changeFormField } from '../../utils';
import FormBottom from '../../components/form-bottom/FormBottom';
import './style.less';

const title = 'Đăng ký';
const subTitle = 'Bạn đã có tài khoản?';
const leftTitle = 'One of us?';
const acceptTitle = 'Bằng cách đăng ký, tôi đồng ý đã đọc và chấp nhận';
const termUse = 'Điều khoản sử dụng';
const privacyPolicy = 'Chính sách riêng tư';
const loginTitle = 'Đăng nhập';
const passwordWarning =
    'Mật khẩu phải chứa tối thiểu 6 ký tự. Phân biệt viết thường và viết hoa.';
const contentBottom = 'Hoặc đăng ký với';
interface FormData {
    name?: string;
    email?: string;
    password?: string;
    passwordConfirm?: string;
}

const getMessageError = (error: Error): string => {
    const messageText = get(error, 'response.data.status');
    if (messageText === 409) {
        return 'Tài khoản đã tồn tại';
    }

    return 'Đăng ký không thành công.';
};

function SignUp(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();
    const [form] = useForm();
    const lastLocation = {
        pathname: '/',
    };

    const search = queryString.stringify({
        url: `${STORE_URL}save-token`,
        location: JSON.stringify(lastLocation),
        isLogout: true,
    });

    const searchState: {
        url?: string;
        location?: string;
        isLogout?: string;
        saleChannel?: string;
        isHasStore?: boolean;
    } = queryString.parse(history.location.search);

    const redirectAppPage = (token: IToken) => {
        let objectSearch: any = {
            token: JSON.stringify(token),
            remember: true,
            location: '/',
            isHasStore: false,
        };

        if (searchState.saleChannel) {
            objectSearch = {
                ...objectSearch,
                saleChannel: searchState.saleChannel,
            };
        }

        const search = queryString.stringify(objectSearch);

        window.location.href = `${STORE_URL}save-token?${search}`;
    };

    useEffect(() => {
        if (!searchState.url || !searchState.location) {
            history.push('/sign-up');
        } else {
            localStorage.removeItem('shortLiveToken');
            removeToken();
        }
    }, []);

    const onFinish = async (values: FormData): Promise<void> => {
        setLoading(true);

        const data = pick(values, 'name', 'email', 'password');

        signupWithEmail(data)
            .then(async () => {
                const response: any = await loginWithEmail({
                    ...pick(data, ['email', 'password']),
                });
                if (!response.accessToken) {
                    message.error('Xảy ra lỗi, vui lòng kiểm tra lại');
                    return;
                }
                setToken({ token: response, remember: true });
                redirectAppPage(response);
            })
            .catch(error => {
                const messageError = getMessageError(error);

                message.error(messageError);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            <AuthLayout title={title}>
                <InnerAuth
                    authContent={
                        <div>
                            <p className="auth-content-title">{leftTitle}</p>
                            <Button
                                htmlType="submit"
                                block
                                className="auth-content-button"
                                onClick={() => {
                                    history.push(
                                        `/login${history.location.search}`,
                                    );
                                }}
                            >
                                {loginTitle}
                            </Button>
                        </div>
                    }
                >
                    <div>
                        <FormHeader title={title} />
                        <Form
                            style={{ marginTop: '-25px' }}
                            onFinish={onFinish}
                            layout="vertical"
                            className="form"
                            form={form}
                        >
                            <div className="form-content">
                                <p className="form-content-title">
                                    {subTitle}{' '}
                                    <a href={`/login?${search}`}>
                                        <span
                                            className="login-title "
                                            style={{ fontWeight: 400 }}
                                        >
                                            {loginTitle}
                                        </span>
                                    </a>
                                </p>
                                <Form.Item
                                    name="email"
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
                                        size="large"
                                        placeholder="Email"
                                        onChange={(
                                            event: React.ChangeEvent<HTMLInputElement>,
                                        ) =>
                                            changeFormField(
                                                form,
                                                'email',
                                                event.target.value,
                                            )
                                        }
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Tên',
                                        },
                                    ]}
                                >
                                    <Input
                                        size="large"
                                        placeholder="Họ tên"
                                        onChange={(
                                            event: React.ChangeEvent<HTMLInputElement>,
                                        ) =>
                                            changeFormField(
                                                form,
                                                'name',
                                                event.target.value,
                                            )
                                        }
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    required
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Mật khẩu',
                                        },
                                        {
                                            min: 6,
                                            message:
                                                'Vui lòng nhập mật khẩu chứa tối thiểu 6 ký tự',
                                        },
                                    ]}
                                >
                                    <div className="format-input-password-sign-up">
                                        <Input.Password
                                            size="large"
                                            type="password"
                                            placeholder="Mật khẩu"
                                            addonAfter={
                                                <Tooltip
                                                    title={passwordWarning}
                                                    color={'#4353ff'}
                                                >
                                                    <InfoCircleOutlined
                                                        style={{
                                                            color: '#4353ff',
                                                        }}
                                                    />
                                                </Tooltip>
                                            }
                                        />
                                    </div>
                                </Form.Item>
                                <Form.Item
                                    name="passwordConfirm"
                                    required
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng xác nhận Mật khẩu',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(rule, value) {
                                                if (
                                                    !value ||
                                                    getFieldValue(
                                                        'password',
                                                    ) === value
                                                ) {
                                                    return Promise.resolve();
                                                }
                                                // eslint-disable-next-line prefer-promise-reject-errors
                                                return Promise.reject(
                                                    'Mật khẩu không trùng khớp',
                                                );
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        size="large"
                                        type="password"
                                        placeholder="Xác nhận mật khẩu"
                                    />
                                </Form.Item>
                                <div className="form-content-pivacy">
                                    {acceptTitle}{' '}
                                    <a href={`${HOME_URL}dieu-khoan-su-dung`} target="_blank" rel="noreferrer">
                                        <span>{termUse}</span>
                                    </a>{' '}
                                    và{' '}
                                    <a href={`${HOME_URL}chinh-sach-bao-mat`} target="_blank" rel="noreferrer">
                                        <span>{privacyPolicy}</span>
                                    </a>
                                </div>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="button-sign-up"
                                    loading={loading}
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
}

export default SignUp;
