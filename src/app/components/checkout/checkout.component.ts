import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  order: any = {}
  orderId: Number
  failure: Boolean
  success: Boolean
  successMessage: String = ""
  errorMessage: String = ""

  constructor(
    private http: HttpClient,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private orderService: OrderService
  ) {

  }

  ngOnInit(): void {
    
    this.activeRoute.params.subscribe((params: Params) => {
      this.orderId = params.id
    })
    this.orderService.getOrder(this.orderId).subscribe((order: any) => {
      console.log(order)
      this.order = order
    }, error => {
      // handle error
        console.log(error)
        this.failure = true
        this.errorMessage = error.message
        setTimeout(() => {
          this.failure = false
          this.errorMessage = ""
        }, 2000)
    })

  }

  // proceed to checkout
  checkout() {
    this.orderService.checkout(this.order.id).subscribe((data: any) => {
      console.log(data)
      this.router.navigate(['/user/accounts/payment'], {queryParams: {'checkoutId': data.id, 'orderId': this.orderId}})
    }, error => {
        // handle error
        console.log(error)
        this.failure = true
        this.errorMessage = error.message
        setTimeout(() => {
          this.failure = false
          this.errorMessage = ""
        }, 2000)
    })
  }

  getOrder() {
    
  }

  backToOrder(id) {
    this.router.navigate(['/user/accounts/purchase',], {queryParams:{id: id}})
  }

}
