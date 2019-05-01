import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StundenplanComponent } from './stundenplan.component';

describe('StundenplanComponent', () => {
  let component: StundenplanComponent;
  let fixture: ComponentFixture<StundenplanComponent>;

  beforeEach(async(() => {
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
