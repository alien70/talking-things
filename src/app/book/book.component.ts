import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Book } from '../models/book';
import { BookStoreService } from '../bookstore.service'

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  providers: [BookStoreService]
})
export class BookComponent implements OnInit {
  book: any = {};
  loading = false;
  returnUrl: string;
  newBook: boolean = true;
  formTitle: string = "";

  constructor(private activatedRoute: ActivatedRoute
    , private bookStoreService: BookStoreService
    , private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if (id != 'new') {
        this.loading = true;
        this.newBook = false;
        console.log('Route Parameter: ' + id);
        this.bookStoreService.GetById(id)
          .subscribe(
          book => {
            this.book = book;
            console.log(JSON.stringify(this.book));
            this.loading = false;
          },
          error => console.log(error),
          () => console.log('Done'))
      }

      this.formTitle = this.newBook ? "Add book" : "Edit book";
    });
  }

  save() {
    if (this.newBook) {
      this.bookStoreService.Create(this.book)
        .subscribe(
        r => {
          this.router.navigate(['/library']);
        },
        error => console.log(error),
        () => console.log('Created')
        );
    } else {
      this.bookStoreService.Update(this.book.id, this.book)
        .subscribe(
        r => {
          this.router.navigate(['/library']);
        },
        error => console.log(error),
        () => console.log('Saved')
        );
    }
  }

  onCancel() {
    this.router.navigate(['/library']);
  }
}
