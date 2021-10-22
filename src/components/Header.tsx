import { ReactComponent as DiceSVG } from '../assets/header/dice.svg';
import { ReactComponent as HeartSVG } from '../assets/header/heart.svg';
import { ReactComponent as FaqSVG } from '../assets/header/faq.svg';
import { ReactComponent as GearSVG } from '../assets/header/gear.svg';
import '../styles/Header.scss';

type HeaderProps = {
  setPage: Function
}
export default function Header({setPage}: HeaderProps) {
  return (
    <header className="header">
      <div className="header__content">
      <h1 className="header__title">Guardian</h1>

      <nav className="header__nav">
        <div className="header__nav-item" onClick={() => setPage(0)}>
          <DiceSVG />
          <span className="header__nav-item__label">Breeding Calculator</span>
        </div>
        <div className="header__nav-item" onClick={() => setPage(1)}>
          <HeartSVG />
          <span className="header__nav-item__label">Matchmaking</span>
        </div>
        <div className="header__nav-item" onClick={() => setPage(2)}>
          <FaqSVG />
          <span className="header__nav-item__label">FAQ</span>
        </div>
        <div className="header__nav-item" onClick={() => {}}>
          <GearSVG />
          <span className="header__nav-item__label">Settings</span>
        </div>
      </nav>

      {/* <div className="header__settings">
        <GearSVG />
        <span className="settings__label">Settings</span>
      </div> */}
      </div>
    </header>
  );
};