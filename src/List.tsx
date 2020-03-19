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
    const { redditList, error, loading } = this.props.redditStore!;
    return (
      <div bp="padding" >
        { error && <div>Error in Server, try refreshing the page</div> }
        { loading && <div>Loading...</div> }

        { redditList.map((post, index) => {
          return <div key={index} className="card">
            <div bp="grid 3 6@md">
              <div><b>{post.title}</b></div>
              <div className="imgDiv">
                {(post.thumbnail && post.thumbnail !== "default") && 
                  <img src={post.thumbnail} />}
              </div>
              <div bp="grid">
                <div>Date: {post.entryDate}</div>
                <div>By: {post.author}</div>
              </div>
              <button onClick={() => this.selectItem(post.id)}>Details</button>
            </div>
          </div>
        }) }
        
      </div>
    )
  }
}

