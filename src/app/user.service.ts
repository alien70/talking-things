import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { User } from './models/user';

@Injectable()
export class UserService {

  constructor(private _http: Http) { }

  getAll() {
    return this._http.get('/api/users', this.jwt())
      .map((response: Response) => response.json());
  }

  getById(id: number) {
    return this._http.get('/api/users' + id, this.jwt())
      .map((response: Response) => response.json());
  }

  create(user: User) {
    return this._http.post('/api/users', user, this.jwt())
      .map((response: Response) => response.json());
  }

  update(user: User) {
    return this._http.put('/api/users', user, this.jwt())
      .map((response: Response) => response.json());
  }

  delete(id: number) {
    return this._http.delete('/api/users' + id, this.jwt())
      .map((response: Response) => response.json());
  }

  private jwt() {
    let currentUser = JSON.parse(localStorage.getItem('auth_token'));
    if (currentUser && currentUser.token) {
      let headers = new Headers({ 'Authorization': 'Bearer' + currentUser.token });
      return new RequestOptions({ headers: headers });
    }
  }
}
