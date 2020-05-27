import React from 'react';
import './styles/App.css';
import WholePage from "./common/WholePage";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends React.Component {

  render() {
    return (
        <main>
             <WholePage></WholePage>
        </main>
    );
  }
}




export default App;
