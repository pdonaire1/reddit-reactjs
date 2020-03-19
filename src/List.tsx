import * as React from 'react';
import { Component } from 'react'
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import { RedditStore, Reddit } from './store/reddit'

interface RedditListProps {
  redditStore?: RedditStore
}


@inject('redditStore')
@observer
export class List extends React.Component<RedditListProps> {

  componentDidMount = () => {
    const { requestList } = this.props.redditStore!;
    requestList();
  }
  selectItem = (id: string) => {
    const { selectId } = this.props.redditStore!;
    selectId(id);
  }
  render() {
    const { redditList } = this.props.redditStore!;
    return (
      <div>
        { redditList.map((post, index) => {
          return <div key={index} onClick={() => this.selectItem(post.id)}>
            <div><b>{post.title}</b></div>
            {post.thumbnail && <img src={post.thumbnail} />}
            by: {post.author}
          </div>
        }) }
        
      </div>
    )
  }
}

