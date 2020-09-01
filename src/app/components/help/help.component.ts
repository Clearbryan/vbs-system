import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  showLeadsOption: Boolean
  showAudioOption: Boolean
  showIvrOption: Boolean
  showCampaignsOption: Boolean
  showAnalyticsOption: Boolean
  showPurchaseOption: Boolean
  constructor() { }

  ngOnInit(): void {
  }

  toggleLeads() {
    this.showLeadsOption ? this.showLeadsOption = false : this.showLeadsOption = true
  }
  toggleAudio() {
    this.showAudioOption ? this.showAudioOption = false : this.showAudioOption = true
  }
  toggleIvr() {
    this.showIvrOption ? this.showIvrOption = false : this.showIvrOption = true
  }
  toggleCampaigns() {
    this.showCampaignsOption ? this.showCampaignsOption = false : this.showCampaignsOption = true
  }
  toggleAnalytics() {
    this.showAnalyticsOption ? this.showAnalyticsOption = false : this.showAnalyticsOption = true
  }
  togglePurchase() {
    this.showPurchaseOption ? this.showPurchaseOption = false : this.showPurchaseOption = true
  }

}
