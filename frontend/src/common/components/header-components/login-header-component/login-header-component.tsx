import logo from '../../../../assets/images/techquarter-logo-mark-outline-rgb.png';
import './login-header.scss';

export function LoginHeaderComponent(): JSX.Element {
  return (
    <>
      <img className="logo" src={logo} alt="loginHeader" />
    </>
  );
}
