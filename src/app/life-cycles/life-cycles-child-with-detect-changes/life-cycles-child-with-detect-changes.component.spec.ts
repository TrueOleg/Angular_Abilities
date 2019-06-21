import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeCyclesChildWithDetectChangesComponent } from './life-cycles-child-with-detect-changes.component';

describe('LifeCyclesChildWithDetectChangesComponent', () => {
  let component: LifeCyclesChildWithDetectChangesComponent;
  let fixture: ComponentFixture<LifeCyclesChildWithDetectChangesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifeCyclesChildWithDetectChangesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeCyclesChildWithDetectChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
