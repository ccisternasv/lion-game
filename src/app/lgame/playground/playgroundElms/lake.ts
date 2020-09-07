import { PlaygroundElm } from './playground-elm';
import { Point } from '../../lghelpers/point';
import { Size } from '../../lghelpers/size';

export class Lake extends PlaygroundElm {

    constructor(_id: number = 0,
        _position: Point = null,
        _size: Size = null) {
        super(_id, _position, _size, "Lake");
        this.shrinkRate = 10;
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

    public update():void{
        
        super.update();
        if(this.getWaterLevel()< 10){
            this.markForDeletion = true;
        }

        if(this.collitionDetected){
            this.shrink();
        }
    }
}
