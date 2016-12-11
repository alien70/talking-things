import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from "rxjs/Observer";
import 'rxjs/add/operator/map';

import { User } from './models/user';

@Injectable()
export class AuthenticationService {

    constructor(private http: Http) {
    }

    login(username: string, password: string) {
        return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();

                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('auth_token', JSON.stringify(user.token));
                }
            });
    }

    logout() {
        return new Observable(observer => {
            setTimeout(function () {
                localStorage.removeItem('auth_token');
            }, 1000);
        });
    }

    isLoggedIn() {
        return !!localStorage.getItem('auth_token');
    }
}
