import { Component, OnInit } from '@angular/core';
import { BillingService } from 'src/app/services/billing/billing.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  details: any = {}
  success: Boolean = false
  failure: Boolean = false
  errorMessage: String = ""
  successMessage: String = ""

  constructor(private billingService: BillingService) { }

  ngOnInit(): void {
    this.billingService.getAllBillingInfo().subscribe((data: any) => {
      console.log(data)
      this.details = data[0]
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

  // update info
  update() {
    // const { address_1, address_2, city_name,  }
    this.billingService.updateBillingInfo(this.details).subscribe((res: any) => {
      console.log(res)
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
