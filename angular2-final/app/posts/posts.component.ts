import {Component, OnInit} from 'angular2/core';
import {PostsService} from './posts.service';
import {UsersService} from '../users/users.service';
import {SpinnerComponent} from '../shared/spinner.component';
import {PaginationComponent} from '../shared/pagination.component';

@Component({
    templateUrl: 'app/posts/posts.component.html',
    directives: [SpinnerComponent, PaginationComponent],
    providers: [PostsService, UsersService],
    styles: [`
        .posts li { cursor: default; }
        .posts li:hover { background: #ecf0f1; } 
        .list-group-item.active, 
        .list-group-item.active:hover, 
        .list-group-item.active:focus { 
            background-color: #ecf0f1;
            border-color: #ecf0f1; 
            color: #2c3e50;
        }
    `]
})

export class PostsComponent implements OnInit {
    posts = [];
    users = [];
    isPostsLoading = true;
    isCommentsLoading = true;
    currentPost;
    pageSize = 10;
    pagedPosts = [];

    constructor(private _postsService: PostsService, private _usersService: UsersService) {

    }

    ngOnInit() {
        this._usersService.getUsers()
            .then(res => {
                this.users = res;
            });
        this.loadPosts();
    }

    select(post) {
        this.currentPost = post;
        this.isCommentsLoading = true;
        this._postsService.getComments(post.id)
            .then(res => {
                this.currentPost.comments = res;
                this.isCommentsLoading = false;
            }, res => {
                this.isCommentsLoading = false;
            });
    }

    reloadPosts(filter) {
        this.currentPost = null;
        this.loadPosts(filter)
    }

    loadPosts(filter?) {
        this.isPostsLoading = true;
        this._postsService.getPosts(filter)
            .then(res => {
                this.posts = res;//.splice(0, 45);;
                //this.pagedPosts = this.getPostsInPage(1);
                this.pagedPosts = _.take(this.posts, this.pageSize);
                this.isPostsLoading = false;
            }, res => {
                this.isPostsLoading = false;
            });
    }

    onPageChanged(page) {
        //this.pagedPosts = this.getPostsInPage(page);
        var startIndex = (page - 1) * this.pageSize;
        this.pagedPosts = _.take(_.rest(this.posts, startIndex), this.pageSize);
	}
    
    private getPostsInPage(page) {
        var result = [];
		var startingIndex = (page - 1) * this.pageSize;
        var endIndex = Math.min(startingIndex + this.pageSize, this.posts.length);

        for (var i = startingIndex; i < endIndex; i++)
            result.push(this.posts[i]);
            
        return result;
    }
}