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
  linechart: any = []
  lineChartId: String = "linechart"
  doughnut: any = []
  doughnutChartId: String = "doughnut"
  pieChartId: String = "piechart"

  constructor(private reportService: AnalyticsService, private activeRoute: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {

    this.activeRoute.params.subscribe((params: Params) => {
      this.reportId = Number(params.id)
    })

    this.reportService.getSingleReport(this.reportId).subscribe((report: any) => {
        report.start_date = new Date(report.start_date).toDateString()
        report.calltime = new Date(report.start_date).toLocaleString()
        report.minutes = report.minutes / 60
        this.report = report
      console.log(report)
        // create doughnut chart
        this.doughnut = new Chart(`${this.doughnutChartId}`, {
          type: 'doughnut',
          data: {
            labels: ['Answer', 'Busy', 'Voicemail', 'Congestion', 'Failed', 'No Answer'],
            datasets: [{
              label: '# of Replies',
              data: [10, 23, 25, 90, 33, 51 ],
              backgroundColor: [
                'purple',
                'green',
                'blue',
                'yellow',
                'brown',
                'pink'
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
      
      // create piechart
      this.piechart = new Chart(`${this.pieChartId}`, {
        type: 'pie',
        data: {
          labels: ['Pressed 9', 'Pressed 5', 'Pressed 1'],
          datasets: [{
            label: '# of Replies',
            data: [90, 51, 21 ],
            backgroundColor: [
              'green',
              'blue',
              'yellow'
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

      this.linechart = new Chart(`${this.lineChartId}`, {
          
        type: 'line',
        data: {
          labels: [`7:00 am`, '8:00 am', '9am:00 ', '10:00 am', '11:00 am'],
          datasets: [{
            label: '# of Replies',
            data: [10, 12, 34, 99, 29],
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

  }
}
