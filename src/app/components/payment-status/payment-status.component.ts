import { OrderService } from 'src/app/services/order/order.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.css']
})
export class PaymentStatusComponent implements OnInit {
  orderId: Number
  success: Boolean
  failure: Boolean
  successMessage: String = ""
  errorMessage: String = ""

  constructor(private activeRoute: ActivatedRoute, private orderService: OrderService, private router: Router) { 
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.orderId = Number(params.orderId)
    })


  }

  ngOnInit(): void {
    this.orderService.makePayment(this.orderId).subscribe((orderStatus: any) => {
      console.log(orderStatus)
      this.success = true
      this.successMessage = "Payment success, redirecting to dashoard."
      setTimeout(() => {
        this.success = false
        this.successMessage = ""
        this.router.navigate(['/user/dashboard'])
      }, 2000)
    }, error => {
        console.log(error)
        this.failure = true
        this.errorMessage = error.message
        setTimeout(() => {
          this.failure = false
          this.errorMessage = ""
        }, 2000)
    })
  }

}
