import { MouseEventHandler } from 'react';
import './button.scss';

interface ButtonProps {
  buttonClassName: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: JSX.Element;
  iconClassName?: string;
  text?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function ButtonComponent({ buttonClassName, icon, iconClassName = '', text, onClick, type = 'button' }: ButtonProps): JSX.Element {
  const isMenuButton = (): React.ReactFragment => {
    return icon ? <span className={iconClassName}>{icon}</span> : <></>;
  };

  return (
    <>
      <button className={buttonClassName} type={type} onClick={onClick}>
        {isMenuButton()}
        {text}
      </button>
    </>
  );
}
