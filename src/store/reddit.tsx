import { observable, action, computed } from 'mobx'
import { RedditService } from "../services/reddit";
import { runInThisContext } from 'vm';
const client = new RedditService();

export interface Reddit {
  id: string
  title: string
  author: string
  entryDate: string
  thumbnail: string
  commentsCount: string
  status: string
}

export class RedditStore {
  redditList: Reddit[] = []
  @observable error: boolean = false
  @observable loading: boolean = false
  @observable page: number = 1
  @observable limit: number = 10
  pages: number = 5 // Math.ceil(this.page/this.limit)
  @observable selected: string = ""
  
  constructor(){
    this.redditList = observable([]);
  }

  @action selectId = (id: string) => {
    this.selected = id;
  }
  @action dismiss = () => {
    this.selected = "";
  }
  @action
  requestList = async () => {
    this.error = false;
    this.loading = true;
    const response = await client.requestRedditPosts();

    if (!response.length) {
      this.error = true;
    } else {
      this.redditList = response.map( (post: any) => {
        return {
          id: post.data.id,
          title: post.data.title,
          author: post.data.author,
          entryDate: post.data.created,
          thumbnail: post.data.thumbnail,
          commentsCount: post.data.num_comments,
          status: post.data.visited,
        }
      });
    }
    this.loading = false;
  }
}

export const redditStore = new RedditStore()