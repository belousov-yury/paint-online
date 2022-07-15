import Tool from './Tool';
import {IBrush} from '../interfaces/tools/IBrush';
import {IFigure} from '../interfaces/tools/IFigure';

export default class Brush extends Tool {

  mouseDown: boolean = false

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
    super(canvas, socket, sessionId);
    this.name = 'brush'
    this.listen()
  }

  listen(): void {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmouseleave = this.mouseLeaveHandler.bind(this)
  }

  mouseMoveHandler(e: MouseEvent) {
    if (this.mouseDown) {
      // this.draw(e.pageX - (e.target as HTMLCanvasElement).offsetLeft, e.pageY - (e.target as HTMLCanvasElement).offsetTop)
      this.socket.send(JSON.stringify({
        method: 'draw',
        id: this.sessionId,
        figure: {
          type: this.name,
          params: {
            x: e.pageX - (e.target as HTMLCanvasElement).offsetLeft,
            y: e.pageY - (e.target as HTMLCanvasElement).offsetTop,
            lineWidth: this.ctx?.lineWidth,
            strokeStyle: this.ctx?.strokeStyle
          } as IBrush
        } as IFigure
      }))
    }
  }

  mouseUpHandler(e: MouseEvent): void {
    this.mouseDown = false
    this.socket.send(JSON.stringify({
      method: 'draw',
      id: this.sessionId,
      figure: {
        type: 'finish',
      }
    }))
  }

  mouseDownHandler(e: MouseEvent): void {
    this.mouseDown = true
    this.ctx?.beginPath()
    this.ctx?.moveTo(e.pageX - (e.target as HTMLCanvasElement).offsetLeft, e.pageY - (e.target as HTMLCanvasElement).offsetTop)
  }

  mouseLeaveHandler(e: MouseEvent): void {
    this.mouseDown = false
  }

  static draw(ctx: CanvasRenderingContext2D, params: IBrush) {
    ctx.lineWidth = params.lineWidth
    ctx.strokeStyle = params.strokeStyle
    ctx?.lineTo(params.x, params.y)
    ctx?.stroke()
  }
}