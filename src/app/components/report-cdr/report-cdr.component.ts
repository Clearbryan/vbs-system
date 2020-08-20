import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

@Component({
  selector: 'app-report-cdr',
  templateUrl: './report-cdr.component.html',
  styleUrls: ['./report-cdr.component.css']
})
export class ReportCdrComponent implements OnInit {

  report: any = []
  filteredReports: any = []
  reportId: Number
  searchOption: String = "Search by"
  searchStrings: any = ["Number", "Date", "Disposition"]
  noSearch: Boolean = true


  constructor(private reportService: AnalyticsService, private activeRoute: ActivatedRoute) { }
  p: number = 1;

  ngOnInit(): void {

    this.activeRoute.params.subscribe((params: Params) => {
      this.reportId = Number(params.id)
    })
    // get single report data
    this.reportService.getSingleReport(this.reportId).subscribe((report: any) => {
      if (report.id === this.reportId) {
        report._campaign.map((_report, i, arr) => {
          _report.calldate = new Date(_report.calldate).toDateString()
          report.start_date = new Date(report.start_date).toDateString()
        })
        this.report = report
      }
      // console.log(this.report._campaign)
    }, error => {
      console.log(error)
    })
  }

  search(e) {
    let searchString = e.target.value
    if (this.searchOption !== "Search by") {
      this.noSearch = false
      // console.log(this.report)
      const filteredSearch = this.report._campaign.filter((report, i, arr) => {
        if (this.searchOption === 'Number') {
          if (arr[i].contact !== null) {
            if (arr[i].contact.includes(searchString)) {
              return true
            }
          } else {
            return false
          }
          
        }
        else if (this.searchOption === 'Date') {
          if (arr[i].calldate.includes(searchString)) {
            return true
          }
        }
        else if (this.searchOption === 'Disposition') {
          if (arr[i].disposition !== null) {
            if (arr[i].disposition.includes(searchString)) {
              return true
            } else {
              return false
            }
          } else {
            return false
          }

        }
        else {
          return false
        }
      })

      this.filteredReports = filteredSearch

    }
  }

}
