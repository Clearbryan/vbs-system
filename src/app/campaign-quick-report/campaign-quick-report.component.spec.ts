import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignQuickReportComponent } from './campaign-quick-report.component';

describe('CampaignQuickReportComponent', () => {
  let component: CampaignQuickReportComponent;
  let fixture: ComponentFixture<CampaignQuickReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignQuickReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignQuickReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
