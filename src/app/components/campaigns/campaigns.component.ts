import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CampaignService } from 'src/app/services/campaign/campaign.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {

  campaigns: any = []
  filteredCampaigns: any = []
  campaign_ended: Boolean = false
  campaign_pause: Boolean = false
  campaign_start: Boolean = false
  campaign_stop: Boolean = false
  progress_percentage: any
  progress_title: String = "completed"
  green = 'green'
  noSearch: Boolean = true
  searchOption: String = "Search by"
  searchStrings: any = ["Participants", "Name", "Date"]
  status: any = null
  success: Boolean = false
  failure: Boolean = false
  successMessage: String
  failureMessage: String
  p: number = 1
  test: any

  styles: any = {}

  constructor(private campaignService: CampaignService, private router: Router, private activeRouter: ActivatedRoute) {

  }

  public get camps(): [] {
    return this.campaigns
  }

  public get filteredCamps(): [] {
    return this.filteredCampaigns
  }

  ngOnInit(): void {
    this.campaignService.getAllCampaigns().subscribe((campaigns: any) => {
      console.log(campaigns)
      campaigns.map((res: any, i, arr) => {
        res.end_date = new Date(res.end_date).toDateString()
        res.expirationdate = new Date(res.expirationdate).toDateString()
        res.start_date = new Date(res.start_date).toDateString()
        res.updated_date = new Date(res.updated_date).toDateString()
        res.created_date = new Date(res.created_date).toDateString()
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
            console.log(arr[i].name)
            arr[i].paused = true
            return
          } else if (arr[i].status === 1) {
            if (arr[i].progress === `100%`) {
              arr[i].paused = true
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
    })
  }


  // handle search
  search(e) {
    let searchString = e.target.value
    if (this.searchOption !== "Search by") {
      this.noSearch = false
      const filteredSearch = this.campaigns.filter((campaign) => {
        // search by name
        if (this.searchOption === 'Name') {
          if (campaign.name.includes(searchString)) {
            return true
          }
        } else if (this.searchOption === 'Date') {
          if (campaign.start_date.includes(searchString)) {
            return true
          }
        } else if (this.searchOption === 'Participants') {
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
      this.successMessage = "Campaign started successfully."
      setTimeout(() => {
        this.success = false
        this.successMessage = ""
        this.router.navigate(['/user/analytics/report', id])
      }, 6000)
    }, error => {
      console.log(error)
      this.failure = true
      this.failureMessage = "An error occured. Campaign not started"
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
      this.failureMessage = "An error occured. Campaign not paused"
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
      this.failureMessage = "An error occured. Campaign not stopped"
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
      this.failureMessage = "An error occured. Campaign not deleted"
      setTimeout(() => {
        this.failure = false
        this.failureMessage = ""
      }, 2000)
    })
  }




}
