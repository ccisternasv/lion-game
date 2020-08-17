import { Move } from './move';
import { PlaygroundElm } from './playground-elm';
import { Vector } from '../../lghelpers/vector';
import { TargetElm } from '../../lghelpers/target-elm';
import { Point } from '../../lghelpers/point';
import { Size } from '../../lghelpers/size';

export class Rabbit extends PlaygroundElm implements Move {
    private _speed: number;
    private _velocity: Vector;
    private _target: TargetElm;
    private _lifeCycle: string[];
    private _food: number;
    private _water: number;

    constructor(_id:number=0,
        _position: Point = null,
        _size: Size = null){
        super(_id, _position, _size, "Rabbit");
        this.lifeCycle = ['searching food', "searching water", "hopeless (no food/ no water)", "trying to escape"];

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
    public set velocity(value: Vector) {
        this._velocity = value;
    }

    updatePosition() {
        throw new Error("Method not implemented.");
    }
    public get target(): TargetElm {
        return this._target;
    }
    public set target(value: TargetElm) {
        this._target = value;
    }
    public get lifeCycle(): string[] {
        return this._lifeCycle;
    }
    public set lifeCycle(value: string[]) {
        this._lifeCycle = value;
    }
    public get food(): number {
        return this._food;
    }
    public set food(value: number) {
        this._food = value;
    }
    public get water(): number {
        return this._water;
    }
    public set water(value: number) {
        this._water = value;
    }

    private drink(){

    }

    private eat(){
        this.food++;
    }

    public isInDanger():boolean{
    return true;
    }
}
