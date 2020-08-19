import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonebookAddComponent } from './phonebook-add.component';

describe('PhonebookAddComponent', () => {
  let component: PhonebookAddComponent;
  let fixture: ComponentFixture<PhonebookAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhonebookAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonebookAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
