import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-report-single',
  templateUrl: './report-single.component.html',
  styleUrls: ['./report-single.component.css']
})
export class ReportSingleComponent implements OnInit {

  reportId: Number
  error: any = {}
  active: Boolean = true
  report: any = {}
  _report: any = []
  piechart: any = []
  pieChartId: String = "piechart"

  constructor(private reportService: AnalyticsService, private activeRoute: ActivatedRoute, private router: Router) {

  }

  ngDoCheck(): void {
   
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.reportId = Number(params.id)
    })

       // get single report data
       this.reportService.getSingleReport(this.reportId).subscribe((report: any) => {
        this.active = true
        
        report.start_date = new Date(report.start_date).toDateString()
        report.calltime = new Date(report.start_date).toLocaleString()
        this.report = report
        
        // convert time
        report._campaign.filter((report, i, arr) => {
          arr.map((report, i, arr) => {
            arr[i].calltime = new Date(arr[i].calldate).toLocaleTimeString()
            arr[i].calldate = new Date(arr[i].calldate).toDateString()
          })
          if (arr[i].id === this.reportId) {
            this._report = report._campaign
          }
        })
        console.log(this.report)
  
        this.piechart = new Chart(`${this.pieChartId}`, {
          type: 'bar',
          data: {
            labels: [`Calls`, 'Replies'],
            datasets: [{
              label: '# of Replies',
              data: [this.report.calls, this.report.replies],
              backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)'
  
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        })
        
      }, error => {
          this.active = false
          this.error = error
      })
    // console.log(this.report)
  }
  //search
  search(e) {

  }
}
