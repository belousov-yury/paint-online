import {IFigure} from './tools/IFigure';

export interface IMessage {
  id: string
  username: string
  method: string
  figure?: IFigure
}