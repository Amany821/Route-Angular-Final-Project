import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { Cart } from 'src/app/Interfaces/cart';
import { CartService } from 'src/app/Services/cart.service';
import { LoadingService } from 'src/app/Services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  cartProducts!: Cart;
  updateProductCountTimeOut: any;

  constructor(
    private cartService: CartService,
    private router: Router,
    private loaderService: LoadingService
  ) {}

  ngOnInit(): void {
    this.onGetCartProducts();
  }

  onGetCartProducts() {
    this.loaderService.start();
    this.cartService.getUserCartProducts().pipe(
      finalize(() => {
        this.loaderService.stop();
      })
    ).subscribe({
      next: (res: any) => {
        this.cartProducts = res.data;
        // console.log(this.cartProducts);
      }, error: (err: any) => {}
    });
  }

  onRemoveCartProduct(productId: string) {
    this.loaderService.start();
    this.cartService.numOfCartItems.next(this.cartProducts.products.length - 1);
    // const productToRemove = this.cartProducts.products.find(item => item.product._id === productId);
    // this.cartProducts.products = this.cartProducts.products.filter(item => item.product._id !== productToRemove?.product._id);
    // this.cartProducts.totalCartPrice -= productToRemove!.price * productToRemove!.count;
    this.cartService.removeCartSpecificProduct(productId).pipe(
      finalize(() => {
        this.loaderService.stop();
      })
    ).subscribe({
      next: (res) => {
        // console.log(res);
        this.cartProducts = res.data;
        Swal.fire({
          title: "Success",
          text: "Product dropped successfully",
          icon: "success",
          showConfirmButton: true
        });
        this.cartService.numOfCartItems.next(res.numOfCartItems);
      }, error: (err) => {
        this.onGetCartProducts();
        Swal.fire({
          title: 'Oops...',
          text: "Something went wrong, we couldn't drop this product",
          icon: 'error'
        })
      },
    })
  }

  onClearCart() {
    Swal.fire({
      title: 'Are you sure you want to clear your cart?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, clear it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loaderService.start();
        this.cartService.clearUserCart().pipe(
          finalize(() => {
            this.loaderService.stop();
          })
        ).subscribe({
          next: (res: any) => {
            // console.log(res);
            Swal.fire(
              'Cleared!',
              'Your cart has been cleared.',
              'success'
            );
            this.cartService.numOfCartItems.next(0);
            this.router.navigate(['/home']);
          }, error:() =>{}
        })
      }
    });
  }

    // onUpdateProductQuantity(productId: string, count: number, index: number) {
    //   this.cartProducts.products[index].count = count;
    //   this.cartProducts.totalCartPrice += this.cartProducts.products[index].price;
    //   if(this.cartProducts.products[index].count > 0) {
    //     clearTimeout(this.updateProductCountTimeOut);
    //     this.updateProductCountTimeOut = setTimeout(() => {
    //       this.cartService.updateCartProductQuantity(productId, count).subscribe({
    //         next: (res) => {
    //           // console.log(res);
    //         },error: (err) => {
    //           this.onGetCartProducts();
    //           Swal.fire({
    //             title: 'Oops...',
    //             text: "Something went wrong, we couldn't update the product count",
    //             icon: 'error'
    //           })
    //         },
    //       })
    //     }, 5000)
    //   } else{
    //     Swal.fire({
    //       title: 'Invalid selected count',
    //       text: "You selected 0 count, Are you sure you want to drop this item?!",
    //       icon: 'warning',
    //       showCancelButton: true,
    //       confirmButtonColor: '#3085d6',
    //       cancelButtonColor: '#d33',
    //       confirmButtonText: 'Yes, drop it!'
    //     }).then((result) => {
    //       if (result.isConfirmed) {
    //       this.onRemoveCartProduct(this.cartProducts.products[index].product._id);
    //       } else{
    //         ++this.cartProducts.products[index].count;
    //       }
    //     });
    //   }
    // }

    onUpdateProductQuantity(productId: string, count: number, index: number, status: string) {
      // this.cartProducts.products[index].count = count;
      // this.cartProducts.totalCartPrice = status === 'increase' ? this.cartProducts.totalCartPrice += this.cartProducts.products[index].price : this.cartProducts.totalCartPrice -= this.cartProducts.products[index].price;
      debugger
      if(count > 0) {
        this.loaderService.start();
          this.cartService.updateCartProductQuantity(productId, count).pipe(
            finalize(() => {
              this.loaderService.stop();
            })
          ).subscribe({
            next: (res) => {
              // console.log(res);
              this.cartProducts = res.data
              this.cartProducts.totalCartPrice = res.data.totalCartPrice
            },
            error: (err) => {
              this.onGetCartProducts();
              Swal.fire({
                title: 'Oops...',
                text: "Something went wrong, we couldn't update the product count",
                icon: 'error'
              })
            },
          })
      } else{
        Swal.fire({
          title: 'Invalid selected count',
          text: "You selected 0 count, Are you sure you want to drop this item?!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, drop it!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.onRemoveCartProduct(this.cartProducts.products[index].product._id);
          } else {
            ++count;
            // this.cartProducts.totalCartPrice += this.cartProducts.products[index].price;
          }
        });
      }
      
  
    }
}
