import { Vector } from '../../lghelpers/vector';
import { Size } from '../../lghelpers/size';

export interface Move {
    speed:number;
    velocity:Vector;
    //-1: undetermined, 0: up, 1:right, 2: down, 3: left
    direction:number;
    updatePosition(canvasSize:Size);
}
