import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  credit_cost: Number = 0;
  credits: Number = 0;
  creditCost: Number = 0;
  total: Number = 0
  order_total: Number = 0;
  packageId: Number = null
  orderCreated: Boolean = false
  sucessMessage: String = ""
  success: Boolean
  failure: Boolean
  errorMessage: String = ""


  // to delete hard coded data
  packages: any = []
  // disable proceed button if credits < 500
  get valid() {
    if (this.credits <= 50 || this.credits > 30000 ) {
      return false
    } else {
      return true
    }
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private orderService: OrderService
  ) {

  }

  ngOnInit(): void {
    this.orderService.getProducts().subscribe((order: any) => {
      console.log(order)
      this.packages = order
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
  order() {
    
    this.orderService.order(this.order_total, this.credits, this.packageId).subscribe((order: any) => {
      const orderId = order.id
      this.success = true
      this.sucessMessage = "Order created, continue to checkout"
      setTimeout(() => {
        this.router.navigate(['/user/accounts/checkout', orderId])
        this.success = false
        this.sucessMessage = ""
      }, 2000)
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

  checkout() {

  }

  // run this on credit input
  getOrder() {
    this.packages.filter((pack, i, arr) => {
      let val = this.credits
      if (val <= arr[i].maximum && val >= arr[i].minimum) {
        this.packageId = pack.id
        arr[i].bgcolor = '#7FB7EC'
        arr[i].textcolor = 'transparent'
        let cost;
        cost = Number(val) * Number(arr[i].price)
        this.credit_cost = cost.toFixed(2)
        this.order_total = cost.toFixed(2)
        console.log(this.credit_cost)
        return
      }
      else {
        if (i % 2 == 0) {
          arr[i].bgcolor = '#d3d3d3'
          return
        }
        else {
          arr[i].bgcolor = 'transparent'
          return
        }
      }

    })
  }

}
