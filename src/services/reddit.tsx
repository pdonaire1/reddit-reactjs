export class RedditService {
  url:string = "http://localhost:3001/";

  requestRedditPosts(page:number = 1, limit:number = 10): any{
    return fetch(this.url + `top?page=${page}&limit=${limit}`, {
      headers: {
         'Accept': 'application/json',
      },
      method: "GET"
    }).then(res => res.json());
  }
}