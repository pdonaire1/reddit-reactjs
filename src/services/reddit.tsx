export class RedditService {
  url:string = "http://localhost:3000/";

  requestRedditPosts(): any{
    return fetch(this.url + "top", {
      headers: {
         'Accept': 'application/json',
      },
      method: "GET"
    }).then(res => res.json());
  }
}