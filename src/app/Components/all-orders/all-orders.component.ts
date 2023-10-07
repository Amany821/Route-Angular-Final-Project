import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { OrderDetails } from 'src/app/Interfaces/order-details';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit{
  orders: OrderDetails[] = [];
  orderCustomOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      }
    },
    nav: true,
    autoplay: false
  }
  constructor(
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.orderService.getAllUserOrders(localStorage.getItem('userId')!).subscribe({
      next:(res: any) => {
        // console.log(res);
        this.orders = res
      }, error: (err) => {
        
      },
    });
  }
}
