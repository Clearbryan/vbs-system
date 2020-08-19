import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IvrAddComponent } from './ivr-add.component';

describe('IvrAddComponent', () => {
  let component: IvrAddComponent;
  let fixture: ComponentFixture<IvrAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IvrAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IvrAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
