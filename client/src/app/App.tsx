import React from 'react'
import { Route } from 'react-router-dom';
import { AuthLayout } from '../auth/view/AuthLayout';
import { MainLayout } from '../main/view/MainLayout';
import styles from "./App.module.css"

function App() {
  return (
    <div className={styles.content}>
      <Route path="/auth" >
        <AuthLayout />
      </Route>
      <Route path="/main" >
        <MainLayout />
      </Route>
    </div>
  );
}

export default App;
