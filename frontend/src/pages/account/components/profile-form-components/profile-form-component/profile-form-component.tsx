import { useEffect, useState } from 'react';
import { ButtonComponent } from '../../../../../common/components/button-component/button-component';
import SelectComponent from '../../../../../common/components/select-component/select-component';
import passwordIcons from '../../../../../constants/password-icons';
import Constants from '../../../../../constants/profile-form-constants';
import { UserDetailsDTO } from '../../../../../dto/user-details';
import { ProfileFormInputComponent } from '../profile-form-input-component/profile-form-input-component';
import './profile-form.scss';

export function ProfileForm(props: any): JSX.Element {
  const [userDetails, setUserDetails] = useState<UserDetailsDTO>({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    fax: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  useEffect(() => {
    setUserDetails(props.formValues);
  }, [props.formValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, key: string): void => {
    setUserDetails({ ...userDetails, [key]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<EventTarget>): void => {
    e.preventDefault();
    console.log(userDetails);
    console.log(props);
    const { token } = JSON.parse(localStorage.getItem('current_user')!);
    props.onSubmit({ newUserDetails: userDetails, token: token });
    // props.saveUserData(userDetails);
  };

  return (
    <>
      <form className="profile-form" onSubmit={handleSubmit}>
        <ProfileFormInputComponent
          labelName="First Name*"
          inputName="firstName"
          onChange={e => handleChange(e, 'firstName')}
          defaultValue={userDetails.firstName}
        ></ProfileFormInputComponent>
        <ProfileFormInputComponent
          labelName="Middle Name"
          inputName="middleName"
          onChange={e => handleChange(e, 'middleName')}
          defaultValue={userDetails.middleName}
        ></ProfileFormInputComponent>
        <ProfileFormInputComponent
          labelName="Last Name*"
          inputName="lastName"
          onChange={e => handleChange(e, 'lastName')}
          defaultValue={userDetails.lastName}
        ></ProfileFormInputComponent>
        <ProfileFormInputComponent
          labelName="Email*"
          inputName="email"
          onChange={e => handleChange(e, 'email')}
          defaultValue={userDetails.email}
        ></ProfileFormInputComponent>
        <ProfileFormInputComponent
          labelName="Phone Number*"
          inputName="phoneNumber"
          onChange={e => handleChange(e, 'phoneNumber')}
          defaultValue={userDetails.phoneNumber}
        ></ProfileFormInputComponent>
        <ProfileFormInputComponent
          labelName="Fax"
          inputName="fax"
          onChange={e => handleChange(e, 'fax')}
          defaultValue={userDetails.fax}
        ></ProfileFormInputComponent>
        <ProfileFormInputComponent
          labelName="Address*"
          inputName="address"
          onChange={e => handleChange(e, 'address')}
          defaultValue={userDetails.address}
        ></ProfileFormInputComponent>
        <SelectComponent
          labelName="City*"
          labelClassName="form-label"
          selectClassName="user-profile-form-input"
          elements={Constants.cities}
          value={userDetails.city}
          onChange={e => handleChange(e, 'city')}
        ></SelectComponent>
        <SelectComponent
          labelName="State*"
          labelClassName="form-label"
          selectClassName="user-profile-form-input"
          elements={Constants.states}
          value={userDetails.state}
          onChange={e => handleChange(e, 'state')}
        ></SelectComponent>
        <ProfileFormInputComponent
          labelName="Zip Code*"
          inputName="zipCode"
          onChange={e => handleChange(e, 'zipCode')}
          defaultValue={userDetails.zipCode}
        ></ProfileFormInputComponent>
        <SelectComponent
          labelName="Country*"
          labelClassName="form-label"
          selectClassName="user-profile-form-input"
          elements={Constants.countries}
          value={userDetails.country}
          onChange={e => handleChange(e, 'country')}
        ></SelectComponent>
        <div></div>

        <div className="profile-form-item line">
          <hr />
        </div>

        <div className="profile-form-item change-password-title">
          <label className="change-password-label">Change Password</label>
        </div>

        <ProfileFormInputComponent
          labelName="Old Password*"
          type="password"
          icon={passwordIcons}
          iconClassName="eye-slash"
        ></ProfileFormInputComponent>
        <ProfileFormInputComponent labelName="New Password*" type="password"></ProfileFormInputComponent>
        <ProfileFormInputComponent labelName="Re-type Password*" type="password"></ProfileFormInputComponent>

        <div className="save-changes-button-container">
          <ButtonComponent buttonClassName="save-changes-button" text="Save Changes" type="submit"></ButtonComponent>
        </div>
      </form>
    </>
  );
}

export default ProfileForm;
