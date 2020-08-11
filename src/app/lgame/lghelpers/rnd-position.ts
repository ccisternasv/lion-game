import { MissingTranslationStrategy } from '@angular/core';

export class RndPosition {

    private _min = 0;
    private _max = 1;

    constructor(){

    }

    public set min(minNbr:number){
        this._min = minNbr;
    }

    public set max(maxNbr:number){
        this._min = maxNbr;
    }

    static genRndInt(minNbr:number= 0, maxNbr:number = 1):number{
        return Math.trunc(Math.random()*maxNbr+minNbr);
    }

}
