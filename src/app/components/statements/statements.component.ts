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
  success: Boolean
  download: Boolean = false
  errorMessage: String = ""
  successMessage: String = ""

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
      this.failure = true
        this.errorMessage = error.message
        setTimeout(() => {
          this.failure = false
          this.errorMessage = ""
        }, 2000)
    })
  }
}
