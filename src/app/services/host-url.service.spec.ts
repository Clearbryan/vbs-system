import { TestBed } from '@angular/core/testing';

import { HostUrlService } from './host-url.service';

describe('HostUrlService', () => {
  let service: HostUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
