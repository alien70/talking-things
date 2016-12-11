import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { AlertService } from '../alert.service';

// import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    // moduleId: module.id,
    templateUrl: 'login.component.html',
    providers: [AuthenticationService, AlertService]
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
          private route: ActivatedRoute
        , private router: Router
        , private authenticationService: AuthenticationService
        , private alertService: AlertService
    ) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.params['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
            (token: any) => {
                this.router.navigate(['/']);
            },
            error => {
                this.alertService.error(error);
                console.log(error);
                this.loading = false;
            });
    }
}
