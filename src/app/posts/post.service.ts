import { Injectable } from "@angular/core";
import {Post} from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class PostService{
	private posts: Post[]=[];
	private postsNew = new Subject<Post[]>();
	
	 constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(
        "https://sheltered-fjord-99718.herokuapp.com/api/posts"
      )
	  .pipe(map((postData) => {
		return postData.posts.map(post => {
			return {
				title : post.title,
				content: post.content,
				id: post._id
			}
		});
	}))
      .subscribe(transPosts => {
        this.posts = transPosts;
        this.postsNew.next([...this.posts]);
      });
  }
	getPostNewListener(){
		return this.postsNew.asObservable();
	}

	addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http
      .post<{ message: string, postId: string }>(
		"https://sheltered-fjord-99718.herokuapp.com/api/posts", post)
      .subscribe(responseData => {
       const id = responseData.postId;
		post.id = id;
        this.posts.push(post) ;
        this.postsNew.next([...this.posts]);
      });
  }
	
	deletePost(postId: string){
		this.http.delete("https://sheltered-fjord-99718.herokuapp.com/api/posts/" + postId).subscribe(()=>{
			const updatedPosts = this.posts.filter(post => post.id !== postId);
			this.posts = updatedPosts;
			this.postsNew.next([...this.posts]);
		});
	}
}
