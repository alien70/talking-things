/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BookstoreService } from './bookstore.service';

describe('BookstoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookstoreService]
    });
  });

  it('should ...', inject([BookstoreService], (service: BookstoreService) => {
    expect(service).toBeTruthy();
  }));
});
