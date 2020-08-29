import { Component, Input, OnInit, SimpleChanges, Pipe } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CampaignService } from 'src/app/services/campaign/campaign.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})


export class CampaignsComponent implements OnInit {

  @Input()campaigns: any = []
  @Input()filteredCampaigns: any = []
  campaign_ended: Boolean = false
  campaign_pause: Boolean = false
  campaign_start: Boolean = false
  campaign_stop: Boolean = false
  progress_percentage: any
  progress_title: String = "completed"
  green = 'green'
  noSearch: Boolean = true
  searchOption: String = "Search by"
  searchStrings: any = ["Participants", "By Name", "Date"]
  status: any = null
  success: Boolean = false
  failure: Boolean = false
  successMessage: String
  failureMessage: String
  p: number = 1
  test: any
  counter: Number
  active: Boolean = false
  _testCall: Boolean
  testCallNumber: String = ""
  testcallId: Number = null
  recycleId: Number = null
  _recycle: Boolean
  recycleOptions: String = ""

  styles: any = {}

  constructor(private campaignService: CampaignService, private router: Router, private activeRouter: ActivatedRoute) {

  }

  ngOnInit() {
    this.campaignService.getAllCampaigns().subscribe((campaigns: any) => { 
      console.log(campaigns)
    })
    
  }

//   ngOnChanges() {
//     setTimeout(() => {
//       console.log(this.campaigns)
//     }, 5000)
//  }
  
  openForm(id) {
    this._testCall = true
    this.testcallId = Number(id)
  }

  openRecycleForm(id) {
    this._recycle = true
    this.recycleId = Number(id)

  }

  ngDoCheck(): void {
    this.campaignService.getAllCampaigns().subscribe((campaigns: any) => {
      campaigns.map((res: any, i, arr) => {
        //res.end_date = new Date(res.end_date).toDateString()
        //res.expirationdate = new Date(res.expirationdate).toDateString()
        res.start_date = new Date(res.start_date).toDateString()
        //res.updated_date = new Date(res.updated_date).toDateString()
        //res.created_date = new Date(res.created_date).toDateString()
        campaigns.filter((state, i, arr) => {
          if (arr[i].progress <= 25) {
            arr[i].progress = `${arr[i].progress}%`
            arr[i].color = 'progress-bar bg-danger'
            return
          } else if (arr[i].progress > 25 && arr[i].progress <= 50) {
            arr[i].progress = `${arr[i].progress}%`
            arr[i].color = 'progress-bar bg-success'
            return
          }
          else if (arr[i].progress > 50) {
            arr[i].progress = `${arr[i].progress}%`
            arr[i].color = 'progress-bar bg-primary'
            return
          }
          else {
            arr[i].color = 'progress-bar -bg-transparent'

          }
        })

        campaigns.filter((cam, i, arr) => {
          if (arr[i].status === 2) {
            arr[i].paused = true
            return
          } else if (arr[i].status === 1) {
            if (arr[i].progress === `100%`) {
              arr[i].paused = true
              return
            } else {
              arr[i].started = true
              return
            }
          } else if (arr[i].status === 3) {
            arr[i].paused = true
            return
          }
          else if (arr[i].status === 4) {
            arr[i].paused = true
          }
        })
      })
      this.campaigns = campaigns
    }, error => {
      // handle error
        console.log(error)
        this.failure = true
        this.failureMessage = error.message
    })
    
  }

  // handle search
  search(e) {
    let searchString = e.target.value
    if (this.searchOption !== "Search by") {
      this.noSearch = false
      const filteredSearch = this.campaigns.filter((campaign) => {
        // search by name
        if (this.searchOption === "By Name") {
          if (campaign.name.includes(searchString)) {
            return true
          }
        } else if (this.searchOption === "Date") {
          if (campaign.start_date.includes(searchString)) {
            return true
          }
        } else if (this.searchOption === "Participants") {
          if (campaign.replies.includes(searchString)) {
            return true
          }
        }
        else {
          return false
        }

      })
      this.filteredCampaigns = filteredSearch

    }

  }

  // start campaign
  startCampaign(id, name, phonebook) {
    
    console.log(id)
    this.campaignService.startCampaign(id, 1, name, phonebook).subscribe((res: any) => {
      console.log(res)
      this.success = true
      // for (let c = 30; c <= 30; c--) {
      //   setInterval(() => {
      //     this.counter = c
      //   }, 1000)
      // }
      this.successMessage = `Just finishing up setting your campaign! Campaign will start in approximately 30 sec to 1 min.`
      setTimeout(() => {
        this.success = false
        this.successMessage = ""
        // this.router.navigate(['/user/campaigns/active', id])
      }, 5000)
    }, error => {
      console.log(error)
      this.failure = true
      this.failureMessage = error.message
      setTimeout(() => {
        this.failure = false
        this.failureMessage = ""
      }, 2000)
    })
  }

  // pause campaign
  pauseCampaign(id, name, phonebook) {
    this.campaignService.pauseCampaign(id, 2, name, phonebook).subscribe((res: any) => {
      console.log(res)
      this.success = true
      this.successMessage = "Campaign paused successfully."
      setTimeout(() => {
        this.success = false
        this.successMessage = ""
      }, 1500)
    }, error => {
      console.log(error)
      this.failure = true
      this.failureMessage = error.message
      setTimeout(() => {
        this.failure = false
        this.failureMessage = ""
      }, 1500)
    })

  }

  // abort campaign
  stopCampaign(id, name, phonebook) {
    this.campaignService.stopCampaign(id, 3, name, phonebook).subscribe((res: any) => {
      console.log(res)
      this.success = true
      this.successMessage = "Campaign stoped successfully"
      setTimeout(() => {
        this.success = false
        this.successMessage = ""
      }, 1500)
    }, error => {
      console.log(error)
      this.failure = true
      this.failureMessage = error.message
      setTimeout(() => {
        this.failure = false
        this.failureMessage = ""
      }, 1500)
    })

  }

  // delete campaign
  deleteCampaign(id) {
    this.campaignService.deleteCampaign(id).subscribe((res: any) => {
      console.log(res)
      this.success = true
      this.successMessage = "Campaign deleted successfully"
      setTimeout(() => {
        this.success = false
        this.successMessage = ""
      }, 2000)
    }, error => {
      console.log(error)
      this.failure = true
      this.failureMessage = error.message
      setTimeout(() => {
        this.failure = false
        this.failureMessage = ""
      }, 2000)
    })
  }

  duplicate(id) {
    this.campaignService.duplicateCampaign(id).subscribe((duplicate: any) => {
      // console.log(duplicate)
      this.success = true
      this.successMessage = "Campaign duplicate successful"
      setTimeout(() => {
        this.success = false
        this.successMessage = ""
      }, 1500)
    }, error => {
        // handle error
        console.log(error)
        this.failure = true
        this.failureMessage = error.message
        setTimeout(() => {
          this.failure = false
          this.failureMessage = ""
        }, 2000)
    })
  }

  // recycle
  recycle() {
    let rec = this.recycleOptions.split(',')
    this.campaignService.recycleCampaign(this.recycleId, rec).subscribe((duplicate: any) => {
      // console.log(duplicate)
      this.success = true
      this.successMessage = "Campaign recycle successful"
      this._recycle = false
      setTimeout(() => {
        this.success = false
        this.successMessage = ""
      }, 1500)
    }, error => {
        // handle error
        console.log(error)
        this.failure = true
        this.failureMessage = error.message
        setTimeout(() => {
          this.failure = false
          this.failureMessage = ""
        }, 2000)
    })
  }

  // test call
  testCall() {
    this.campaignService.testCall(this.testcallId, this.testCallNumber).subscribe((sub: any) => {
      console.log(sub)
      this.success = true
      this.successMessage = "Test call successs. You should receive a call shortly"
      setTimeout(() => {
        this._testCall = false
        this.testcallId = null
        this.success = false
        this.successMessage = ""
      }, 2000)
    }, error => {
        // handle error
        console.log(error)
        this.failure = true
        this.failureMessage = error.message
        setTimeout(() => {
          this.failure = false
          this.failureMessage = ""
        }, 2000)
    })
  }
 



}
