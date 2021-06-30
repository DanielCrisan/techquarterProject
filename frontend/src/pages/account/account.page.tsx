import './account.scss';
import Icons from '../../assets/icons';
import { ButtonComponent } from '../../common/components/button-component/button-component';
import profile from '../../assets/images/hewhomustnotbenamed.jpg';
import cover from '../../assets/images/cover.jpg';
import { SidebarComponent } from './components/sidebar-component/sidebar-component';
import { UserProfileHeaderComponent } from '../../common/components/header-components/user-profile-header-component/user-profile-header-component';
import ProfileForm from './components/profile-form-components/profile-form-component/profile-form-component';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUserData, saveUserData, logout } from './account.actions';
import { useEffect } from 'react';

function Account(props: any): JSX.Element {
  console.log(props);

  useEffect(() => {
    if (!props.isLogged) {
      props.history.push('./login');
      localStorage.removeItem('current_user');
      console.log(props);
    }
  }, [props.isLogged]);

  useEffect(() => {
    const storedUser = localStorage.getItem('current_user');
    if (storedUser) {
      const { token = '' } = JSON.parse(storedUser);
      props.getUserData(token);
    }
  }, []);

  return (
    <>
      <div className="body">
        <div className="grid-container">
          <UserProfileHeaderComponent></UserProfileHeaderComponent>
          <SidebarComponent onLogout={props.logout}></SidebarComponent>

          <div className="profile-container">
            <div className="image-grid">
              <img className="cover" src={cover} alt="cover" />

              <div className="profile-cell">
                <img className="profile-picture" src={profile} alt="profile" />
              </div>

              <div className="profile-cell">
                <ButtonComponent buttonClassName="edit-button" icon={Icons.pen}></ButtonComponent>
              </div>
            </div>

            <ProfileForm onSubmit={props.saveUserData} formValues={props.userDetails}></ProfileForm>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state: any) => ({
  ...state.login,
  ...state.account
});

const mapDispatchToProps = (dispatch: any) => ({
  ...bindActionCreators({ getUserData, saveUserData, logout }, dispatch)
});

export const AccountPage = connect(mapStateToProps, mapDispatchToProps)(Account);
