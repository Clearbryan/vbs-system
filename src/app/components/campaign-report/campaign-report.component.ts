import { CdrService } from './../../services/cdr/cdr.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { Chart } from 'chart.js';
import { interval, Subscription } from 'rxjs'

@Component({
  selector: 'app-campaign-report',
  templateUrl: './campaign-report.component.html',
  styleUrls: ['./campaign-report.component.css']
})
export class CampaignReportComponent implements OnInit {
  reportId: Number
  @Input() report: any = {}
  stuff: any = []
  active: Boolean = null
  barchart: any = null
  barchartId: String = "barchart"
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
    setInterval(() => {
      this.reportService.getSingleReport(this.reportId).subscribe((data: any) => {
        // this.active = true
        console.log(data)
        data.start_date = new Date(data.start_date).toDateString()
        this.report = data
  
        
          this.report = data
  
          this.piechart = new Chart(`${this.pieChartId}`, {
            
            type: 'line',
            data: {
              labels: [`Calls`, 'Replies'],
              datasets: [{
                label: '# of Replies',
                data: [
                  [data.calls, data.progress],
                  [10, 45]
                ],
                backgroundColor: [
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 99, 132, 0.2)'
      
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
          // handle error
          this.active = false
          console.log(error)
      })
     }, 5000)

 
  }

 

}
