import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HostUrlService {

  constructor() {
    this.host = 'http://102.130.123.3';
  }
host = '';

}
