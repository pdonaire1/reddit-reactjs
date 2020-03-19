import { observable, action, computed } from 'mobx'


export interface Reddit {
  task: string
  isComplete: boolean
}

export class RedditStore {
  redditList: Reddit[] = []
  constructor(){
    this.redditList = observable([])
  }
  @computed
  get redditTopList(): number {
    return this.redditList.filter(post => post.isComplete).length
  }
  @action
  requestList(task: string) {
    this.redditList.push({ task, isComplete: false })
  }
}

export const redditStore = new RedditStore()