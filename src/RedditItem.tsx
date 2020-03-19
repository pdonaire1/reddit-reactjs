
import React from 'react'

import { Reddit } from './store/reddit'

interface RedditListItemProps {
  reddit: Reddit
}

export const RedditListItem = ({ reddit }: RedditListItemProps) => <div>{reddit.task}</div>