import { Component, OnInit } from '@angular/core';
import { BillingService } from 'src/app/services/billing/billing.service';

@Component({
  selector: 'app-statements',
  templateUrl: './statements.component.html',
  styleUrls: ['./statements.component.css']
})
export class StatementsComponent implements OnInit {

  statements: any;
  isStatements: Boolean = false
  failure: Boolean = false
  download: Boolean = false

  constructor(private billingSerice: BillingService) { }

  ngOnInit(): void {
    this.billingSerice.getAllStatements().subscribe((statements: any) => {
      this.statements = []
      console.log(this.statements.length)
      if (this.statements.length <= 0) {
        this.isStatements = false
        this.download = false
      } else {
        this.download = true
        this.isStatements = true;
      }
    }, error => {
      // handle error
      console.log(error)
      this.failure = true;
      setTimeout(() => {
        this.failure = false
      }, 1500)
    })
  }
}
