import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DsgvoComponent } from './dsgvo.component';

describe('DsgvoComponent', () => {
  let component: DsgvoComponent;
  let fixture: ComponentFixture<DsgvoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DsgvoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DsgvoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
