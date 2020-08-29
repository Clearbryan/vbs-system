import { CampaignService } from 'src/app/services/campaign/campaign.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AudioService } from 'src/app/services/audio/audio.service';
import { DncService } from 'src/app/services/dnc/dnc.service';
import { IvrService } from 'src/app/services/ivr/ivr.service';
import { PhonebookService } from 'src/app/services/phonebook/phonebook.service';

@Component({
  selector: 'app-campaigns-add',
  templateUrl: './campaigns-add.component.html',
  styleUrls: ['./campaigns-add.component.css']
})
export class CampaignsAddComponent implements OnInit {

  surveys: any = []
  contacts: any = []
  dncList: any = []
  audios: any = []
  status: any = null

  success: Boolean = false
  failure: Boolean = false
  errorMessage: String = ""
  successMessage: String = ""

  name: any = null
  phonebook: any = null
  survey: any = null
  dnc: any = null
  retry_on: any = []
  target: Number = 0
  callerid: any = ""
  audioFile: any = ""
  intervalretries: Number = 0
  maxretry: Number = 0
  calltimeout: Number = 0
  frequency: any = ""
  start_date: any = ""
  end_date: any = ""
  description: String = ""

  campaignResponse: any = {};
  campaignTarget: String;
  campaignLead: any;
  textTospeech: Boolean;
  toAudio: Boolean;
  leads: Boolean

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private ivrService: IvrService,
    private contactService: PhonebookService,
    private dncService: DncService,
    private campaignService: CampaignService,
    private audioService: AudioService
  ) {

  }

  ngOnInit(): void {
    // get all ivr menus
    this.ivrService.getAllIvrMenus().subscribe((response: any) => {
      console.log(response)
      this.surveys = response
    }, error => {
      // handle error
        console.log(error)
        this.failure = true
        this.errorMessage = error.message
        setTimeout(() => {
          this.failure = false
          this.errorMessage = ""
        }, 2000)
    })

    // get all phonebooks
    this.contactService.getAllContacts().subscribe((contacts: any) => {
      console.log(contacts);
      this.contacts = contacts;
    }, error => {
      // handle error
        console.log(error)
        this.failure = true
        this.errorMessage = error.message
        setTimeout(() => {
          this.failure = false
          this.errorMessage = ""
        }, 2000)
    })

    // get all dncs
    this.dncService.getAllDnc().subscribe((dnc: any) => {
      console.log(dnc)
      this.dncList = dnc
    }, error => {
      // handle error
        console.log(error)
        this.failure = true
        this.errorMessage = error.message
        setTimeout(() => {
          this.failure = false
          this.errorMessage = ""
        }, 2000)
    })

    // get all audio files
    this.audioService.getAllAudiofiles().subscribe((audios: any) => {
      console.log(audios);
      this.audios = audios
    }, error => {
        console.log(error);
        this.failure = true
        this.errorMessage = error.message
        setTimeout(() => {
          this.failure = false
          this.errorMessage = ""
        }, 2000)
    })
  }


  onRetryChange(e) {
    let checked = e.target.checked
    if (checked) {
      let retry_name = e.target.name.toUpperCase()
      this.retry_on.push(retry_name)
    }
    if (!checked) {
      // this.retry_on.filter((retry, i, arr) => {
      //   arr.slice(retry)

      // })
      // console.log(this.retry_on)
    }
    console.log(this.retry_on)
  }


  // run campaign
  runcampaign() {
    console.log(this.campaignTarget);

  }

  // save campaign
  saveCampaign() {
    console.log(this.start_date)
    if (this.retry_on.length > 0) {
      this.retry_on = this.retry_on.toString().trim()
      this.campaignService.saveCampaign(this.name, this.phonebook, this.description, this.start_date, this.frequency, this.callerid, this.calltimeout, this.intervalretries, this.maxretry, this.target, this.dnc, this.survey, this.retry_on).subscribe((response: any) => {
        // console.log(response)
        this.success = true
        setTimeout(() => {
          this.success = false
          this.successMessage = "Campaign successfully saved"
          this.router.navigate(['/user/campaigns'])
        }, 2000)
      }, error => {
        // handle error
        console.log(error)
        this.failure = true
        this.errorMessage = error.message
        setTimeout(() => {
          this.failure = false
          this.errorMessage = ""
        }, 2000)
      })
    } else {
      this.retry_on = this.retry_on.toString().trim()
      this.campaignService.saveCampaign(this.name, this.phonebook, this.description, this.start_date, this.frequency, this.callerid, this.calltimeout, this.intervalretries, this.maxretry, this.target, this.dnc, this.survey, this.retry_on).subscribe((response: any) => {
        // console.log(response)
        this.success = true
        this.successMessage = "Successfull."
        setTimeout(() => {
          this.success = false
          this.router.navigate(['/user/campaigns'])
        }, 2000)
      }, error => {
        // handle error
        console.log(error)
        this.failure = true
        this.errorMessage = error.message
        setTimeout(() => {
          this.failure = false
          this.errorMessage = ""
        }, 2000)
      })
    }
  }

  //get campaign target
  getTarget(e) {
    const target = e.target.value;
    if (target.includes('Sms')) {
      this.toAudio = false;
      this.textTospeech = true;
    }
    if (target.includes('Voice')) {
      this.textTospeech = false;
      this.toAudio = true;
    }
  }

  // get campaign lead file
  getCampaign(e) {
    const lead = e.target;
    console.log(e)
  }

}
