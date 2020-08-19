import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DncAddComponent } from './dnc-add.component';

describe('DncAddComponent', () => {
  let component: DncAddComponent;
  let fixture: ComponentFixture<DncAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DncAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DncAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
