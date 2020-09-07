import { Point } from '../../lghelpers/point';
import { Size } from '../../lghelpers/size';

export class PlaygroundElm {
    private _id: number;
    private _currentPosition: Point;
    private _initialPosition: Point;
    private _initialSize: Size;
    private _currentSize: Size;
    private _type: string;
    private _drawingRequired: boolean;
    private _markForDeletion: boolean;
    private _moves: boolean;
    private _collitionDetected: boolean;
    private _expandRate: number;
    private _shrinkRate: number;

    constructor(_id: number = 0,
        position: Point = null,
        size: Size = null,
        type: string = "no type") {
            this.id = _id;
            this.initialPosition = position;
            this.initialSize = size;
            this.currentPosition = position;
            this.currentSize = new Size(size.w, size.h);
            this.type = type;
            this.drawingRequired = true;
            this.moves = false;
            this.shrinkRate = 10;
            this.expandRate =10;
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get currentPosition(): Point {
        return this._currentPosition;
    }
    public set currentPosition(value: Point) {
        if(value){
            this._currentPosition = new Point(value.x, value.y);
        }
        else{
            this._currentPosition = value;
        }
    }

    public get initialPosition(): Point {
        return this._initialPosition;
    }
    public set initialPosition(value: Point) {
        this.currentPosition = value;
        this._initialPosition = value;
    }

    public get initialSize(): Size {
        return this._initialSize;
    }
    public set initialSize(value: Size) {
        this.currentSize = value;
        this._initialSize = value;
    }
    public get currentSize(): Size {
        return this._currentSize;
    }
    public set currentSize(value: Size) {
        this._currentSize = value;
    }
    public get type(): string {
        return this._type;
    }
    public set type(value: string) {
        this._type = value;
    }
    public get drawingRequired(): boolean {
        return this._drawingRequired;
    }
    public set drawingRequired(value: boolean) {
        this._drawingRequired = value;
    }
    public get markForDeletion(): boolean {
        return this._markForDeletion;
    }
    public set markForDeletion(value: boolean) {
        this._markForDeletion = value;
    }
    public get moves(): boolean {
        return this._moves;
    }
    public set moves(value: boolean) {
        this._moves = value;
    }
    public get collitionDetected(): boolean {
        return this._collitionDetected;
    }
    public set collitionDetected(value: boolean) {
        this._collitionDetected = value;
        this.update();
    }
    public get expandRate(): number {
        return this._expandRate/100;
    }
    public set expandRate(value: number) {
        this._expandRate = value;
    }
    public get shrinkRate(): number {
        return this._shrinkRate/100;
    }
    public set shrinkRate(value: number) {
        this._shrinkRate = value;
    }

    getCenterOfCurrentPosition() {
        return new Point(Math.round(this.currentPosition.x + this.currentSize.w / 2),
            Math.round(this.currentPosition.y + this.currentSize.h / 2));
    }

    getHalfOfSize(){
        return new Size(
            Math.round(this.currentSize.w/2), 
            Math.round(this.currentSize.h/2));
    }

    //x1, y1, x2, y2
    getCurrentPositionMatrix():number[]{
        return [this.currentPosition.x, this.currentPosition.y, 
            this.currentPosition.x + this.currentSize.w, this.currentPosition.y + this.currentSize.h];
    }

    update(){
        this.drawingRequired =true;
    }

    public shrink(): boolean {
        //calculate object center
        const centerPosition = this.getCenterOfCurrentPosition();

        //adjust size:
        this.currentSize.w = Math.round(this.currentSize.w * (1 - this.shrinkRate));
        this.currentSize.h = Math.round(this.currentSize.h * (1 - this.shrinkRate));

        //adjusts position
        this.currentPosition.x = centerPosition.x - this.getHalfOfSize().w;
        this.currentPosition.y = centerPosition.y - this.getHalfOfSize().h;

        console.log("shrinking...", this.type);

        return true;
    }

    public expand(): boolean {
        //calculate object center
        const centerPosition = this.getCenterOfCurrentPosition();

        //adjust size:
        this.currentSize.w = Math.round(this.currentSize.w * (1 + this.shrinkRate));
        this.currentSize.h = Math.round(this.currentSize.h * (1 + this.shrinkRate));

        //adjusts position
        this.currentPosition.x = centerPosition.x - this.getHalfOfSize().w;
        this.currentPosition.y = centerPosition.y - this.getHalfOfSize().h;

        return true;
    }

}
