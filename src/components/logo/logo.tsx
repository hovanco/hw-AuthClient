import React, {FC} from 'react';
import logo from './logo.svg';
import logo1 from './logo1.svg';
import './style.less';

interface Props {
    size?: number;
    isDashboard?: boolean;
}

const Logo: FC<Props> = ({size = 60, isDashboard = false}) => {
    const src = isDashboard ? logo1 : logo;
    return (
        <div className="logo">
            <img src={src} alt="" style={{height: size}} />
        </div>
    );
};

export {Logo};
