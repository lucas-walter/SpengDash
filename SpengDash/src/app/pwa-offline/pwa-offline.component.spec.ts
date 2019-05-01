import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PwaOfflineComponent } from './pwa-offline.component';

describe('PwaOfflineComponent', () => {
  let component: PwaOfflineComponent;
  let fixture: ComponentFixture<PwaOfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PwaOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PwaOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
