import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { AlertService } from './alert.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [AlertService]
})
export class AppComponent {
    title = 'BookStore test!';
    sign = 'Maurizio Attanasi';
    year = '2016';
    environmentName = environment.envName;
}
