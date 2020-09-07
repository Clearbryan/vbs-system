import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import html2canvas from 'html2canvas';
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

      report.answerablity = ((report.answered / callsMade ) * 100 ).toFixed(0)

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
    const data = document.getElementById('content');  //Id of the table
    html2canvas(data, {backgroundColor: null}).then(canvas => {  
      // Few necessary setting options  
      let imgWidth = 208;   
      let pageHeight = 350;    
      let imgHeight = canvas.height * imgWidth / canvas.width;  
      let heightLeft = imgHeight;  

      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      let position = 3;  
      pdf.addImage(contentDataURL, 'PNG', 3, position, imgWidth, imgHeight)  
      pdf.save(`${this.report.name}.pdf`); // Generated PDF   
    });
  }  

}
