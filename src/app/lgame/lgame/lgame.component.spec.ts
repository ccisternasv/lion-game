import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LgameComponent } from './lgame.component';

describe('LgameComponent', () => {
  let component: LgameComponent;
  let fixture: ComponentFixture<LgameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LgameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LgameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
