import { Button, Form, Input, message } from 'antd';
import { Store } from 'antd/lib/form/interface';
import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { get } from 'lodash';
import { forgotPassword } from '../../../../api';
import AuthLayout from '../../../../components/auth-layout';
import FormHeader from '../../components/form-header/FormHeader';
import InnerAuth from '../../components/inner-auth/InnerAuth';
import './style.less';

const title = 'Quên mật khẩu';
const subTitle = 'Sử dụng địa chỉ email của bạn';
const leftTitle = 'One of us?';
const leftDescription =
    'Lorem Ipsum is simply dummy text of the  printing and typesetting industry';
const loginTitle = 'Đăng nhập';
const subTitleSend = 'Chúng tôi vừa gửi cho bạn một email';
const subTitleInstruction =
    'Vui lòng làm theo hướng dẫn trong email để truy cập tài khoản của bạn.';
export const errorCommon = 'Xảy ra lỗi, vui lòng kiểm tra lại';
const errorExistRequest = 'Yêu cầu đặt lại mật khẩu đã tồn tại, vui lòng kiểm tra lại';
const errorValidEmail = 'Vui lòng nhập đúng định dạng email!';

export interface ForgotPasswordProps {}

const ForgotPassword: FC<ForgotPasswordProps> = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const history = useHistory();

    useEffect(() => {
        localStorage.removeItem('shortLiveToken');
    }, []);

    const handleSubmit = async (value: Store): Promise<void> => {
        try {
            setLoading(true);

            const response = await forgotPassword(value);
            if (response?.status !== 200) {
                message.error(errorCommon);
                return;
            }
            setSuccess(true);
        } catch (error) {
            const errorMessage =
                get(error, 'response.data.message') === 'RESET_REQUEST_ALREADY_EXISTS'
                    ? errorExistRequest
                    : errorCommon;
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title={title}>
            <InnerAuth
                authContent={
                    <div>
                        <p className='auth-content-title'>{leftTitle}</p>
                        <p className='auth-content-des'>{leftDescription}</p>
                        <Button
                            htmlType='submit'
                            block
                            className='auth-content-button'
                            onClick={() => {
                                history.push(`/login${history.location.search}`);
                            }}
                        >
                            {loginTitle}
                        </Button>
                    </div>
                }
            >
                <div>
                    <FormHeader title={title} />

                    <Form onFinish={handleSubmit} layout='vertical' className='form'>
                        <div className='form-content'>
                            {success ? (
                                <>
                                    <p className='form-content-title'>{subTitleSend}</p>
                                    <p className='form-content-title'>{subTitleInstruction}</p>
                                </>
                            ) : (
                                <>
                                    <p className='form-content-title'>{subTitle}</p>

                                    <Form.Item
                                        name='email'
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập Email',
                                            },
                                            {
                                                type: 'email',
                                                message: errorValidEmail,
                                            },
                                        ]}
                                    >
                                        <Input placeholder='Email' className='input-auth' />
                                    </Form.Item>

                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        className='button-forget-password '
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
export default ForgotPassword;
