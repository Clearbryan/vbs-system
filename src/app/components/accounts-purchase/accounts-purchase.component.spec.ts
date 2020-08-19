import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsPurchaseComponent } from './accounts-purchase.component';

describe('AccountsPurchaseComponent', () => {
  let component: AccountsPurchaseComponent;
  let fixture: ComponentFixture<AccountsPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsPurchaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
