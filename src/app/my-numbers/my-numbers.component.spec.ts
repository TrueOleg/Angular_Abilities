import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNumbersComponent } from './my-numbers.component';

describe('MyNumbersComponent', () => {
  let component: MyNumbersComponent;
  let fixture: ComponentFixture<MyNumbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyNumbersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
