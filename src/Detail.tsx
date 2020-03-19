import * as React from 'react';
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import { RedditStore } from './store/reddit'

interface RedditListProps {
  redditStore?: RedditStore
}

@inject('redditStore')
@observer
export class Detail extends React.Component<RedditListProps> {
  

  render() {
    return (
      <div>
        
      </div>
    )
  }
  
}

