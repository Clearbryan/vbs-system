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
  report: any = {}
  active: Boolean = null
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
  // get single report
  this.reportService.getSingleReport(this.reportId).subscribe((data: any) => {
    this.active = true
    this.report = data
  }, error => {
      // handle error
      this.active = false
  })
    
  }

  ngDoCheck(): void {
    if (this.active) {
      setTimeout(() => {
        console.log(this.report)
        if (this.report.progress < 100) {
        // doghnut chart
        this.doughnutchart = new Chart(`${this.doughnutChartId}`, {
          type: 'pie',
          data: {
            labels: [`progress status`],
            datasets: [{
              data: [this.report.progress ]
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
        }
      }, 5000)
    
    }
    else {
      this.active = false
    }
         
  }


  //search
  search(e) {

  }

}
