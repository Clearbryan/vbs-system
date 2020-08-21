import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {

  reports: any = []
  searchStrings: any = ["Name", "Date"]
  searchOption: String = ""
  p: number = 1


  public get analytics(): [] {
    return this.reports
  }


  constructor(private analyticsService: AnalyticsService) {

  }

  ngDoCheck(): void {
    this.analyticsService.getAllReports().subscribe((response: any) => {
      response.map((res) => {
        res.start_date = new Date(res.start_date).toDateString()
      })
      this.reports = response
    }, error => {
      console.log(error)
    })
    
  }

  ngOnInit(): void {
    
  }

  // search
  search(e) {

  }

}
