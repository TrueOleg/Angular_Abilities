import { Component, OnInit, ViewChild, ElementRef, NgZone, HostListener } from '@angular/core';
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
  styleUrls: ['./balls.component.scss'],
})
export class BallsComponent implements OnInit {

  @ViewChild('mycanvas')
  element: ElementRef;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  @ViewChild('mysnake')
  elementS: ElementRef;
  canvasS: HTMLCanvasElement;
  contextS: CanvasRenderingContext2D;
  STAGE_WIDTH;
  STAGE_HEIGHT;
  STAGE_WIDTH_SNAKE;
  STAGE_HEIGHT_SNAKE;
  SNAKE_BLOCK_SIZE = 10;
  balls: Ball[] = [];
  posArray: Array<Array<number>> = [];
  frameLength = 500;
  direction = 'right';
  nextDirection: string;
  keysToDirections = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  // apple = {
  //   position: [6, 6],
  //   draw: (ctx) => {
  //     ctx.save();
  //     ctx.fillStyle = '#0a0'; //apple green
  //     ctx.beginPath();
  //     var radius = JS_SNAKE.blockSize / 2;
  //     var x = position[0] * JS_SNAKE.blockSize + radius;
  //     var y = position[1] * JS_SNAKE.blockSize + radius;
  //     ctx.arc(x, y, radius, 0, Math.PI * 2, true);
  //     ctx.fill();
  //     ctx.restore();
  //   }
  // }

  constructor(
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.canvas = this.element.nativeElement;
    this.context = this.canvas.getContext('2d');
    this.STAGE_WIDTH = this.canvas.width;
    this.STAGE_HEIGHT = this.canvas.height;
    for (let index = 0; index < 10; index++) {
      this.balls.push(new Ball(this.STAGE_WIDTH, this.STAGE_HEIGHT, this.context));
    }
    this.canvasS = this.elementS.nativeElement;
    this.contextS = this.canvasS.getContext('2d');
    this.STAGE_WIDTH_SNAKE = this.canvasS.width;
    this.STAGE_HEIGHT_SNAKE = this.canvasS.height;
    this.posArray.push([6, 4]);
    this.posArray.push([5, 4]);
    this.posArray.push([4, 4]);
    this.nextDirection = this.direction;
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

  start() {
    this.contextS.clearRect(0, 0, this.STAGE_WIDTH_SNAKE, this.STAGE_HEIGHT_SNAKE);
    this.moveSnake();
    this.draw();
    setTimeout(this.start.bind(this), this.frameLength); // do it all again
  }

  draw() {
    this.posArray.forEach(el => {
      this.drawSection(this.contextS, el);
    });
  }

  drawSection(ctx: CanvasRenderingContext2D, position: Array<number>) {
    const x = this.SNAKE_BLOCK_SIZE * position[0];
    const y = this.SNAKE_BLOCK_SIZE * position[1];
    ctx.fillRect(x, y, this.SNAKE_BLOCK_SIZE, this.SNAKE_BLOCK_SIZE);
  }

  moveSnake() {
    const nextPosition = this.posArray[0].slice(); // copy head of snake
    this.direction = this.nextDirection;
    switch (this.direction) {
      case 'left':
        nextPosition[0] -= 1;
        break;
      case 'up':
        nextPosition[1] -= 1;
        break;
      case 'right':
        nextPosition[0] += 1;
        break;
      case 'down':
        nextPosition[1] += 1;
        break;
      default:
        throw new Error(('Invalid direction'));
    }

    // add the new position to the beginning of the array
    this.posArray.unshift(nextPosition);
    // and remove the last position
    this.posArray.pop();
  }

  setDirection(newDirection) {
    let allowedDirections;

    // If snake is going left or right, only valid new directions
    // are up and down. Vice versa for up or down.
    switch (this.direction) {
      case 'left':
      case 'right':
        allowedDirections = ['up', 'down'];
        break;
      case 'up':
      case 'down':
        allowedDirections = ['left', 'right'];
        break;
      default:
        throw new Error(('Invalid direction'));
    }
    if (allowedDirections.indexOf(newDirection) > -1) {
      this.nextDirection = newDirection;
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleDeleteKeyboardEvent(event: KeyboardEvent) {
    const key = event.which;
    const direction = this.keysToDirections[key];
    if (direction) {
      this.setDirection(direction);
      event.preventDefault();
    } else if (key === 32) {
      // restart();
    }
  }


}
