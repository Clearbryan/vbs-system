import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AnalyticsService } from 'src/app/services/analytics/analytics.service';
import { ExportToCsv } from 'export-to-csv';
import { ngxCsv } from 'ngx-csv';

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
  searchStrings: any = ["Number", "Date", "Disposition", "Bill/Sec", "Duration", "Response"]
  noSearch: Boolean = true
  active: Boolean = true
  error: any = {}
  range: Boolean
  errorMessage: String = ""
  failure: Boolean


  constructor(private reportService: AnalyticsService, private activeRoute: ActivatedRoute) { }
  p: number = 1;

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
      console.log(report)
      report._campaign.map((res) => {
        if (res.dst === null) {
          res.dst = 'IGNORED'
        }
      })
       this.active = true
      if (report.id === this.reportId) {
        report._campaign.map((_report, i, arr) => {
          _report.calltime = new Date(_report.calldate).toLocaleTimeString()
          _report.calldate = new Date(_report.calldate).toDateString()
          
          report.start_date = new Date(report.start_date).toDateString()
        })
        this.report = report
      }
      console.log(this.report)
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

  // ngOnInit(): void {

   
   
  // }

  // export to csv
  
  export() {
    let csvExporter
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: `${this.report.name} - ${this.report.start_date}`,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    }
    if (!this.noSearch) {
      csvExporter = new ExportToCsv(options)
      csvExporter.generateCsv(this.filteredReports)
    }
    if (this.noSearch) {
      csvExporter = new ExportToCsv(options)
      csvExporter.generateCsv(this.report._campaign)
    }
  }

  search(e) {
    let searchString = e.target.value
    if (this.searchOption !== "Search by") {
      this.noSearch = false
      // console.log(this.report)
      const filteredSearch = this.report._campaign.filter((report, i, arr) => {
        if (this.searchOption === '') {
          return true
        }
        else if (this.searchOption === 'Number') {
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
            }
          } else {
            return false
          }
        }
        else if (this.searchOption === 'Response') {
          if (arr[i].dst !== null) {
            if (Number(arr[i].dst) === Number(searchString)) {
              return true
            } else if (arr[i].dst.includes(searchString)) {
              return true
            } else {
              return false
            }
          }
        }
        else if (this.searchOption === 'Duration') {
          // this.range = true
          let values = searchString.split('-')
          if (values.length === 2) {
            if (arr[i].duration >= Number(values[0]) && arr[i].duration <= Number(values[1])) {
              console.log(report)
              return true
            }
          } else {
            this.failure = true
            this.errorMessage = "Enter a range of 2 numbers to filter by call duration separated by - eg(5-20)"
            setTimeout(() => {
              this.failure = false
              this.errorMessage = ""
            }, 5000)
          }
          
          
          
        } else if (this.searchOption === 'Bill/Sec') {
          // this.range = true
          let values = searchString.split('-')
          if (values.length === 2) {
            if (arr[i].billsec >= Number(values[0]) && arr[i].billsec <= Number(values[1])) {
              console.log(report)
              return true
            }
          } else {
            this.failure = true
            this.errorMessage = "Enter a range of 2 numbers to filter by bill/sec separated by - eg(5-20)"
            setTimeout(() => {
              this.failure = false
              this.errorMessage = ""
            }, 5000)
          }
        }
      })

      this.filteredReports = filteredSearch

    }
  }

}
