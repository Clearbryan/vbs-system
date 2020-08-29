import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignDuplicateComponent } from './campaign-duplicate.component';

describe('CampaignDuplicateComponent', () => {
  let component: CampaignDuplicateComponent;
  let fixture: ComponentFixture<CampaignDuplicateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignDuplicateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignDuplicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
