import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltimeComponent } from './alltime.component';

describe('AlltimeComponent', () => {
  let component: AlltimeComponent;
  let fixture: ComponentFixture<AlltimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlltimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlltimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
