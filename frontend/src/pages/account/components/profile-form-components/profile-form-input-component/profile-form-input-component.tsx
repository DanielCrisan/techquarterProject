import { ChangeEventHandler } from 'react';
import { InputComponent } from '../../../../../common/components/input-component/input-component';
import './profile-form-input.scss';

interface ItemProps {
  labelName: string;
  inputName?: string;
  type?: string;
  icon?: JSX.Element[];
  iconClassName?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  defaultValue?: string;
}

export function ProfileFormInputComponent({
  labelName,
  inputName = '',
  type = 'text',
  icon,
  iconClassName = '',
  onChange,
  defaultValue = ''
}: ItemProps): JSX.Element {
  return (
    <>
      <div className="profile-form-item">
        <InputComponent
          labelName={labelName}
          labelClassName="form-label"
          inputName={inputName}
          inputClassName="user-profile-form-input"
          type={type}
          icon={icon!}
          iconClassName={iconClassName}
          onChange={onChange!}
          defaultValue={defaultValue}
        ></InputComponent>
      </div>
    </>
  );
}
