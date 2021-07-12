import React, { FC } from 'react';
import './form-header.less';

interface Props {
    title: string;
    showSocialLogin?: boolean;
}

const FormHeader: FC<Props> = ({ title, showSocialLogin = true }) => {
    return (
        <div className='form-header'>
            <p className='page-title'>{title}</p>
        </div>
    );
};

export default FormHeader;
