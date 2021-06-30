import { ChangeEventHandler, useState } from 'react';
import './input.scss';

interface InputProps {
  labelName?: string;
  labelClassName?: string;
  inputName?: string;
  inputClassName?: string;
  type?: string;
  icon?: JSX.Element[];
  iconClassName?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  defaultValue?: string;
}

export function InputComponent({
  labelName,
  labelClassName = '',
  inputName = '',
  inputClassName = '',
  type = 'text',
  icon,
  iconClassName = '',
  onChange,
  defaultValue = ''
}: InputProps): JSX.Element {
  const [isVisible, setIsVisible] = useState(false);

  const hasPasswordIcon = (): React.ReactFragment => {
    return icon ? (
      <button className={iconClassName} type="button" onClick={() => setIsVisible(!isVisible)}>
        {icon[isVisible ? 1 : 0]}
      </button>
    ) : (
      <></>
    );
  };

  const getInputType = (): string => {
    if (type === 'password') {
      return isVisible ? 'text' : 'password';
    }
    return 'text';
  };

  return (
    <>
      <label className={labelClassName}>{labelName}</label>
      <input name={inputName} className={inputClassName} type={getInputType()} onChange={onChange!} defaultValue={defaultValue}></input>
      {hasPasswordIcon()}
    </>
  );
}
