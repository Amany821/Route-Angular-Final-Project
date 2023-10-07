import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn: boolean = false;
  numOfCartItems!: number;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.authService.isUserLoggedIn.subscribe({
      next: (res: any) => {
        this.isUserLoggedIn = res;
      }
    });

    this.cartService.numOfCartItems.subscribe((res) => {
      this.numOfCartItems = res;
    })
  }

  onLogOut() {
    this.authService.logOut()
  }
}
