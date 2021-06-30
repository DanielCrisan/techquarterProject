import { MouseEventHandler } from 'react';
import Icons from '../../../../assets/icons';
import { ButtonComponent } from '../../../../common/components/button-component/button-component';
import './sidebar.scss';

interface SidebarProps {
  onLogout: MouseEventHandler<HTMLButtonElement>;
}

export function SidebarComponent({onLogout}: SidebarProps): JSX.Element {
  return (
    <>
      <div className="sidebar-container">
        <div className="sidebar-inner-container">
          <ButtonComponent buttonClassName="menu-button" icon={Icons.home} iconClassName="button-icon" text="Dashboard"></ButtonComponent>
          <ButtonComponent
            buttonClassName="menu-button"
            icon={Icons.user}
            iconClassName="button-icon"
            text="User Profile"
          ></ButtonComponent>
          <ButtonComponent
            buttonClassName="menu-button"
            icon={Icons.folder}
            iconClassName="button-icon"
            text="Employee Files"
          ></ButtonComponent>
          <ButtonComponent
            buttonClassName="menu-button"
            icon={Icons.file}
            iconClassName="button-icon"
            text="Entity Files"
          ></ButtonComponent>
          <ButtonComponent
            buttonClassName="menu-button"
            icon={Icons.chart_pie}
            iconClassName="button-icon"
            text="Risk Assessment"
          ></ButtonComponent>
          <ButtonComponent
            buttonClassName="menu-button"
            icon={Icons.flag}
            iconClassName="button-icon"
            text="Latest Flagships"
          ></ButtonComponent>
          <ButtonComponent
            buttonClassName="menu-button logout-button"
            icon={Icons.power_off}
            iconClassName="button-icon"
            text="Logout"
            onClick={onLogout}
          ></ButtonComponent>
        </div>
      </div>
    </>
  );
}
