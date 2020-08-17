import { PlaygroundElm } from './playground-elm';
import { Point } from '../../lghelpers/point';
import { Size } from '../../lghelpers/size';

export class Carrot extends PlaygroundElm {
    private _collitionDetected: boolean;

    constructor(_id: number = 0,
        _position: Point = null,
        _size: Size = null) {
        super(_id, _position, _size, "Carrot");
    }

    public get collitionDetected(): boolean {
        return this._collitionDetected;
    }
    public set collitionDetected(value: boolean) {
        this._collitionDetected = value;
    }

    update(){
        if(this.collitionDetected){
            this.markForDeletion = true;
            this.drawingRequired = true;
        }
    }
}
