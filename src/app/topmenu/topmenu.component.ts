import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User } from '../models/user';

@Component({
    selector: 'topmenu',
    templateUrl: './topmenu.component.html',
    styleUrls: ['./topmenu.component.css'],
    providers: [AuthenticationService]
})
export class TopmenuComponent implements OnInit {
    loggedIn: boolean = false;
    user: User;

    constructor(private authenticationService: AuthenticationService) {

    }

    ngOnInit() {
        this.authenticationService.isLoggedIn().subscribe((user: User) => {
            this.user = user;
            this.loggedIn = (this.user != null);
            console.log(JSON.stringify(user));
        });
    }
}
