import { Component } from '@angular/core';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'final-project';

  constructor( 
    private authService: AuthService
  ) {
    if(localStorage.getItem('userToken') != null) {
      this.authService.isUserLoggedIn.next(true)
    }
  }
}
