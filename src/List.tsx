import * as React from 'react';
import { Component } from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import { RedditStore } from './store/reddit'

interface RedditListProps {
  redditStore?: RedditStore
}


@inject('redditStore')
@observer
export class List extends React.Component<RedditListProps> {
  @observable private task: string = ''
  handleTaskChange = ({ currentTarget: { value } }: React.SyntheticEvent<HTMLInputElement>) => {
    this.task = value
  }

  handleAddTodo = () => {
    const { requestList } = this.props.redditStore!;
    requestList(this.task);
    this.task = ''
  }

  render() {
    return (
      <div>
        <label>New Task</label>
        <input value={this.task} onChange={this.handleTaskChange} />
        <button onClick={this.handleAddTodo}>Add</button>
      </div>
    )
  }
  // render(){
  //   return (
  //     <div>
  //         List
  //     </div>
  //   );
  // }
}

