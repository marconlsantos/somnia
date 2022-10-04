import { Component, ErrorBoundary } from 'solid-js';
import * as halfmoon from 'halfmoon';

import DreamList from "./Dream/List";

import 'halfmoon/css/halfmoon-variables.min.css';
import './App.module.css';

const App: Component = () => {
  halfmoon.toggleDarkMode();

  return (
    <ErrorBoundary fallback={err => err}>

      <DreamList />

    </ErrorBoundary>
  );
};

export default App;
