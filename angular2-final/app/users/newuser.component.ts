import {Component, OnInit} from 'angular2/core';
import {ControlGroup, FormBuilder, Validators} from 'angular2/common';
import {BasicValidators} from '../shared/basicValidators';
import {CanDeactivate, Router, RouteParams} from 'angular2/router';
import {UsersService} from './users.service';
import {User} from './user';

@Component({
    templateUrl: 'app/users/newuser.component.html',
    providers: [UsersService]
})

export class NewUserComponent implements CanDeactivate, OnInit {
    form: ControlGroup;
    isSaving = false;
    user = new User();
    title = "";

    constructor(fb: FormBuilder, private _router: Router, private _params: RouteParams, private _usersService: UsersService) {
        this.form = fb.group({
            name: ['', Validators.required],
            email: ['', BasicValidators.email],
            phone: [],
            address: fb.group({
                street: [],
                suite: [],
                city: [],
                zipcode: []
            })
        });
    }

    ngOnInit() {
        var id = this._params.get('id');

        this.title = id ? "Edit User" : "New User";

        if (!id)
			return;

        this._usersService.getUser(id)
			.then(
                user => this.user = user,
                response => {
                    if (response.status == 404) {
                        this._router.navigate(['NotFound']);
                    }
                });
    }

    routerCanDeactivate(next, prev) {
        if (this.form.dirty && !this.isSaving)
        	return confirm('You have unsaved changes. Are you sure you want to navigate away?');
		return true; 
    }

    save() {
        this.isSaving = true;
        var result;
        
        if (this.user.id) 
            result = this._usersService.updateUser(this.user);
        else
            result = this._usersService.addUser(this.user)
            
		result.subscribe(x => {
            // Ideally, here we'd want:
            // this.form.markAsPristine();
            this._router.navigate(['Users']);
        });
    }
}