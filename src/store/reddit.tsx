import { observable, action, autorun } from 'mobx'
import { RedditService } from "../services/reddit";
import autoSave from "./autoStorage"
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
  @observable pages: number = 5
  @observable selected: string = ""
  @observable galery: string[] = []
  
  constructor(){
    this.redditList = observable([]);
    autoSave(this);
  }

  @action selectId = (id: string) => {
    this.selected = id;
  }
  @action dismiss = () => {
    this.selected = "";
  }
  @action addToGalery = (image: string) => {
    this.galery.push(image);
  }
  @action resetGalery = () => {
    this.galery = [];
  }
  @action removeFromGalery = (index: number) => {
    this.galery = this.galery.filter((img, i) => i !== index);
  }
  @action
  removePosts = () => {
    this.redditList = [];
    this.page = 1;
    this.selected = "";
  }
  @action
  changePage = (page:number) => {
    this.page = page;
    this.selected = "";
    this.requestList();
  }
  @action
  requestList = async () => {
    this.error = false;
    this.loading = true;
    const response = await client.requestRedditPosts(this.page, this.limit);

    if (!response.length) {
      this.error = true;
      this.redditList = [];
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