import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import Hello from "./Hello";
// import Timer from './Timer';
// import ListadoCarta from "./ListadoCarta";
// import Carta from "./Carta";
import AppPagination from "./AppPagination";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    {/*<App />*/}
    <AppPagination url={"https://api.rawg.io/api/games?limit=5&page=1&page_size=30&search=witcher"} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
