import { Move } from './move';
import { PlaygroundElm } from './playground-elm';
import { Vector } from '../../lghelpers/vector';
import { TargetElm } from '../../lghelpers/target-elm';
import { Point } from '../../lghelpers/point';
import { Size } from '../../lghelpers/size';
import { Lion } from './lion';
import { Rect } from '../../lghelpers/rect';
import { Lake } from './lake';
import { Carrot } from './carrot';
import { CollisionDetection } from '../../lghelpers/collision-detection';

export class Rabbit extends PlaygroundElm implements Move {
    private _speed: number;
    private _velocity: Vector;
    private _targetPosition: Point;
    private _targetTypes: string[];
    private _lifeCycle: string[];
    private _goal: string;
    private _direction: number;
    private _foodCounter: number;
    private _water: number;

    constructor(_id:number=0,
        _position: Point = null,
        _size: Size = null){
        super(_id, _position, _size, "Rabbit");
        this.lifeCycle = ['searching food and water', "searching food", "hopeless (no food/ no water)", "trying to escape"];
        this._targetTypes = ["escapePoint", "carrot", "lake", "none"];
        this.moves = true;
        this.targetPosition = null;
        this.speed = 1;
        this.foodCounter = 0;
    }
    
    public get speed(): number {
        return this._speed;
    }
    public set speed(value: number) {
        this._speed = value;
    }
    public get velocity(): Vector {
        if(!this._velocity){
            this.velocity = new Vector();
        }
        return this._velocity;
    }
    public set velocity(value: Vector) {
        this._velocity = value;
    }

    updatePosition(canvasSize: Size) {
        this.currentPosition.x = this.currentPosition.x + this.velocity.vX ;
        this.currentPosition.y = this.currentPosition.y + this.velocity.vY;

        CollisionDetection.correctBorderCollision(this, canvasSize);

        this.drawingRequired = true;
    }
    
    public get targetPosition(): Point {

        //update velocity
        return this._targetPosition;
    }
    public set targetPosition(value: Point) {
        this._targetPosition = value;
        this.updateVelocityToTarget();
    }
    public get lifeCycle(): string[] {
        return this._lifeCycle;
    }
    public set lifeCycle(value: string[]) {
        this._lifeCycle = value;
    }
    public get foodCounter(): number {
        return this._foodCounter;
    }
    public set foodCounter(value: number) {
        this._foodCounter = value;
    }
    public get water(): number {
        return this._water;
    }
    public set water(value: number) {
        this._water = value;
    }

    public get targetTypes(): string[] {
        return this._targetTypes;
    }
    public set targetTypes(value: string[]) {
        this._targetTypes = value;
    }

    public get goal(): string {
        return this._goal;
    }
    public set goal(value: string) {
        this._goal = value;
    }
    public get direction(): number {
        return this._direction;
    }
    public set direction(value: number) {
        this._direction = value;
    }

    private drink(){

    }

    private eat(){
        this.foodCounter++;
    }

    public isInDanger(lions:Lion[], dangerProximityLevel:number):boolean{
        //check danger proximity
        let i = 0;
        let iteractions = lions.length;

    return true;
    }

    public calcDistanceToElm(target:PlaygroundElm){
        const targetCenterPosition = target.getCenterOfCurrentPosition();
        const myCenterPosition = this.getCenterOfCurrentPosition();
        //distanceToTarget
        

        return true;
    }

    public getclosestElement(refPosition:Point, group:PlaygroundElm[]):PlaygroundElm{

        if(group.length >0)
        group.sort((firstElem, secondElem)=> {
            const a = new Rect(refPosition, firstElem.getCenterOfCurrentPosition()).hypothenus;
            const b = new Rect(refPosition, secondElem.getCenterOfCurrentPosition()).hypothenus;

            if(a<b) return -1;
            else if(a>b) return 1;
            else return 0;
        })

        return group[0];
    }

    public getclosestElementPosition(refPosition:Point, group:PlaygroundElm[]):Point{
        const closestElem = this.getclosestElement(refPosition, group);
        
        if(closestElem){
            return closestElem.getCenterOfCurrentPosition();
        }

        return null;
    }

    public assestDistanceTo(arr:PlaygroundElm[]){
        const elms = [];
        arr.forEach(elm=>{
            new Rect(this.currentPosition, elm.currentPosition, elm.type);
        });


    }

    determineEscapePoint(lions:Lion[]):Point{
        const closestLion = this.getclosestElement(this.currentPosition, lions);

        if(closestLion){
            if(CollisionDetection.objectsCollisionWithProximity(this, closestLion)){
                const newRect = new Rect(this.getCenterOfCurrentPosition(), closestLion.getCenterOfCurrentPosition());

                const invertedPosition = newRect
                .invertTargetPosition();
                
                return invertedPosition
            }
        }

        return null;
    }

    public updateTarget(lakes:Lake[], carrots:Carrot[], lions:Lion[]){
        const escapePoint = this.determineEscapePoint(lions);
        let goalIndex:number = 2;

        if(!escapePoint){
            //hungry and starving
            if(this.goal == this.lifeCycle[0]){
                this.targetPosition = this.getclosestElementPosition(this.getCenterOfCurrentPosition(), [...carrots, ...lakes]);
                goalIndex = 0;
            }
            else{
                this.targetPosition = this.getclosestElementPosition(this.getCenterOfCurrentPosition(), [...carrots]);
                goalIndex = 1;
            }
        }
        else{
            this.targetPosition = escapePoint;
            goalIndex = 3;
        }
        
        this.goal = this.targetPosition ? this.lifeCycle[goalIndex] : this.lifeCycle[2];

        return;
    }

    public updateVelocityToTarget(){
        let vX = 0;
        let vY = 0;

        if(this.targetPosition){
            const newRect = new Rect(this.currentPosition, this.targetPosition);
            vX = -Math.sign(newRect.dx);
            vY = -Math.sign(newRect.dy);
        }

        this.velocity.update(vX, vY);
        return;
    }

    update(){
        this.markForDeletion = true;
        super.update();
    }

    public executeCollisionWith(elemType: string) {

        switch(elemType){
            case "Lake":
                break;
            case "Carrot":
                this.eat();
                break;
            default:
                break;
        }
        return true;
    }

}

