import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  errorMessage: String = ""
  successMessage: String = ""
  success: Boolean
  failure: Boolean
  linkSrc: String = ""
  loadAPI: Promise<any>;
  checkoutId: any
  orderId: Number
  actionLink: String = ""

  constructor(private activeRoute: ActivatedRoute) { 

    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.checkoutId = params.checkoutId
      this.orderId = Number(params.orderId)
    })
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
    
    this.actionLink = `http:102.67.140.142/#/user/accounts/payment/status?orderId=${this.orderId}`
  }
  public loadScript() { 
    let isFound = false;
    let scripts = document.getElementsByTagName("script")
    for (let i = 0; i < scripts.length; ++i) {
        if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
            isFound = true;
        }
    }
    if (!isFound) {
      let dynamicScripts = [`https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${this.checkoutId}`];
      for (let i = 0; i < dynamicScripts.length; i++) {
          let node = document.createElement('script');
          node.src = dynamicScripts [i];
          node.type = 'text/javascript';
          node.async = false;
          node.charset = 'utf-8';
          document.getElementsByTagName('head')[0].appendChild(node);
      }

  }
  }

  ngOnInit(): void {
   
  }

}
