import { IvrService } from './../../services/ivr/ivr.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { Chart } from 'chart.js'
import { newArray } from '@angular/compiler/src/util';

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
  dispositions: any = []
  reportSurvey: any = {}
  failure: Boolean
  success: Boolean
  errorMessage: String = ""
  successMessage: String = ""

  constructor(private reportService: AnalyticsService, private activeRoute: ActivatedRoute, private router: Router, private ivrService: IvrService) {

  }

  ngOnInit(): void {

    this.activeRoute.params.subscribe((params: Params) => {
      this.reportId = Number(params.id)
    }, error => {
      this.failure = true
      this.errorMessage = error.message
      setTimeout(() => {
        this.failure = false
        this.errorMessage = ""
      }, 2000)
    })

    this.reportService.getSingleReport(this.reportId).subscribe((report: any) => {
      report.calltime = new Date(report.start_date).toLocaleString()
      report.start_date = new Date(report.start_date).toDateString()
      report.minutes = (report.minutes / 60).toFixed(0)
      report.surveyId = 1
    
      const { answered, busy, calltime, cancel, congestion, machine, noanswer, notsure, person, progress, replies, id, failed } = report

      
      this.ivrService.getIvrMenu(report.surveyId).subscribe((survey: any) => {
        // get ivr menu 
        let replies = []
        survey.data.forEach((survey, i, arr) => {
          replies.push(survey.value)
        })
        // const menus = ['Ignored']
        // const responses = []
        // let nines = []
        // const ignored = []
        // let menuKey, key
        // survey.data.forEach((menu, i, arr) => {
        //   menuKey = `Pressed ${arr[i].key}`
        //   menus.push(menuKey)
        // })

        // // filter responses
        // const respos = report._campaign.map((res, i, arr) => {
        //   return {'dst':arr[i].dst}
        // })

        // respos.forEach((respo, i, arr) => {
        //   if (respo.dst === null) {
        //     ignored.push(respo)
        //   }
        //   menus.filter((menu, i, arr) => {
        //     if (arr[i].endsWith(respo.dst)) {
        //       responses.push(respo)
        //     } 
        //   })
        // })
        
    

        // console.log(menus)
        // console.log(respos)
        
        // create doughnut chart
          this.doughnut = new Chart(`${this.doughnutChartId}`, {
            type: 'doughnut',
            data: {
              labels: ['Answer', 'Busy', 'Congestion', 'Failed', 'No Answer', 'Cancelled'],
              datasets: [{
                label: '# of Replies',
                data: [answered, busy, congestion, failed, noanswer, cancel ],
                backgroundColor: [
                  'purple',
                  'green',
                  'yellow',
                  'brown',
                  'pink',
                  'blue'
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
            labels: replies,
            datasets: [{
              label: '# of Replies',
              data: [90, 51, 21, 10],
              backgroundColor: [
                'green',
                'blue',
                'yellow',
                'purple'
                
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
            data: [[10, 12, 34, 99, 29], [1, 10, 44, 19, 22]],
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
        this.error = error
        this.failure = true
        this.errorMessage = error.message
        setTimeout(() => {
          this.failure = false
          this.errorMessage = ""
        }, 2000)
          
      })
      

    
      // get disposition
      report._campaign.map((campaign, i, arr) => {
        arr[i].calltime = new Date(arr[i].calldate).toLocaleTimeString()
        arr[i].calldate = new Date(arr[i].calldate).toDateString()

        // this.dispositions.push(arr[i].dst)
        
      })

      this.report = report
      


     }, error => {
      this.active = false
        this.error = error
        this.failure = true
        this.errorMessage = error.message
        setTimeout(() => {
          this.failure = false
          this.errorMessage = ""
        }, 2000)
  })

  }
}
