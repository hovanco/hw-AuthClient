import {Button as AntdButton} from 'antd';
import React, {FC} from 'react';
import cls from 'classnames';
import './button.less';
import {ButtonProps} from 'antd/lib/button';

interface Props extends ButtonProps {
    className?: string;
}

const BorderButton: FC<Props> = ({className, ...props}) => {
    return <AntdButton className={cls('border-btn', className)} {...props} />;
};

export {BorderButton};
