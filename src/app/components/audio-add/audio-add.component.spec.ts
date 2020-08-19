import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioAddComponent } from './audio-add.component';

describe('AudioAddComponent', () => {
  let component: AudioAddComponent;
  let fixture: ComponentFixture<AudioAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
