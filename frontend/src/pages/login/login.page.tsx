import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import './login.scss';
import { FooterComponent } from '../../common/components/footer-component/footer-component';
import { LoginHeaderComponent } from '../../common/components/header-components/login-header-component/login-header-component';
import { InputComponent } from '../../common/components/input-component/input-component';
import illustration from '../../assets/images/illustration.png';
import { ButtonComponent } from '../../common/components/button-component/button-component';
import passwordIcons from '../../constants/password-icons';
import { UserCredentialsDTO } from '../../dto/user-credentials';
import { login } from './login.actions';

function Login(props: any): JSX.Element {
  console.log(props);

  useEffect(() => {
    if (props.isLogged) {
      console.log('te duc pe account!');
      props.history.push('./account');
      console.log(props);
    }
  }, [props.isLogged]);

  const [userCredentials, setUserCredentials] = useState<UserCredentialsDTO>({
    username: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, key: string): void => {
    setUserCredentials({ ...userCredentials, [key]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    props.login(userCredentials);
  };

  return (
    <>
      <div className="body">
        <div>
          <LoginHeaderComponent></LoginHeaderComponent>
        </div>

        <div className="g-container">
          <div className="g-item">
            <div className="inner-container">
              <div className="title">
                <div>
                  <span className="title-colored">Unlock New</span>
                </div>
                <span className="title-colored">Unique Challenges</span>
              </div>

              <span className="dummy-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, in maximus tempor orci et tincidunt.
              </span>

              <form onSubmit={handleSubmit}>
                <InputComponent
                  labelName="Username*"
                  labelClassName="login-form-label"
                  inputClassName="login-form-input"
                  onChange={e => handleChange(e, 'username')}
                ></InputComponent>
                <InputComponent
                  labelName="Password*"
                  labelClassName="login-form-label"
                  inputClassName="login-form-input"
                  type="password"
                  icon={passwordIcons}
                  iconClassName="eye-slash"
                  onChange={e => handleChange(e, 'password')}
                ></InputComponent>
                <div>
                  <a className="forgot-pass" href="https://www.lipsum.com/">
                    Forgot Password?
                  </a>
                </div>
                <ButtonComponent buttonClassName="login-button" text="Login to Paradise" type="submit"></ButtonComponent>
              </form>
            </div>
          </div>

          <div className="g-item">
            <img className="illustration" src={illustration} alt="illustration" />
          </div>
        </div>

        <FooterComponent></FooterComponent>
      </div>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  ...state.login,
  ...state.account
});

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators({ login }, dispatch)
});

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(Login);
