import React, { FC } from 'react';
import img404 from '../../assets/icon/404.png';

interface Props {}

const ImageNotFound: FC<Props> = () => {
    return (
        <div>
            <img src={img404} alt="" />
        </div>
    );
};

export { ImageNotFound };
