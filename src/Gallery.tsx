import * as React from 'react';
import { observable, computed } from 'mobx'
import { observer, inject } from 'mobx-react'
import { RedditStore } from './store/reddit'

interface RedditListProps {
  redditStore?: RedditStore
}

@inject('redditStore')
@observer
export class Gallery extends React.Component<RedditListProps> {
  
  dismiss = () => {
    const { dismiss } = this.props.redditStore!;
    dismiss()
  }
  openImage = (url: string) => {
    window.open(url, "_blank");
  }
  removeImage = (i: number) => {
    const { removeFromGalery } = this.props.redditStore!;
    removeFromGalery(i);
  }
  render() {
    const { galery } = this.props.redditStore!;
    return (
      <div>
        <h3>Galery</h3>
        <div bp="padding grid">
          {galery.map((image, i) => 
              <div className="galery">
                <img src={image} onClick={() => this.openImage(image)}/>
                <button onClick={() => this.removeImage(i)}>Remove</button>
              </div>)}
        </div>
      </div>
    )
  }
  
}

