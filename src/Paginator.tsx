import * as React from 'react';
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import { RedditStore, Reddit } from './store/reddit'

interface RedditListProps {
  redditStore?: RedditStore
}


@inject('redditStore')
@observer
export class Paginator extends React.Component<RedditListProps> {
  
  changePage = (page:number) => {
    const { changePage } = this.props.redditStore!;
    changePage(page);
  }
  removePosts = () => {
    const { removePosts } = this.props.redditStore!;
    removePosts();
  }
  render() {
    const { loading, pages, limit, page } = this.props.redditStore!;
    return (
      <React.Fragment>
        { loading === false && <div bp="padding" >
          <button 
            className={page === 1 ? "disabled" : ""}
            disabled={page === 1}
            onClick={() => this.changePage(page-1)} >
            Back
          </button>
          {page} of {pages}
          <button
            className={page === pages ? "disabled" : ""}
            disabled={page === pages}
            onClick={() => this.changePage(page+1)}>
            Next
          </button>&nbsp;
          <button onClick={() => this.removePosts()}>
            Remove all Posts
          </button>
        </div>}
      </React.Fragment>
    )
  }
}

