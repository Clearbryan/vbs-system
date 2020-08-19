import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DncViewComponent } from './dnc-view.component';

describe('DncViewComponent', () => {
  let component: DncViewComponent;
  let fixture: ComponentFixture<DncViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DncViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DncViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
