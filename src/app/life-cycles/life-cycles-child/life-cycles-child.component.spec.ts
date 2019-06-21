import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeCyclesChildComponent } from './life-cycles-child.component';

describe('LifeCyclesChildComponent', () => {
  let component: LifeCyclesChildComponent;
  let fixture: ComponentFixture<LifeCyclesChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifeCyclesChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeCyclesChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
