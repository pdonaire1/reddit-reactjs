import * as React from 'react';
import { observable, computed } from 'mobx'
import { observer, inject } from 'mobx-react'
import { RedditStore } from './store/reddit'

interface RedditListProps {
  redditStore?: RedditStore
}

@inject('redditStore')
@observer
export class Detail extends React.Component<RedditListProps> {
  
  @computed
  public get selectedItem():any  {
    const { selected, redditList } = this.props.redditStore!;
    return redditList.find((post) => post.id === selected);
  }

  dismiss = () => {
    const { dismiss } = this.props.redditStore!;
    dismiss()
  }
  render() {
    const { selected } = this.props.redditStore!;
    return (
      <div bp="padding" className={selected == "" ? "card hide" : "card"}>
        {selected && <div>
          <div><b>{this.selectedItem.title}</b></div>
          <div className="imgDiv">
            {(this.selectedItem.thumbnail && this.selectedItem.thumbnail !== "default") && 
              <img src={this.selectedItem.thumbnail} />}
          </div>
          <div bp="grid 6@lg">
            <div>
              <div bp="grid 2">
                <div>By: {this.selectedItem.author}</div>
                <div>Posted: {this.selectedItem.entryDate}</div>
                <div>Comments: {this.selectedItem.commentsCount}</div>
                <div>Status: {this.selectedItem.status}</div>
              </div>
            </div>
            <div>
              <div bp="grid 3 6@md">
                <button onClick={() => this.dismiss()}>Dissmiss</button>
              </div>
            </div>
          </div>
        </div>}
      </div>
    )
  }
  
}

