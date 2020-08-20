import { PlaygroundElm } from './playground-elm';
import { Point } from '../../lghelpers/point';
import { Size } from '../../lghelpers/size';

export class Lake extends PlaygroundElm {

    private _shrinkRate: number;
    private _collitionDetected: boolean;

    constructor(_id: number = 0,
        _position: Point = null,
        _size: Size = null) {
        super(_id, _position, _size, "Lake");
        this.shrinkRate = 10;
    }

    public get shrinkRate(): number {
        return (this._shrinkRate / 100);
    }
    public set shrinkRate(value: number) {
        if (value >= 0 && value < 100) {
            this._shrinkRate = value;
        }
    }
    public get collitionDetected(): boolean {
        return this._collitionDetected;
    }
    public set collitionDetected(value: boolean) {
        this._collitionDetected = value;
    }

    private shrink(): boolean {
        //calculate object center
        const centerPosition = this.getCenterPosition();

        //adjust size:
        this.currentSize.w = Math.trunc(this.currentSize.w * (1 - this.shrinkRate));
        this.currentSize.h = Math.trunc(this.currentSize.h * (1 - this.shrinkRate));

        //adjusts position
        this.currentPosition.x = centerPosition.x - this.currentSize.w / 2;
        this.currentPosition.y = centerPosition.y - this.currentSize.h / 2;

        return true;
    }

    public getWaterLevel(): number {
        return Math.trunc((this.currentSize.w * this.currentSize.h) /
            (this.initialSize.w * this.initialSize.h) * 100);
    }

    public getWaterLevelAsStr(): string {
        return this.getWaterLevel() + '%';;
    }

    public status():string {
        const lakeWaterLevel = this.getWaterLevel();

        if (lakeWaterLevel >= 70) {
            return 'normal';
        }
        else if (lakeWaterLevel < 70 && lakeWaterLevel >= 40) {
            return 'medium';
        }
        else if (lakeWaterLevel < 40 && lakeWaterLevel >= 10) {
            return 'low';
        }
        else {
            return 'critical';
        }
    }

    public update():boolean{
        if(this.collitionDetected){
            this.shrink();
            this.drawingRequired = true;
            return true;
        }

        if(this.getWaterLevel()< 10){
            this.markForDeletion = true;
            this.drawingRequired =true;
        }

        return false;
    }
}
