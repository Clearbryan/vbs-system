import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-campaigns-running',
  templateUrl: './campaigns-running.component.html',
  styleUrls: ['./campaigns-running.component.css']
})
export class CampaignsRunningComponent implements OnInit {
  @Input() campaigns: any = []

  constructor() { }

  ngOnInit(): void {
    console.log(this.campaigns)
  }

}
