import { Move } from './move';
import { PlaygroundElm } from './playground-elm';
import { Point } from '../../lghelpers/point';
import { Size } from '../../lghelpers/size';
import { Vector } from '../../lghelpers/vector';
import { CollisionDetection } from '../../lghelpers/collision-detection';

export class Lion extends PlaygroundElm implements Move {
    private _speed: number;
    private _velocity: Vector;
    private _health: number;
    private _ripples: number;
    private _remainRipples: number;
    private _stepSize: number;

    constructor(_id: number = 0,
        _position: Point = null,
        _size: Size = null) {
        super(_id, _position, _size, "Lion");
        this.moves = true;
        this.velocity = new Vector();
        this.ripples = 5;
        this.remainRipples = 0;
        this.stepSize = 10;
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
    public get ripples(): number {
        return this._ripples;
    }
    public set ripples(value: number) {
        this._ripples = value;
    }
    public get remainRipples(): number {
        return this._remainRipples;
    }
    public set remainRipples(value: number) {
        this._remainRipples = value;
    }
    public get stepSize(): number {
        return this._stepSize;
    }
    public set stepSize(value: number) {
        this._stepSize = value;
    }
    
    updatePosition(canvasSize:Size) {
        if(this.remainRipples-->0){
            this.currentPosition.x = this.currentPosition.x + this.velocity.vX ;
            this.currentPosition.y = this.currentPosition.y + this.velocity.vY;
            CollisionDetection.correctBorderCollision(this, canvasSize);
            this.drawingRequired = true;
        }

    }
    public reactToInstr(instr: string) {
        //check if instr is supported
        switch (instr) {
            case 'up':
                this.velocity.update(0, -1*this.stepSize);
                break;
            case 'right':
                this.velocity.update(1*this.stepSize, 0);
                break;
            case 'down':
                this.velocity.update(0, 1*this.stepSize);
                break;
            case 'left':
                this.velocity.update(-1*this.stepSize, 0);
                break;
            default:
                break;
        }
        this.remainRipples = this.ripples;
    }


    public updateVelocityByInst(inst: string) {
        let supportedInst = false;

        return supportedInst;
    }

    public executeCollisionWith(collidingElm: PlaygroundElm) {
        return true;
    }


}
