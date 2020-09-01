import { Component, OnInit } from '@angular/core';
import { BillingService } from 'src/app/services/billing/billing.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  invoices: any = []
  isInvoices: Boolean = false
  failure: Boolean = false
  search: Boolean = false
  success: Boolean
  errorMessage: String = ""
  successMessage: String = ""

  constructor(private billingService: BillingService) { }

  ngOnInit(): void {
    // get all invoices
    this.billingService.getInvoices().subscribe((invoice: any) => {
      console.log(invoice)
      this.invoices = invoice
      console.log(this.invoices.length)
      if (this.invoices.length <= 0) {
        this.isInvoices = false
        this.search = false
      } else {
        this.search = true
        this.isInvoices = true;
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
