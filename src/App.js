import React from "react"
import './App.css';
import Employee from "./components/Employee"

function App() {
  return (
    <div id="app">
      <header class="head">Employee Directory
      <p class="subtext"> Click on carrot in the name field to sort the name </p>
      </header>
       <Employee />
    </div>
  );
}

export default App;
