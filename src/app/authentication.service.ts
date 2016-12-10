import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import { User } from './models/user';

@Injectable()
export class AuthenticationService {
    private _isLoggedIn: boolean = false;
    private user: User;
    private _subject: Subject<User> = new Subject<User>();

    constructor(private http: Http) {
        this._isLoggedIn = !!localStorage.getItem('auth_token');
    }

    login(username: string, password: string) {
        return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();

                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('auth_token', JSON.stringify(user.token));
                    this.user = user;
                    this._subject.next(user);
                    console.log(JSON.stringify(user));
                }
            });
    }

    logout() {
        localStorage.removeItem('auth_token');
        this.user = null;
        this._subject.next(null);
    }

    isLoggedIn(): Observable<User> {
        return this._subject.asObservable();;
    }
}
