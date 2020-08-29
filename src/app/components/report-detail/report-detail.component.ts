import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { jsPDF } from 'jspdf'
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';

@Component({
  selector: 'app-report-detail',
  templateUrl: './report-detail.component.html',
  styleUrls: ['./report-detail.component.css']
})
  

export class ReportDetailComponent implements OnInit {
  report: any = {}
  reportId: Number
  // active: Boolean
  // error: any = {}
  errorMessage: String = ""
  failure: Boolean
  belowFiveSec: any = []
  belowTenSec: any = []
  belowTwentySec: any = []
  dataId = "content"
  

  // @ViewChild('content') content: ElementRef; 


  constructor(private reportService: AnalyticsService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
     // get single report data
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
       // get total calls made
      let callsMade = report._campaign.length
      report.contactability = ((report.answered / 100) * callsMade)

      //  this.active = true
      if (report.id === this.reportId) {
        report._campaign.map((_report, i, arr) => {
          _report.calldate = new Date(_report.calldate).toDateString()
          report.start_date = new Date(report.start_date).toDateString()
        })

        // filter below 5 seconds
        report._campaign.filter((report, i, arr) => {
          if (arr[i].duration < Number(5)) {
            this.belowFiveSec.push(report)
          }
          if (arr[i].duration < Number(10)) {
            this.belowTenSec.push(report)
          }
          if (arr[i].duration < Number(20)) {
            this.belowTwentySec.push(report)
          }
        })
        this.report = report
      }
       console.log(this.report)
       console.log(this.belowTwentySec)
    }, error => {
        console.log(error)
        this.failure = true
        this.errorMessage = error.message
        setTimeout(() => {
          this.failure = false
          this.errorMessage = ""
        }, 2000)
    })
  }
  
  
  public export(): void {
    let data = document.getElementById('content').innerText
    const doc = new jsPDF()
    doc.text(data, 10, 10, {
      
    })
    
    doc.save(`${this.report.name}.pdf`)
     
  }  

}
