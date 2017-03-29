import {Component} from 'angular2/core';
import {NavbarComponent} from './navbar.component';
import {HomeComponent} from './home.component';
import {UsersComponent} from './users/users.component';
import {PostsComponent} from './posts/posts.component';
import {NewUserComponent} from './users/newuser.component';
import {NotFoundComponent} from './notfound.component';


import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

@RouteConfig([
    { path: '/', name: 'Home', component: HomeComponent, useAsDefault: true },
    { path: '/users', name: 'Users', component: UsersComponent },
    { path: '/users/:id', name: 'EditUser', component: NewUserComponent },
    { path: '/users/new', name: 'NewUser', component: NewUserComponent },
    { path: '/posts', name: 'Posts', component: PostsComponent },
    { path: '/not-found', name: 'NotFound', component: NotFoundComponent },
    { path: '/*other', name: 'Other', redirectTo: ['Home'] }
])

@Component({
    selector: 'my-app',
    template: `
        <navbar></navbar>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
    `,
    directives: [NavbarComponent, ROUTER_DIRECTIVES]

})
export class AppComponent { }