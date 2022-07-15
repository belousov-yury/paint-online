import {IMessage} from '../interfaces/IMessage';
import {IBrush} from '../interfaces/tools/IBrush';
import Brush from '../tools/Brush';
import {IRect} from '../interfaces/tools/IRect';
import Rect from '../tools/Rect';
import {ICircle} from '../interfaces/tools/ICircle';
import Circle from '../tools/Circle';
import axios from 'axios';
import {ILine} from '../interfaces/tools/ILine';
import Line from '../tools/Line';
import {IEraser} from '../interfaces/tools/IEraser';
import {Eraser} from '../tools/Eraser';

export const clearCanvas = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext('2d')
  ctx?.clearRect(0, 0, canvas.width, canvas.height)
}

export const drawHandler = (msg: IMessage, canvas: HTMLCanvasElement) => {
  if (msg.figure) {
    const figure = msg.figure
    const ctx = canvas.getContext('2d')
    if (ctx) {
      switch (figure.type) {
        case 'brush': {
          const brush = figure.params as IBrush
          Brush.draw(ctx, brush)
          break
        }
        case 'rect': {
          const rect = figure.params as IRect
          Rect.staticDraw(ctx, rect)
          break
        }
        case 'circle': {
          const circle = figure.params as ICircle
          Circle.staticDraw(ctx, circle)
          break
        }
        case 'line': {
          const line = figure.params as ILine
          Line.staticDraw(ctx, line)
          break
        }
        case 'eraser': {
          const eraser = figure.params as IEraser
          Eraser.staticDraw(ctx, eraser)
          break
        }
        case 'finish': {
          ctx.beginPath()
          break
        }
      }
    }
  }
}

export const saveCanvas = (canvas: HTMLCanvasElement, id: string) => {
  axios.post(`${process.env.REACT_APP_SERVER_URL}/image?id=${id}`, {img: canvas.toDataURL()})
    .then(res => console.log(res.data))
}