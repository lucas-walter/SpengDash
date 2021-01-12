import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StundenplanComponent } from './stundenplan.component';

describe('StundenplanComponent', () => {
  let component: StundenplanComponent;
  let fixture: ComponentFixture<StundenplanComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StundenplanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StundenplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
