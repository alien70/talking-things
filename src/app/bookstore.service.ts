import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Book } from './models/book';

import { environment } from '../environments/environment';

@Injectable()
export class BookStoreService {
    private baseUrl: string;

    constructor(private _http: Http) {
        this.baseUrl = environment.bookStoreApi.server + environment.bookStoreApi.apiUrl;
    }

    GetAll(): Observable<Book[]> {

        let url = `${this.baseUrl}/books`;

        if (!environment.production)
            console.log(url);

        let books$ = this._http.get(url, { headers: this.GetHeaders() })
            .map(mapBooks);

        return books$;
    }

    // public GetById = (id: string): Observable<Book> => {
    //   return this._http.get(this.actionUrl + id)
    //     .map(this.mapBooks)
    //     .catch(this.handleError);
    // }

    // public Create = (book: Book): Observable<Book> => {
    //   return this._http.post(this.actionUrl, book, { headers: this.headers })
    //     .map(this.mapBooks)
    //     .catch(this.handleError);
    // }

    // public Update = (id: string, book: Book): Observable<Book> => {
    //   return this._http.put(this.actionUrl + id, JSON.stringify(book), { headers: this.headers })
    //     .map(this.mapBooks)
    //     .catch(this.handleError);
    // }

    // public Delete = (id: string): Observable<Book> => {
    //   return this._http.delete(this.actionUrl + id)
    //     .catch(this.handleError);
    // }

    private GetHeaders() {
        let headers = new Headers();

        headers.append('Accept', 'application/json');

        return headers;
    }
}

function mapBooks(response: Response): Book[] {
    return response.json().map(toBook);
}

function toBook(r: any): Book {
    if (!environment.production)
        console.log('toBook: ' + JSON.stringify(r));

    let book = <Book>({
        id: r.id,
        title: r.title,
        authors: r.authors,
        publicationYear: r.publicationYear,
        isAvailable: r.isAvailable
    });
    
    if (!environment.production)
        console.log('Parsed book: ', book);

    return book;
}

function handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
}
