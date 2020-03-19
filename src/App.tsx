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
        <div bp="grid 6@lg">
          <div><List/></div>
          <div><Detail /></div>
        </div>
      </Provider>
    );
  }
}


export default App;
