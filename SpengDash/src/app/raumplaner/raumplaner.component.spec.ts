import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RaumplanerComponent } from './raumplaner.component';

describe('RaumplanerComponent', () => {
  let component: RaumplanerComponent;
  let fixture: ComponentFixture<RaumplanerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RaumplanerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaumplanerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
