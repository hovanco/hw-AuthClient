import { HOME_URL } from '../../../../constants';
import LogoInsa from '../../../../assets/icon/logoInsa.png';
import '../../../../assets/style/style-header.less';

const HeaderPage = () => {
    return (
        <div className="header-page">
            <a rel="noopener noreferrer" href={`${HOME_URL}`}>
                <img src={LogoInsa} alt="Insa" />
            </a>
        </div>
    );
};

export default HeaderPage;
