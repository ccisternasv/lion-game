import { PlaygroundElm } from './playground-elm';
import { Point } from '../../lghelpers/point';
import { Size } from '../../lghelpers/size';

export class Lake extends PlaygroundElm {

    private _currentSize: Size;
    private _bgImage: HTMLImageElement;

    constructor(_id:number=0,
        _position: Point = null,
        _size: Size = null,
        _image: HTMLImageElement = null){
        super(_id, _position, _size, "Lake", _image);
    }
    
    public get bgImage(): HTMLImageElement {
        return this._bgImage;
    }
    public set bgImage(value: HTMLImageElement) {
        this._bgImage = value;
    }
    public get currentSize(): Size {
        return this._currentSize;
    }
    public set currentSize(value: Size) {
        this._currentSize = value;
    }

    private shrink():boolean{
        return true;
    }

    public getWaterLevel():number{
        return 0;
    }

    public getWaterLevelAsStr():string{
        return "";
    }

    public executeCollisionWith(collidingElm:PlaygroundElm){
        return true;
    }

}
