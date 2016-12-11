import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs/Observable';
import { AlertService } from '../alert.service';

import { User } from '../models/user';

@Component({
    selector: 'topmenu',
    templateUrl: './topmenu.component.html',
    styleUrls: ['./topmenu.component.css'],
    providers: [AuthenticationService]
})
export class TopmenuComponent implements OnInit {
    loading = false;
    loggedIn: boolean = false;
    returnUrl: string;

    constructor(
        private authenticationService: AuthenticationService
        , private route: ActivatedRoute
        , private router: Router
        , private alertService: AlertService) {
        this.loading = false;
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.params['returnUrl'] || '/';
    }

    onLogout() {
        this.loading = true;
        this.authenticationService.logout();
    }
}
