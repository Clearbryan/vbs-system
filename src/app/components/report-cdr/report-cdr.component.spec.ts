import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCdrComponent } from './report-cdr.component';

describe('ReportCdrComponent', () => {
  let component: ReportCdrComponent;
  let fixture: ComponentFixture<ReportCdrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCdrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCdrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
