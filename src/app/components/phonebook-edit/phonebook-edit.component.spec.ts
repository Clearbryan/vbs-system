import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonebookEditComponent } from './phonebook-edit.component';

describe('PhonebookEditComponent', () => {
  let component: PhonebookEditComponent;
  let fixture: ComponentFixture<PhonebookEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonebookEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonebookEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
