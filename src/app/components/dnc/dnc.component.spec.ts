import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DncComponent } from './dnc.component';

describe('DncComponent', () => {
  let component: DncComponent;
  let fixture: ComponentFixture<DncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
