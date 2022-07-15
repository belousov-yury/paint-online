import {IRect} from './IRect';
import {IBrush} from './IBrush';
import {ILine} from './ILine';
import {ICircle} from './ICircle';
import {IEraser} from './IEraser';

export interface IFigure {
  type: string
  params: IRect | IBrush | ILine | ICircle | IEraser
}