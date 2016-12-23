import { Component, Output, ViewChild } from '@angular/core';
import { Subject, Observable } from 'rxjs/Rx';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  public Title: string;

  private Message: string;
  private clickStream = new Subject<boolean>();

  @Output() observable = this.clickStream.asObservable();

  public IsVisible: boolean = false;

  show(message: string) {
    this.Message = message;
    this.IsVisible = true;
  }

  hide() {
    this.IsVisible = false;
  }

  onConfirm() {
    this.clickStream.next(true);
    this.hide();
  }

  onCancel() {
    this.clickStream.next(false);
    this.hide();
  }

  constructor() {
  }

}
