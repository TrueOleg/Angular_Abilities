import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySafeDecoratorComponent } from './my-safe-decorator.component';

describe('MySafeDecoratorComponent', () => {
  let component: MySafeDecoratorComponent;
  let fixture: ComponentFixture<MySafeDecoratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySafeDecoratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySafeDecoratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
