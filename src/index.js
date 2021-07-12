import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { DataLayer } from "./DataLayer"
import reducer, { initialState } from "./reducer";
ReactDOM.render(
  <React.StrictMode>
    {/* Wrapping our App inside a React Context Data Layer and implementing the concept 
      of initial state and reducer(Redux) on react app context which basically rreceives actions 
      from the user interface and performs the job requested by the user */}
    <DataLayer initialState={initialState} reducer={reducer}>
      <App />
    </DataLayer>
  </React.StrictMode>,
  document.getElementById("root")
);

