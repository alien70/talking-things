import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../alert.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  model: any = {};
  loading = false;

  constructor(private router: Router
    , private userService: UserService
    , private alertService: AlertService) { }

  ngOnInit() {
  }

  register() {
    this.loading = true;
    this.userService.create(this.model)
      .subscribe(
      data => {
        this.alertService.success('Registration successful, true');
        this.router.navigate(['/login']);
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

}
