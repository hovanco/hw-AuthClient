import React, { FC } from 'react';
import { Result, Button } from 'antd';
import BaseLayout from '../base-layout';
import { ImageNotFound } from './image-not-found';
import { HOME_URL } from '../../constants'
import './style.less';

interface Props {}

const NotFound: FC<Props> = () => {
    return (
        <BaseLayout title='Trang web không tồn tại'>
            <Result
                icon={<ImageNotFound />} 
                extra={<Button type='primary' href={HOME_URL}>Trở về trang chủ</Button>}
            />
        </BaseLayout>
    );
};

export { NotFound };
