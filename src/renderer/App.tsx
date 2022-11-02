import { Component, createEffect, createSignal, ErrorBoundary, Match, Switch } from 'solid-js';
import DreamEdit from './Components/DreamEdit';
import DreamList from "./Components/DreamList";
import NavigationBar from './Components/NavigationBar';

const App: Component = () => {
  const [currentFilter, setCurrentFilter] = createSignal("");
  const [isEditing, setIsEditing] = createSignal(false);
  const [dreamId, setDreamId] = createSignal(0);

  createEffect(() => {
    console.info(`[Somnia] Current filter is ${currentFilter()}`);
  });

  return (
    <ErrorBoundary fallback={err => err}>
      <div class="page-wrapper with-navbar">
        <NavigationBar setFilter={setCurrentFilter} setIsEditing={setIsEditing} setDreamId={setDreamId} />
        <div class="content-wrapper">
          <div class='content m-10'>
            <Switch fallback={<DreamList filter={currentFilter} setIsEditing={setIsEditing} setDreamId={setDreamId} />}>
              <Match when={isEditing()}>
                <DreamEdit dreamId={dreamId} setIsEditing={setIsEditing} />
              </Match>
            </Switch>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
