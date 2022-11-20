import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom';
import { createSignalRContext } from 'react-signalr';
import { AuthLayout } from '../auth/view/AuthLayout';
import { MainLayout } from '../main/view/MainLayout';
import styles from "./App.module.css"

const SignalRContext = createSignalRContext();

function App() {

  return (
    <div className={styles.content}>
      <Switch>
        <Redirect exact from="/" to="/auth"/>
        <Route exact path="/auth" >
          <AuthLayout />
        </Route>
        <SignalRContext.Provider
          url={"https://example/hub"}
        >
          <Route path="/main" >
            <MainLayout />
          </Route>
        </SignalRContext.Provider>
      </Switch>
    </div>
  );
}

export default App;
