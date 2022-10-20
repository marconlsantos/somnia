import { Component, createSignal, ErrorBoundary } from 'solid-js';
import * as halfmoon from 'halfmoon';
import DreamList from "./Components/List";
import NavigationBar from './Components/NavigationBar';

import 'fontawesome-free/css/fontawesome.css';
import 'fontawesome-free/css/solid.css';

import './App.module.css';

const App: Component = () => {
  halfmoon.toggleDarkMode();

  return (
    <ErrorBoundary fallback={err => err}>
      <div class="page-wrapper with-navbar">
        <div class="sticky-alerts"></div>
        <NavigationBar />
        <div class="content-wrapper">
          <DreamList />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
