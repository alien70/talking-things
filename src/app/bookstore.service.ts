import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Book } from './models/book';

import { environment } from '../environments/environment';

@Injectable()
export class BookStoreService {
    private baseUrl: string;

    constructor(private _http: Http) {
        this.baseUrl = environment.bookStoreApi.server + environment.bookStoreApi.apiUrl + '/books/';
    }

    GetAll(): Observable<Book[]> {

        if (!environment.production)
            console.log(this.baseUrl);

        let books$ = this._http.get(this.baseUrl, { headers: this.GetHeaders() })
            .map(mapBooks)
            .catch(handleError);

        return books$;
    }

    public GetById = (id: string): Observable<Book> => {
        let books$ = this._http.get(this.baseUrl + id, { headers: this.GetHeaders() })
            .map(mapBooks)
            .catch(handleError);
        return books$;
    }

    public Create = (book: Book): Observable<Book> => {
        let book$ = this._http.post(this.baseUrl, book, { headers: this.GetHeaders() })
            .map(mapBooks)
            .catch(handleError);

        return book$;
    }

    public Update = (id: string, book: Book): Observable<Book> => {
        let book$ = this._http.put(this.baseUrl + id, JSON.stringify(book), { headers: this.GetHeaders() })
            .map(mapBooks)
            .catch(handleError);

        return book$;
    }

    public Delete = (id: string): Observable<Book> => {
        let book$ = this._http.delete(this.baseUrl + id)
            .catch(handleError);

        return book$;
    }

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
