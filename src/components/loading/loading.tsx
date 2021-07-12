import {Spin} from 'antd';
import React, {FC} from 'react';
import cls from 'classnames';
import './loading.less';

interface Props {
    full?: boolean;
}

const Loading: FC<Props> = ({full = false}) => {
    return (
        <div className={cls('loading', {full})}>
            <Spin />
        </div>
    );
};

export {Loading};
