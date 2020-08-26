import { Point } from './point';
import { Size } from './size';

export class Rect {
    private _refPosition: Point;
    //reference target position and target position are equals when no danger is detected
    private _refTargetPosition: Point;
    private _dx: number;
    private _dy: number;
    //m
    private _slope: number;
    //n or b
    private _yIntercept: number;
    private _hypothenus: number;

    private _type:string;

    constructor(refPosition, refTargetPosition, type="undetermined") {
        this.refPosition = refPosition;
        this.refTargetPosition = refTargetPosition;
        this.type = type;
    }

    public get refPosition(): Point {
        return this._refPosition;
    }
    public set refPosition(value: Point) {
        this._refPosition = value;
    }
    public get dx(): number {
        if (isNaN(this._dx)) {
            this.dx = this.refPosition.x - this.refTargetPosition.x;
        }
        return this._dx;
    }
    public set dx(value: number) {
        this._dx = value;
    }
    public get dy(): number {
        if (isNaN(this._dy)) {
            this.dy = this.refPosition.y - this.refTargetPosition.y;
        }
        return this._dy;
    }
    public get slope(): number {
        if (isNaN(this._slope)) {
            this.slope = this.dx / this.dy;
        }
        return this._slope;
    }
    public set slope(value: number) {
        this._slope = value;
    }
    public get yIntercept(): number {
        if (isNaN(this._yIntercept)) {
            this.yIntercept = this.refPosition.y - this.slope * this.refPosition.x;
        }
        return this._yIntercept;
    }
    public set yIntercept(value: number) {
        this._yIntercept = value;
    }
    public set dy(value: number) {
        this._dy = value;
    }

    public get type(): string {
        return this._type;
    }
    public set type(value: string) {
        this._type = value;
    }

    public get refTargetPosition(): Point {
        return this._refTargetPosition;
    }
    public set refTargetPosition(value: Point) {
        this._refTargetPosition = value;
    }
    public get hypothenus(): number {
        if (isNaN(this._hypothenus)) {
            this.hypothenus = Math.round(Math.sqrt((this.dx) ** 2 + (this.dy) ** 2));
        }
        return this._hypothenus;
    }
    public set hypothenus(value: number) {
        this._hypothenus = value;
    }

    public calculateAlphaAngle(): number {
        return Math.tan(this.dy / this.dx);
    }

    public invertTargetPosition():Point {
        const refTargetPosition = new Point();
        refTargetPosition.x = this.refPosition.x + this.dx/2;
        refTargetPosition.y = this.refPosition.y + this.dy/2;
        return refTargetPosition;
    }

    public static sortByDistance(rects:Rect[]):void{
        rects.sort((a, b)=> a.hypothenus - b.hypothenus);
    }

    public static closestElm(rects:Rect[]):Rect{
        if(rects.length > 0 ){
            Rect.sortByDistance(rects);
            return rects[0];
        }
        return null;
    }

    public getXOfY(y:number) {
        return Math.round((y - this.yIntercept) / this.slope);
    }

    public getYOfX(x:number) {
        return Math.round(this.slope * x + this.yIntercept);
    }
}
