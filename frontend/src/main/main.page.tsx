import { Redirect, Route, Switch } from 'react-router-dom';
import { AccountPage } from '../pages/account/account.page';
import { LoginPage } from '../pages/login/login.page';

export function MainPage(): JSX.Element {
  return (
    <>
      <Switch>
        <Route exact path={'/login'} component={LoginPage}></Route>
        <Route exact path={'/account'} component={AccountPage}></Route>
        <Route path={'/'}>
          <Redirect to={'/login'} />
        </Route>
      </Switch>
    </>
  );
}
