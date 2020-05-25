import { Component,  OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import {Subscription} from 'rxjs';
import {PostService} from '../post.service';

import {Post}from "../post.model";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts:Post[] = [];
  totalPosts = 10;
	postsPerPage = 2;
	pageSizeOp = [1, 2, 5, 10];
	
 private postsSub: Subscription;
	// postsService: PostService;	
	// constructor(postsService: PostService){
	// 	this.postsService = postsService;
	// }
	constructor(public postsService: PostService){}
	
	ngOnInit(){
		this.postsService.getPosts();
		this.postsSub = this.postsService.getPostNewListener()
			.subscribe((posts:Post[]) => {
						this.posts = posts;
						});
	}
	
	ngOnDestroy(){
		this.postsSub.unsubscribe();
	}
	
	onDelete(postId: string){
    this.postsService.deletePost(postId);

	}
	
	onChangedPage(pageData:PageEvent){
		
	};
}
