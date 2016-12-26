import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BookStoreService } from '../bookstore.service';
import { Book } from '../models/book';
import { ModalComponent } from '../modal/modal.component';

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

  @ViewChild(ModalComponent) modal: ModalComponent;

  private subscription: Subscription;
  constructor(private _router: Router, private _bookStoreService: BookStoreService) { }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this._bookStoreService
      .GetAll()
      .subscribe(
      b => this.books = b,
      e => this.errorMessage = e,
      () => this.isLoading = false);
  }

  onNew() {
    console.log("onNew");
    this._router.navigate(['/edit', 'new']);
  }

  onEdit(book: Book) {
    console.log('edit ' + book.id);
    this._router.navigate(['/edit', book.id]);
  }

  onDelete(book) {

    var message: string = 'Delete \'' + book.title + '\'?: ';
    this.modal.Title = 'Warning';
    this.modal.show(message);
    this.subscription = this.modal.observable.subscribe(x => {

      if (x) {
        this._bookStoreService.Delete(book.id).subscribe(
          book => {
            let b = this.books.find(item => item.id === book.id);
            let id = this.books.indexOf(b);
            this.books.splice(id, 1);
            if (!environment.production)
              console.log(JSON.stringify(book));
          },
          error => {
            console.log(error);
          }
        );
      }

      this.subscription.unsubscribe();
    });
  }
}
