import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TermineComponent } from './termine.component';

describe('TermineComponent', () => {
  let component: TermineComponent;
  let fixture: ComponentFixture<TermineComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TermineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
