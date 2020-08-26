import { Vector } from '../../lghelpers/vector';
import { Size } from '../../lghelpers/size';

export interface Move {
    speed:number;
    velocity:Vector;
    updatePosition(canvasSize:Size);
}
