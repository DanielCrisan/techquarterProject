import logo from '../../../../assets/images/techquarter-logo-outline-rgb.png';
import './user-profile-header.scss';

export function UserProfileHeaderComponent(): JSX.Element {
  return (
    <>
      <div className="header-container">
        <img className="header-icon" src={logo} alt="header" />
      </div>
    </>
  );
}
