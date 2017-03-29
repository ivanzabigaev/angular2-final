import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()

export class PostsService {
    private _url = "https://jsonplaceholder.typicode.com/posts";
    constructor(private _http: Http) {
        
    }

    getPosts(filter?) {
        var url = this._url;

        if (filter && filter.userId)
            url += "?userId=" + filter.userId;

        var postsStream = this._http.get(url);

        return postsStream
            .map(res => res.json())
            .toPromise();
    }

    getComments(postId) {
		return this._http.get(this._url + "/" + postId + "/comments")
			.map(res => res.json())
            .toPromise();
	}
}