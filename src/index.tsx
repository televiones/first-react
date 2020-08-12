import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import Hello from "./Hello";
// import Timer from './Timer';
// import ListadoCarta from "./ListadoCarta";
import Carta from "./Carta";
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    {/*<App />*/}
      <Carta fechaEstreno={"19/06/2020"} id={1} nombre={"Valorant"} imagen={"https://media.rawg.io/media/games/b11/b11127b9ee3c3701bd15b9af3286d20e.jpg"}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
