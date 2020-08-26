import { Point } from './point';
import { Size } from './size';

export class TargetElm {
    private _refPosition: Point;
    //reference target position and target position are equals when no danger is detected
    private _reftargetPosition: Point;
    private _targetPosition: Point;
    private _dx: number;
    private _dy: number;
    //m
    private _slope: number;
    //n or b
    private _yIntercept: number;
    private _hypothenus: number;
    private _type: string;

    constructor(refPosition, targetPosition, type) {
        this._refPosition = refPosition;
        this._targetPosition = targetPosition;
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
            this.dx = this.targetPosition.x - this.refPosition.x;
        }
        return this._dx;
    }
    public set dx(value: number) {
        this._dx = value;
    }
    public get dy(): number {
        if (isNaN(this._dy)) {
            this.dy = this.targetPosition.y - this.refPosition.y;
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
            this.yIntercept = this.refPosition.y - this.slope * this.refPosition.y;
        }
        return this._yIntercept;
    }
    public set yIntercept(value: number) {
        this._yIntercept = value;
    }
    public set dy(value: number) {
        this._dy = value;
    }
    public get hypothenus(): number {
        if (isNaN(this.hypothenus)) {
            this.hypothenus = Math.round(Math.sqrt((this.dx) ** 2 + (this.dy) ** 2));
        }
        return this._hypothenus;
    }
    public set hypothenus(value: number) {
        this._hypothenus = value;
    }
    public get type(): string {
        return this._type;
    }
    public set type(value: string) {
        this._type = value;
    }
    public get targetPosition(): Point {
        return this._targetPosition;
    }
    public set targetPosition(value: Point) {
        this.dx = this.dy = this.hypothenus = this.slope = this.slope = NaN;
        this._targetPosition = value;
    }
    public get reftargetPosition(): Point {
        return this._reftargetPosition;
    }
    public set reftargetPosition(value: Point) {
        this._reftargetPosition = value;
    }

    // public calculateAlphaAngle(): number {
    //     return Math.tan(this.dy / this.dx);
    // }

    // public invertTargetPosition(screenSize:Size, objRefSize:Size):Point {
    //     this.targetPosition = new Point();
    //     this.targetPosition.x = this.refPosition.x + this.dx;
    //     this.targetPosition.y = this.refPosition.y + this.dy;
    //     const maxX = screenSize.w-objRefSize.w;
    //     const maxY = screenSize.h-objRefSize.h;
    //     return this.targetPosition.assestCoordinate(0,0, maxX, maxY, this.slope, this.yIntercept);
    // }
}
