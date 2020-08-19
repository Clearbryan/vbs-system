import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSingleComponent } from './report-single.component';

describe('ReportSingleComponent', () => {
  let component: ReportSingleComponent;
  let fixture: ComponentFixture<ReportSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
