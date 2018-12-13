import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeratioComponent } from './likeratio.component';

describe('LikeratioComponent', () => {
  let component: LikeratioComponent;
  let fixture: ComponentFixture<LikeratioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikeratioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikeratioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
