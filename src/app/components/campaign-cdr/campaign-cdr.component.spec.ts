import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignCdrComponent } from './campaign-cdr.component';

describe('CampaignCdrComponent', () => {
  let component: CampaignCdrComponent;
  let fixture: ComponentFixture<CampaignCdrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignCdrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignCdrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
