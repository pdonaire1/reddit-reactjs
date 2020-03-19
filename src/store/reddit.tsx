import { observable, action, computed } from 'mobx'
import { RedditService } from "../services/reddit";
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
  error: boolean = false
  selected: string = ""

  constructor(){
    this.redditList = observable([]);
    this.selected = observable("");
  }

  @action selectId = (id: string) => {
    this.selected = id;
  }
  @action
  requestList = async () => {
    this.error = false;
    const response = await client.requestRedditPosts();
    console.log(response);
    if (!response.data) {
      this.error = true;
    } else {
      this.redditList = response.data.children.map( (post: any) => {
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
  }
}

export const redditStore = new RedditStore()