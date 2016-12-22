import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { BookStoreService } from '../bookstore.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
  providers: [BookStoreService]
})
export class LibraryComponent implements OnInit {

  title = 'Book Store';

  books: Book[] = [];

  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private _bookStoreService: BookStoreService) { }

  ngOnInit() {
    this._bookStoreService
      .GetAll()
      .subscribe(
      b => this.books = b,
      e => this.errorMessage = e,
      () => this.isLoading = false);
  }

  onNew() {
    console.log("onButtonNew");
  }

  onEdit(book: Book) {
    console.log('edit ' + book.id);
  }

  onDelete(book){
    console.log('delete ' + book.id)
  }
}
