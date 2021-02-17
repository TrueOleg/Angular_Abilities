import {Component, Input, OnInit} from '@angular/core';
import DragedComponentInterface from '../interfaces/dragedComponent.interface';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.scss']
})
export class TestComponentComponent implements OnInit {
  @Input()arrIndex!: number;
  @Input()component!: DragedComponentInterface;
  constructor() { }

  ngOnInit(): void {
    console.log('>>>>', this.component);
  }

}
