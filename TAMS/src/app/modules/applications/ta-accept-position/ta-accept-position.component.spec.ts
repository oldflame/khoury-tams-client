import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaAcceptPositionComponent } from './ta-accept-position.component';

describe('TaAcceptPositionComponent', () => {
  let component: TaAcceptPositionComponent;
  let fixture: ComponentFixture<TaAcceptPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaAcceptPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaAcceptPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
