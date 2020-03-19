import * as React from 'react';
import logo from './logo.svg';
import './App.css';
import 'blueprint-css/dist/blueprint.css';
import { Provider } from 'mobx-react'
import { RedditStore } from './store/reddit'
import { List } from './List'
import { Detail } from './Detail'
class App extends React.Component<{}> {
  private redditStore: RedditStore = new RedditStore()
  render(){
    return (
      <Provider redditStore={this.redditStore}>
        <div bp="grid">
          <div bp="6"><List/></div>
          <div bp="6"><Detail /></div>
        </div>
      </Provider>
    );
  }
}


export default App;
