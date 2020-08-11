import { PlaygroundElm } from './playground-elm';
import { Point } from '../../lghelpers/point';
import { Size } from '../../lghelpers/size';

export class Carrot extends PlaygroundElm {
    constructor(_id:number=0,
        _position: Point = null,
        _size: Size = null,
        _image: HTMLImageElement = null){
        super(_id, _position, _size, "Carrot", _image);
    }
}
