/* @refresh reload */
import { render } from 'solid-js/web';

import "../../node_modules/halfmoon/css/halfmoon-variables.min.css";

import App from './App';

render(() => <App />, document.getElementById('root') as HTMLElement);
