import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsRunningComponent } from './campaigns-running.component';

describe('CampaignsRunningComponent', () => {
  let component: CampaignsRunningComponent;
  let fixture: ComponentFixture<CampaignsRunningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsRunningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsRunningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
