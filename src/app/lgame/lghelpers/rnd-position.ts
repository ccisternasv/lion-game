import { Point } from './point';
import { Size } from './size';

export class RndPosition {

    private _minWidth: number;
    private _maxWidth: number;
    private _minHeight: number;
    private _maxHeight: number;

    constructor(maxWidth:number, maxHeight:number, size:Size){
        this._minWidth = 0;
        this._minHeight = 0;
        this.maxWidth = maxWidth - size.w;
        this.maxHeight = maxHeight - size.h;
    }
    public get minWidth(): number {
        return this._minWidth;
    }
    public get maxWidth(): number {
        return this._maxWidth;
    }
    public set maxWidth(value: number) {
        if(value >0){
            this._maxWidth = value;
        }
        else{
            this._maxWidth = 0;
        }
    }
    public get minHeight(): number {
        return this._minHeight;
    }
    public get maxHeight(): number {
        return this._maxHeight;
    }
    public set maxHeight(value: number) {
        if(value >0){
        this._maxHeight = value;
        }
        else{
        this._maxHeight = 0;
        }
    }

    public genRndInt(minNbr:number= 0, maxNbr:number = 1):number{
        if(maxNbr >0){
            return Math.trunc(Math.random()*maxNbr+minNbr);
        }
        return 0;
    }

    public generatePosition():Point{
        const x = this.genRndInt(this.minWidth, this.maxWidth);
        const y = this.genRndInt(this.minHeight, this.maxHeight);
        return new Point(x, y);
    }

}
