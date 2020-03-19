import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import 'blueprint-css/dist/blueprint.css';


class App extends React.Component<{}> {

  render(){
    return (
      <div bp="grid">
        <div bp="6">List</div>
        <div bp="6">Detail</div>
      </div>
    );
  }
}


export default App;
