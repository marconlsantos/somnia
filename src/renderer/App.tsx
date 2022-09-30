import { Component, ErrorBoundary } from 'solid-js';

import DreamList from "./Dream/List";

import "halfmoon";
import "./App.module.css";

const App: Component = () => {

  return (
    <ErrorBoundary fallback={err => err}>

      <DreamList />

    </ErrorBoundary>
  );
};

export default App;
