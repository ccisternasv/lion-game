export class Vector {
    private _vX: number;
    private _vY: number;

    constructor(){
        this.vX = 0;
        this.vY = 0;
    }

    public get vX(): number {
        return this._vX;
    }
    public set vX(value: number) {
        this._vX = value;
    }
    public get vY(): number {
        return this._vY;
    }
    public set vY(value: number) {
        this._vY = value;
    }

    public invertVector(collisionType):void{
        switch(collisionType){
            case "tCol":
                this.vY *= -1; 
            break;
            case "bCol":
                this.vY *= -1; 
            break;
            case "lCol":
                this.vX *= -1; 
            break;
            case "rCol":
                this.vX *= -1; 
            break;
            default:
                break;
        }    
    }
}
