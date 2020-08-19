import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvrEditComponent } from './ivr-edit.component';

describe('IvrEditComponent', () => {
  let component: IvrEditComponent;
  let fixture: ComponentFixture<IvrEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvrEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvrEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
