import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AudioService } from 'src/app/services/audio/audio.service';
import { IvrService } from 'src/app/services/ivr/ivr.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-ivr-add',
  templateUrl: './ivr-add.component.html',
  styleUrls: ['./ivr-add.component.css']
})
export class IvrAddComponent implements OnInit {

  success: Boolean = false
  failure: Boolean = false
  response: any = {}
  audios: any = []
  audioFile: String;
  phone: Boolean = false;
  key_associations: Boolean = false
  invalid: Boolean
  btn_valid: Boolean = false
  file: any;
  name: String;
  desc: String;
  audio: Number = 0


  getForm: Boolean = false
  // ivrname: String;
  // ivr_desc: String;
  // ivr_audio: String;
  noresponses: Boolean = false
  notValidIvr: Boolean = true
  keyName: String = ''
  keyValue: String = ''
  keyNames: any = [
    { name: 1 },
    { name: 2 },
    { name: 3 },
    { name: 4 },
    { name: 5 },
    { name: 6 },
    { name: 7 },
    { name: 8 },
    { name: 9 },
    { name: '*' },
    { name: 0 },
    { name: '#' }
  ]

  responses: any = []


  constructor(private userService: UserService, private audioService: AudioService, private ivrService: IvrService, private router: Router) {
    this.responses.length < 0 ? this.notValidIvr = true : this.notValidIvr = false;

  }

  ngOnInit(): void {
    this.invalid = true
    // get ivr audios
    this.audioService.getAllAudiofiles().subscribe((audio: any) => {

      this.audios = audio
    }, error => {
      // handle error
      console.log(error)
    })

  };

  value(e) {
    this.keyValue = e.target.value
    let response = new Set()
    let preRes = {
      key: this.keyName,
      value: e.target.value
    }
    response.add(preRes)
    response.forEach((entry) => {
      this.responses.push(entry)
    })
    if (this.responses.length < 0) {
      this.noresponses = true
    } else {
      this.noresponses = false
    }
  }

  openForm(name, value) {
    this.getForm = true
    this.keyName = name
    this.keyValue = value

  }

  check() {
    if (typeof this.name === 'undefined' || typeof this.desc === 'undefined') {
      this.invalid = true
      this.btn_valid = false
    } else {
      this.btn_valid = true
    }
  }

  getFile(e) {
    this.file = e.target.files[0]
  }

  // check if input fields are valid

  addKeyAssociations() {
    if (typeof this.name === 'undefined' && typeof this.desc === 'undefined') {
      this.invalid = true
    } else {
      this.phone = true
    }
  }

  // send IVR to backend
  submitIvr() {
    console.log(this.responses)
    this.ivrService.submitIvrMenu(this.name, this.desc, this.audio, JSON.stringify(this.responses)).subscribe((response: any) => {
      this.success = true;
      setTimeout(() => {
        this.router.navigate(['/user/ivr'])
        this.success = false
      }, 2000)
    }, error => {
      // handle error
      console.log(error)
      this.failure = true;
      setTimeout(() => {
        this.failure = false
      }, 1500)
    })

  }


}
