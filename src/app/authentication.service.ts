import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    private _isLoggedIn = false;

    constructor(private http: Http) {
        this._isLoggedIn = !!localStorage.getItem('auth_token');
    }

    login(username: string, password: string) {
        console.log('auth service ' + JSON.stringify({ username: username, password: password }));
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
        localStorage.removeItem('auth_token');
    }

    isLoggedIn() {
        return this._isLoggedIn;
    }
}
