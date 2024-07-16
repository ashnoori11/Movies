import './App.css';
import Menu from './Menu';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './route-config';
import configureValidation from './Validations';
import { useEffect, useState } from 'react';
import { claim } from './auth/auth.models';
import AuthenticationContext from './auth/AuthenticationContext';
import { RoleHelper } from './helpers/RoleHelper';
import { getClaims } from './auth/handleJwt';

configureValidation();

function App() {

  const [claims, setClaims] = useState<claim[]>([]);

  useEffect(() => {
    setClaims(getClaims());
  }, [])


  const isAdmin = () => {
    return claims
      .findIndex(claim => claim.name === 'role' && claim.value === RoleHelper.getAdminRole()) > -1;
  }

  return (
    <BrowserRouter>
      <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
        <Menu />
        <div className="container">
          <Switch>
            {
              routes.map(route =>
                // <Route key={route.path} path={route.path} exact={route.exact} component={route.component} />
                <Route key={route.path} path={route.path} exact={route.exact}>
                  {route.isAdmin && !isAdmin() ? <>You are not allowed to see this page</> : <route.component />}
                </Route>
              )}
          </Switch>
        </div>
        <footer className="bd-footer py-5 mt-5 bg-light">
          <div className="container">
            The Movies {new Date().getFullYear().toString()}
          </div>
        </footer>
      </AuthenticationContext.Provider>
    </BrowserRouter>
  );
}

export default App;