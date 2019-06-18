import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-pipes',
  templateUrl: './my-pipes.component.html',
  styleUrls: ['./my-pipes.component.scss']
})
export class MyPipesComponent implements OnInit {

  number: number;

  constructor() { }

  ngOnInit() {
  }

}
