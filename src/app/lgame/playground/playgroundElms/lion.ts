import { Move } from './move';
import { PlaygroundElm } from './playground-elm';
import { Point } from '../../lghelpers/point';
import { Size } from '../../lghelpers/size';
import { Vector } from '../../lghelpers/vector';

export class Lion extends PlaygroundElm implements Move {
    private _speed: number;
    private _velocity: Vector;
    private _health: number;
    private _rippleFactor: number;
    private _rippleStep: number;
    private _supportedInst: string[] 
    
    constructor(_id:number=0,
        _position: Point = null,
        _size: Size = null,
        _image: HTMLImageElement = null) {
        super(_id, _position, _size, "Lion", _image);
        this.supportedInst = ['up', 'right', 'down', 'left'];
    }

    updatePosition() {
        throw new Error("Method not implemented.");
    }
    
    public get speed(): number {
        return this._speed;
    }
    public set speed(value: number) {
        this._speed = value;
    }
    public get velocity(): Vector {
        return this._velocity;
    }
    public get health(): number {
        return this._health;
    }
    public set health(value: number) {
        this._health = value;
    }
    public set velocity(value: Vector) {
        this._velocity = value;
    }
    public get rippleFactor(): number {
        return this._rippleFactor;
    }
    public set rippleFactor(value: number) {
        this._rippleFactor = value;
    }
    public get rippleStep(): number {
        return this._rippleStep;
    }
    public set rippleStep(value: number) {
        this._rippleStep = value;
    }
    public get supportedInst(): string[] {
        return this._supportedInst;
    }
    public set supportedInst(value: string[]) {
        this._supportedInst = value;
    }
    
    public updateVelocityByInst(inst:string){
        let supportedInst = false;

        return supportedInst;
    }

    public executeCollisionWith(collidingElm:PlaygroundElm){
        return true;
    }

    
}
