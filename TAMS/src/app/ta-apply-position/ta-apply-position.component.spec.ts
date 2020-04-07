import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaApplyPositionComponent } from './ta-apply-position.component';

describe('TaApplyPositionComponent', () => {
  let component: TaApplyPositionComponent;
  let fixture: ComponentFixture<TaApplyPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaApplyPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaApplyPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
