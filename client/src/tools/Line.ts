import Tool from './Tool';
import {clearCanvas} from '../helpers/canvasHelper';
import {ILine} from '../interfaces/tools/ILine';
import {ICircle} from '../interfaces/tools/ICircle';

export default class Line extends Tool {

  mouseDown: boolean = false
  saved: string = ''
  startX: number = 0
  startY: number = 0
  endX: number = 0
  endY: number = 0

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
    super(canvas, socket, sessionId);
    this.name = 'line'
    this.listen()
  }

  listen(): void {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmouseleave = this.mouseLeaveHandler.bind(this)
  }

  mouseMoveHandler(e: MouseEvent): void {
    if (this.mouseDown) {
      this.endX = e.pageX - (e.target as HTMLCanvasElement).offsetLeft
      this.endY = e.pageY - (e.target as HTMLCanvasElement).offsetTop
      this.draw(this.endX, this.endY)
    }
  }

  mouseUpHandler(): void {
    this.mouseDown = false
    this.socket.send(JSON.stringify({
      method: 'draw',
      id: this.sessionId,
      figure: {
        type: 'line',
        params: {
          startX: this.startX,
          startY: this.startY,
          endX: this.endX,
          endY: this.endY,
          strokeStyle: this.ctx?.strokeStyle,
          lineWidth: this.ctx?.lineWidth
        } as ILine
      }
    }))
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
    this.startX = e.pageX - (e.target as HTMLCanvasElement).offsetLeft
    this.startY = e.pageY - (e.target as HTMLCanvasElement).offsetTop
    this.saved = this.canvas.toDataURL()
  }

  mouseLeaveHandler(): void {
    this.mouseDown = false
  }

  draw(x: number, y: number) {
    const img = new Image()
    img.src = this.saved
    img.onload = () => {
      clearCanvas(this.canvas)
      this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx?.beginPath()
      this.ctx?.moveTo(this.startX, this.startY)
      this.ctx?.lineTo(x, y)
      this.ctx?.fill()
      this.ctx?.stroke()
    }

  }

  static staticDraw(ctx: CanvasRenderingContext2D, params: ILine) {
    ctx!.strokeStyle = params.strokeStyle
    ctx!.lineWidth = params.lineWidth
    ctx?.beginPath()
    ctx?.moveTo(params.startX, params.startY)
    ctx?.lineTo(params.endX, params.endY)
    ctx?.fill()
    ctx?.stroke()
  }
}