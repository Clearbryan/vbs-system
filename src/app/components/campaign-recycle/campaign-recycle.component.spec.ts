import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignRecycleComponent } from './campaign-recycle.component';

describe('CampaignRecycleComponent', () => {
  let component: CampaignRecycleComponent;
  let fixture: ComponentFixture<CampaignRecycleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignRecycleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignRecycleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
