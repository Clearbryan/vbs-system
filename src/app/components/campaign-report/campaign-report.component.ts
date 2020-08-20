import { CdrService } from './../../services/cdr/cdr.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-campaign-report',
  templateUrl: './campaign-report.component.html',
  styleUrls: ['./campaign-report.component.css']
})
export class CampaignReportComponent implements OnInit {
  reportId: Number
  report: any = []
  piechart: any = []
  pieChartId: String = "piechart"
  doughnutchart: any = []
  doughnutChartId: String = "doghnutchart"

  constructor(private reportService: AnalyticsService, private activeRoute: ActivatedRoute, private router: Router, private cdrService: CdrService) {


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
        type: 'pie',
        data: {
          labels: [`Calls`, `Replies`, `Minutes`],
          datasets: [{
            label: 'Replies, Calls, Minutes',
            data: [this.report.calls, this.report.replies, this.report.minutes],
            backgroundColor: [
              'rgba(74, 71, 158, 1)',
              '#A27DCA',
              '#7D9ECA'


            ],
            borderColor: [
              '#7D9ECA',
              '#7D9ECA',
              'rgba(74, 71, 158, 1)'
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

    // get single report
    this.reportService.getSingleReport(this.reportId).subscribe((data: any) => {
      console.log(data)
      // doghnut chart
      this.doughnutchart = new Chart(`${this.doughnutChartId}`, {
        type: 'doughnut',
        data: {
          labels: [`progress status`],
          datasets: [{
            data: [data.progress]
          }],
          backgroundColor: 'green',
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ]
        },
        borderWidth: 1,
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
        // handle error
        console.log(error)
    })
  }

  //search
  search(e) {

  }

}
