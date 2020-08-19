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
  report: any = []
  piechart: any = []
  pieChartId: String = "piechart"

  constructor(private reportService: AnalyticsService, private activeRoute: ActivatedRoute, private router: Router) {


  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.reportId = Number(params.id)
    })
    // get single report data
    this.reportService.getAllReports().subscribe((report: any) => {
      report.filter((report, i, arr) => {
        console.log(arr)
        arr.map((report, i, arr) => {
          arr[i].calltime = new Date(arr[i].start_date).toLocaleTimeString()
          arr[i].start_date = new Date(arr[i].start_date).toDateString()
        })
        if (arr[i].id === this.reportId) {
          this.report = report
        }
      })
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
      console.log(error)
    })
  }

  //search
  search(e) {

  }
}
