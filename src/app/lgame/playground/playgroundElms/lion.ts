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
    //status: normal, sick, hungry, 
    private _status: string;
    private _direction: number;

    constructor(_id: number = 0,
        _position: Point = null,
        _size: Size = null) {
        super(_id, _position, _size, "Lion");
        this.moves = true;
        this.velocity = new Vector();
        this.ripples = 5;
        this.remainRipples = 0;
        this.stepSize = 10;
        this.direction = -1;
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
    public get status(): string {
        return this._status;
    }
    public set status(value: string) {
        this._status = value;
    }
    public get direction(): number {
        return this._direction;
    }
    public set direction(value: number) {
        this._direction = value;
    }

    updatePosition(canvasSize: Size) {
        if (this.remainRipples-- > 0) {
            this.currentPosition.x = this.currentPosition.x + this.velocity.vX;
            this.currentPosition.y = this.currentPosition.y + this.velocity.vY;
            CollisionDetection.correctBorderCollision(this, canvasSize);
            this.drawingRequired = true;
        }
    }

    public reactToInstr(instr: number) {
        //check if instr is supported
        switch (instr) {
            case 0:
                this.velocity.update(0, -1 * this.stepSize);
                break;
            case 1:
                this.velocity.update(1 * this.stepSize, 0);
                break;
            case 2:
                this.velocity.update(0, 1 * this.stepSize);
                break;
            case 3:
                this.velocity.update(-1 * this.stepSize, 0);
                break;
            default:
                break;
        }
        this.direction = instr;
        this.remainRipples = this.ripples;
    }

    public updateHealth(input: string) {
        console.log(" lion collision: ", input);
        switch (input) {
            case "Lake":
                break;
            case "Carrot":
                this.shrink();
                break;
            case "Rabbit":
                this.expand();
                break;
            default:
                break;
        }
    }

    private eat(food: string): void {
        switch (food) {
            case "Carrot":
                this.health--;
                this.shrink();
                break;
            case "Rabbit":
                this.health++;
                this.expand();
                break;
            default:
                break;
        }
    }

    private drink(): void {

    }

    public executeCollisionWith(elemType: string) {
        switch (elemType) {
            case "Lake":
                this.drink();
                break;
            case "Carrot":
                this.eat(elemType);
                break;
            case "Rabbit":
                this.eat(elemType);
                break;
            default:
                break;
        }
        return true;
    }
}
