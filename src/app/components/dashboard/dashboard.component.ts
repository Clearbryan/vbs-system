import { Chart } from 'chart.js';
import { CampaignService } from './../../services/campaign/campaign.service';
import { UserService } from './../../services/user/user.service';
import { AfterViewChecked, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewChecked {
  user: any = []
  campaigns: any = []
  completedCampaigns: any = []
  pausedCampaigns: any = []
  activeCampaigns: any = []
  schedulledCampaigns: any = []
  recentCampaign: any = {}
  recentThreeCampaigns: any = []
  balanceColor: String = ""
  failure: Boolean
  success: Boolean
  errorMessage: String = ""
  successMessage: String = ""
  linechart: any = []
  lineChartId: String = "linechart"


  constructor(private userService: UserService, private campaignService: CampaignService) { 
    this.userService.getUserBalance().subscribe((response: any) => {
      // console.log(response)
      response[0].minutes = (response[0].minutes / 60).toFixed(0)
      this.user = response[0]
      if (this.user.minutes <= 50) {
        this.balanceColor = 'display-income text-danger'
      } else {
        this.balanceColor = 'display-income text-success'
      }
    }, error => {
        console.log(error)
      // this.failure = true
      // this.errorMessage = error.message
      // setTimeout(() => {
      //   this.failure = false
      //   this.errorMessage = ""
      // }, 2000)
    })
  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    console.log(this.user)
    
  }

  ngOnInit(): void {

    

    // get campaigns
    this.campaignService.getAllCampaigns().subscribe((campaigns: any) => {
      campaigns.map((c) => {
        c.calltime = new Date(c.start_date).toLocaleTimeString()
        c.calldate = new Date(c.start_date).toDateString()
        c.name = c.name.substr(0,25).trim()
      })
      
      this.recentCampaign = campaigns[0]

      this.recentThreeCampaigns.push(campaigns[0])
      this.recentThreeCampaigns.push(campaigns[1])
      this.recentThreeCampaigns.push(campaigns[2])
      
      console.log(this.recentThreeCampaigns)
      campaigns.map((campaign, i, arr) => {
        arr[i].start_date = new Date(arr[i].start_date).toDateString()
        if (arr[i].status === 4) {
          this.completedCampaigns.push(arr[i])
        }
        if (arr[i].status === 2) {
          this.pausedCampaigns.push(arr[i])
        }
        if (arr[i].status === 1) {
          this.activeCampaigns.push(arr[i])
        }
  
      })
      this.failure = true
      // this.errorMessage = error.message
      // setTimeout(() => {
      //   this.failure = false
      //   this.errorMessage = ""
      // }, 2000)
      
      
    }, error => {
        // handle error 
        // console.log(error)
        // this.failure = true
        // this.errorMessage = error.message
        // setTimeout(() => {
        //   this.failure = false
        //   this.errorMessage = ""
        // }, 2000)
    })
    
  }
// recycle
  recycle(id) {
    this.campaignService.recycleCampaign(id, ['ANSWER', 'BUSY']).subscribe((duplicate: any) => {
      // console.log(duplicate)
      this.success = true
      this.successMessage = "Campaign recycle successful"
      setTimeout(() => {
        this.success = false
        this.successMessage = ""
      }, 1500)
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


