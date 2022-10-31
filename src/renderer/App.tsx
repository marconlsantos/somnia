import { Component, createEffect, createSignal, ErrorBoundary } from 'solid-js';
import DreamList from "./Components/DreamList";
import NavigationBar from './Components/NavigationBar';

const App: Component = () => {
  const [currentFilter, setCurrentFilter] = createSignal("");

  createEffect(() => {
    console.info(`[Somnia] Current filter is ${currentFilter()}`);
  });

  return (
    <ErrorBoundary fallback={err => err}>
      <div class="page-wrapper with-navbar">
        <NavigationBar setFilter={setCurrentFilter} />
        <div class="content-wrapper">
          <DreamList filter={currentFilter} />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
