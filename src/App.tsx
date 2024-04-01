import './App.css';
import Menu from './Menu';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './route-config';
import configureValidation from './Validations';

configureValidation();

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <div className="container">
        <Switch>
          {
            routes.map(route =>
              <Route key={route.path} path={route.path} exact={route.exact} component={route.component} />
            )}
        </Switch>
      </div>
      <footer className="bd-footer py-5 mt-5 bg-light">
        <div className="container">
          The Movies {new Date().getFullYear().toString()}
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;