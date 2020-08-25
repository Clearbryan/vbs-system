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

  // to delete hard coded data
  packages: any = [
    // { min: 0, max: 499, prize: 0.61 },
    // { min: 500, max: 999, prize: 0.56 },
    // { min: 1000, max: 4999, prize: 0.53 },
    // { min: 5000, max: 9999, prize: 0.45 },
    // { min: 10000, max: 14999, prize: 0.46 },
    // { min: 15000, max: 19999, prize: 0.34 },
    // { min: 'over ', max: 20000, prize: `Contact us` }
  ]
  // disable proceed button if credits < 500
  get valid() {
    if (this.credits < 500) {
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
    })

  }

  // proceed to checkout
  async checkout() {
    // this.orderService.purchaseCredits(this.order_total).subscribe((response: any) => {
    //   console.log(response)
    // }, error => {
    //   console.log(error)
    // })
  }

  // run this on credit input
  getOrder() {
    this.packages.filter((pack, i, arr) => {
      let val = this.credits
      if (val <= arr[i].maximum && val >= arr[i].minimum) {
        arr[i].bgcolor = '#6CCB8E'
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
