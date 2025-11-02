import * as React from 'react';
import { Link } from 'react-router-dom';
import { ComponentsState, ErrorComponentsState, Menu, Notifications, SwitchErrorInfo, MenuItemProps } from 'piral';

const MenuItem: React.FC<MenuItemProps> = ({ children }) => <li className="app-shell__menu-item">{children}</li>;

export const errors: Partial<ErrorComponentsState> = {
  not_found: () => (
    <div>
      <p className="error">Could not find the requested page. Are you sure it exists?</p>
      <p>
        Go back <Link to="/">to the dashboard</Link>.
      </p>
    </div>
  ),
};

export const layout: Partial<ComponentsState> = {
  ErrorInfo: (props) => (
    <div>
      <h1>Error</h1>
      <SwitchErrorInfo {...props} />
    </div>
  ),
  Layout: ({ children }) => (
    <div className="app-shell">
      <Notifications />
      <Menu type="general" />
      <main className="app-shell__content">{children}</main>
    </div>
  ),
  MenuContainer: ({ children }) => {
    return (
      <nav className="app-shell__menu" aria-label="Primary navigation">
        <ul className="app-shell__menu-list">
          {children}
        </ul>
      </nav>
    );
  },
  MenuItem,
  NotificationsHost: ({ children }) => <div className="notifications">{children}</div>,
  NotificationsToast: ({ options, onClose, children }) => (
    <div className={`notification-toast ${options.type}`}>
      <div className="notification-toast-details">
        {options.title && <div className="notification-toast-title">{options.title}</div>}
        <div className="notification-toast-description">{children}</div>
      </div>
      <div className="notification-toast-close" onClick={onClose} />
    </div>
  ),
};
