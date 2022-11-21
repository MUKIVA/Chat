import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthLayout } from '../auth/view/AuthLayout';
import { MainLayout } from '../main/view/MainLayout';
import styles from "./App.module.css"

function App() {

  return (
    <div className={styles.content}>
      <Switch>
        <Redirect exact from="/" to="/auth"/>
        <Route exact path="/auth" >
          <AuthLayout />
        </Route>
        <Route path="/main" >
          <MainLayout />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
