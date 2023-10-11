import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { ShippingAddress } from 'src/app/Interfaces/payment';
import { LoadingService } from 'src/app/Services/loading.service';
import { OrderService } from 'src/app/Services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{
  shippingAddress!: FormGroup;
  cartId!: string;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoadingService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.cartId = params['cartId'];
    })

    this.shippingAddress = new FormGroup({
      details: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required)
    });
  }

  onCheckout(){
    this.loaderService.start();
    const shippingAddress: ShippingAddress = {
      details: this.shippingAddress.controls['details'].value,
      phone: this.shippingAddress.controls['phone'].value,
      city: this.shippingAddress.controls['city'].value
    }
    this.orderService.createCashOrder(this.cartId, shippingAddress).pipe(
      finalize(() => {
        this.loaderService.stop();
      })
    ).subscribe({
      next:(res: any) => {
        // console.log(res);
        location.href = res.session.url;
      },error: () => {}
    });
  }
}
