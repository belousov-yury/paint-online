import Tool from './Tool';
import {clearCanvas} from '../helpers/canvasHelper';
import {IRect} from '../interfaces/tools/IRect';

export default class Rect extends Tool {

  mouseDown: boolean = false
  saved: string = ''
  startX: number = 0
  startY: number = 0
  width: number = 0
  height: number = 0

  constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string) {
    super(canvas, socket, sessionId);
    this.name = 'rect'
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
      // this.draw(e.pageX - (e.target as HTMLCanvasElement).offsetLeft, e.pageY - (e.target as HTMLCanvasElement).offsetTop)
      let currentX = e.pageX - (e.target as HTMLCanvasElement).offsetLeft
      let currentY = e.pageY - (e.target as HTMLCanvasElement).offsetTop
      this.width = currentX - this.startX
      this.height = currentY - this.startY
      this.draw(this.startX, this.startY, this.width, this.height)
    }
  }

  mouseUpHandler(): void {
    this.mouseDown = false
    this.socket.send(JSON.stringify({
      method: 'draw',
      id: this.sessionId,
      figure: {
        type: 'rect',
        params: {
          x: this.startX,
          y: this.startY,
          width: this.width,
          height: this.height,
          fillStyle: this.ctx?.fillStyle,
          strokeStyle: this.ctx?.strokeStyle,
          lineWidth: this.ctx?.lineWidth
        } as IRect
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

  draw(x: number, y: number, width: number, height: number) {
    const img = new Image()
    img.src = this.saved
    img.onload = () => {
      clearCanvas(this.canvas)
      this.ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      this.ctx?.beginPath()
      this.ctx?.rect(x, y, width, height)
      this.ctx?.fill()
      this.ctx?.stroke()
    }
  }

  static staticDraw(ctx: CanvasRenderingContext2D,
                    params: IRect
  ) {
    ctx!.fillStyle = params.fillStyle
    ctx!.strokeStyle = params.strokeStyle
    ctx!.lineWidth = params.lineWidth
    ctx?.beginPath()
    ctx?.rect(params.x, params.y, params.width, params.height)
    ctx?.fill()
    ctx?.stroke()
  }
}