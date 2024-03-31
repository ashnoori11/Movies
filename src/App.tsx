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
    </BrowserRouter>
  );
}

export default App;