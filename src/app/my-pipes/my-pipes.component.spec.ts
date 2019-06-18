import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPipesComponent } from './my-pipes.component';

describe('MyPipesComponent', () => {
  let component: MyPipesComponent;
  let fixture: ComponentFixture<MyPipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
