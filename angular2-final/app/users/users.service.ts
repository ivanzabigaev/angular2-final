import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Injectable()

export class UsersService {
    private _url = "https://jsonplaceholder.typicode.com/users";
    constructor(private _http: Http) {

    }

    getUsers() {
        var usersStream = this._http.get(this._url);

        return usersStream
            .map(res => res.json())
            .toPromise();
    }

    getUser(userId){
		return this._http.get(this._url + "/" + userId)
			.map(res => res.json())
            .toPromise();
	}

    addUser(user){
 		return this._http.post(this._url, JSON.stringify(user))
 			.map(res => res.json());
 	}
    
    updateUser(user){
		return this._http.put(this.getUserUrl(user.id), JSON.stringify(user))
			.map(res => res.json());
	}

    deleteUser(userId){
		return this._http.delete(this.getUserUrl(userId))
			.map(res => res.json());
	}
    
    private getUserUrl(userId){
		return this._url + "/" + userId;
	}
}