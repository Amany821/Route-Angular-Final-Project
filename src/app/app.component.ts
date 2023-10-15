import { Component } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { CartService } from './Services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'final-project';

  constructor( 
    private authService: AuthService,
    private cartService: CartService
  ) {
    if(localStorage.getItem('userToken') != null) {
      this.authService.isUserLoggedIn.next(true)

      this.cartService.getUserCartProducts().subscribe({
        next: (res: any) => {
          this.cartService.numOfCartItems.next(res.numOfCartItems);
        }, error: (err: any) => {}
      });
    }
  }
}
