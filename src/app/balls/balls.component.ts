import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import * as _ from 'lodash';

function randomNegative() {
  return Math.floor(Math.random() * 2) === 1 ? 1 : -1;
}

function randomHexColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

class Ball {
  radius = this.radius = _.random(10, 50);
  x: number;
  y: number;
  xVel: number;
  yVel: number;
  color: string;
  STAGE_WIDTH: number;
  STAGE_HEIGHT: number;
  context: CanvasRenderingContext2D;

  constructor(
    width: number,
    height: number,
    ctx: CanvasRenderingContext2D) {
    this.STAGE_WIDTH = width;
    this.STAGE_HEIGHT = height;
    this.context = ctx;

    this.radius = _.random(10, 50);

    this.x = _.random(this.radius, this.STAGE_WIDTH - this.radius);
    this.y = _.random(this.radius, this.STAGE_HEIGHT - this.radius);
    this.xVel = _.random(1, 5) * randomNegative();
    this.yVel = _.random(1, 5) * randomNegative();
    this.color = randomHexColor();
  }

  update() {
    this.x += this.xVel;
    this.y += this.yVel;

    if (this.x + this.radius > this.STAGE_WIDTH) {
      this.xVel = Math.abs(this.xVel) * -1;
    }

    if (this.y + this.radius > this.STAGE_HEIGHT) {
      this.yVel = Math.abs(this.yVel) * -1;
    }

    if (this.x - this.radius < 0) {
      this.xVel = Math.abs(this.xVel);
    }

    if (this.y - this.radius < 0) {
      this.yVel = Math.abs(this.yVel);
    }
  }

  draw() {
    if (this.color) {
      this.context.fillStyle = this.color;
    }

    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this.context.closePath();

    this.context.fill();
  }
}

@Component({
  selector: 'app-balls',
  templateUrl: './balls.component.html',
  styleUrls: ['./balls.component.scss']
})
export class BallsComponent implements OnInit {

  @ViewChild('mycanvas')
  element: ElementRef;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  STAGE_WIDTH;
  STAGE_HEIGHT;
  balls: Ball[] = [];

  constructor(
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    console.log('canvas', this.canvas);
    this.canvas = this.element.nativeElement;
    this.context = this.canvas.getContext('2d');
    this.STAGE_WIDTH = this.canvas.width,
      this.STAGE_HEIGHT = this.canvas.height;
    for (let index = 0; index < 10; index++) {
      this.balls.push(new Ball(this.STAGE_WIDTH, this.STAGE_HEIGHT, this.context));
    }
  }

  hey() {

    this.clear();

    this.balls.forEach((ball: Ball) => {
      ball.update();
      ball.draw();
    });

    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(this.hey.bind(this));

    });

  }

  clear() {
    this.context.clearRect(0, 0, this.STAGE_WIDTH, this.STAGE_HEIGHT);
  }



}
