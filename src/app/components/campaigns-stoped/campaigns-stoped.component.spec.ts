import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsStopedComponent } from './campaigns-stoped.component';

describe('CampaignsStopedComponent', () => {
  let component: CampaignsStopedComponent;
  let fixture: ComponentFixture<CampaignsStopedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsStopedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsStopedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
