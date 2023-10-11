import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { finalize } from 'rxjs';
import { OrderDetails } from 'src/app/Interfaces/order-details';
import { LoadingService } from 'src/app/Services/loading.service';
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
    private orderService: OrderService,
    private loaderService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loaderService.start();
    this.orderService.getAllUserOrders(localStorage.getItem('userId')!).pipe(
      finalize(() => {
        this.loaderService.stop();
      })
    ).subscribe({
      next:(res: any) => {
        // console.log(res);
        this.orders = res
      }, error: (err) => {
        
      },
    });
  }
}
