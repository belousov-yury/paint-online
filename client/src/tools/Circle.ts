import Rect from './Rect';
import {clearCanvas} from '../helpers/canvasHelper';
import {ICircle} from '../interfaces/tools/ICircle';
import Tool from './Tool';
import {IRect} from '../interfaces/tools/IRect';

export default class Circle extends Tool {
  mouseDown: boolean = false
  saved: string = ''
  startX: number = 0
  startY: number = 0
  radius: number = 0

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
    super(canvas, socket, sessionId);
    this.name = 'circle'
    this.listen()
  }

  listen(): void {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmouseleave = this.mouseLeaveHandler.bind(this)
  }

  mouseLeaveHandler(): void {
    this.mouseDown = false
  }

  mouseUpHandler(): void {
    this.mouseDown = false
    this.socket.send(JSON.stringify({
      method: 'draw',
      id: this.sessionId,
      figure: {
        type: 'circle',
        params: {
          x: this.startX,
          y: this.startY,
          radius: this.radius,
          fillStyle: this.ctx?.fillStyle,
          strokeStyle: this.ctx?.strokeStyle,
          lineWidth: this.ctx?.lineWidth
        } as ICircle
      }
    }))
  }

  mouseMoveHandler(e: MouseEvent): void {
    if (this.mouseDown) {
      let currentX = e.pageX - (e.target as HTMLCanvasElement).offsetLeft
      let currentY = e.pageY - (e.target as HTMLCanvasElement).offsetTop
      this.radius = Math.abs(currentX - this.startX > currentY - this.startY ? currentX - this.startX : currentY - this.startY)
      this.draw(this.startX, this.startY, this.radius)
    }
  }


  mouseDownHandler(e: MouseEvent): void {
    this.mouseDown = true
    this.ctx?.beginPath()
    this.startX = e.pageX - (e.target as HTMLCanvasElement).offsetLeft
    this.startY = e.pageY - (e.target as HTMLCanvasElement).offsetTop
    this.saved = this.canvas.toDataURL()
  }

  draw(x: number, y: number, radius: number) {
    const img = new Image()
    img.src = this.saved
    img.onload = () => {
      clearCanvas(this.canvas)
      this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx?.beginPath()
      this.ctx?.arc(this.startX, this.startY, radius, 0, 2 * Math.PI, false)
      this.ctx?.fill()
      this.ctx?.stroke()
    }

  }

  static staticDraw(ctx: CanvasRenderingContext2D, params: ICircle) {
    ctx!.fillStyle = params.fillStyle
    ctx!.strokeStyle = params.strokeStyle
    ctx!.lineWidth = params.lineWidth
    ctx?.beginPath()
    ctx?.arc(params.x, params.y, params.radius, 0, 2 * Math.PI, false)
    ctx?.fill()
    ctx?.stroke()
  }
}