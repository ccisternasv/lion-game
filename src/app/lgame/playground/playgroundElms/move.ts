import { Vector } from '../../lghelpers/vector';

export interface Move {
    speed:number;
    velocity:Vector;
    updatePosition()
}
