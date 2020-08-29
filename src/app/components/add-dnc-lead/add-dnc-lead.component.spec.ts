import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDncLeadComponent } from './add-dnc-lead.component';

describe('AddDncLeadComponent', () => {
  let component: AddDncLeadComponent;
  let fixture: ComponentFixture<AddDncLeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDncLeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDncLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
