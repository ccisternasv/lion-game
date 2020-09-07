import { Settings } from '../settings/settings';
import { Rabbit } from './playgroundElms/rabbit';
import { Player } from '../settings/player';
import { Carrot } from './playgroundElms/carrot';
import { Lion } from './playgroundElms/lion';
import { Lake } from './playgroundElms/lake';
import { PlaygroundElm } from './playgroundElms/playground-elm';
import { Size } from '../lghelpers/size';
import { RndPosition } from '../lghelpers/rnd-position';
import { CollisionDetection } from '../lghelpers/collision-detection';
import { Printable } from '../lghelpers/printable';

export class Game {

    private _status: String[];
    private _settings: Settings;
    private _endGameReasons: String[];
    private _reasonGameOver: String;
    private _carrots: Carrot[];
    private _lions: Lion[];
    private _lakes: Lake[];
    private _rabbits: Rabbit[];
    private _elementsCounter: number;
    private _size: Size;
    private _drawingLakesRequired: boolean;
    private _drawingCarrotsRequired: boolean;
    private _drawingRabbitsRequired: boolean;
    private _drawingLionsRequired: boolean;

    constructor(settings: Settings, size: Size) {
        this._status = ["playing", "pause", "game over"];
        this.settings = settings;
        this._endGameReasons = ["Thirsty", "Hungry", "Lion get sick"];
        this.reasonGameOver = "";
        this.carrots = [];
        this.lions = [];
        this.lakes = [];
        this.rabbits = [];
        this._elementsCounter = 0;
        this.size = size;

        this.drawingLakesRequired = true;
        this.drawingCarrotsRequired = true;
        this.drawingRabbitsRequired =true;
        this.drawingLionsRequired = true;

        this.createAllElements();
    }

    public get settings(): Settings {
        return this._settings;
    }
    public set settings(value: Settings) {
        this._settings = value;
    }
    public get reasonGameOver(): String {
        return this._reasonGameOver;
    }
    public set reasonGameOver(value: String) {
        this._reasonGameOver = value;
    }
    public get carrots(): Carrot[] {
        return this._carrots;
    }
    public set carrots(value: Carrot[]) {
        this._carrots = value;
    }
    public get lions(): Lion[] {
        return this._lions;
    }
    public set lions(value: Lion[]) {
        this._lions = value;
    }
    public get lakes(): Lake[] {
        return this._lakes;
    }
    public set lakes(value: Lake[]) {
        this._lakes = value;
    }
    public get rabbits(): Rabbit[] {
        return this._rabbits;
    }
    public set rabbits(value: Rabbit[]) {
        this._rabbits = value;
    }
    public get size(): Size {
        return this._size;
    }
    public set size(value: Size) {
        this._size = value;
    }

    public get drawingLakesRequired(): boolean {       
        return this._drawingLakesRequired;
    }
    public set drawingLakesRequired(value: boolean) {
        this._drawingLakesRequired = value;
    }
    public get drawingCarrotsRequired(): boolean {
        return this._drawingCarrotsRequired;
    }
    public set drawingCarrotsRequired(value: boolean) {
        this._drawingCarrotsRequired = value;
    }
    public get drawingRabbitsRequired(): boolean {
        return this._drawingRabbitsRequired;
    }
    public set drawingRabbitsRequired(value: boolean) {
        this._drawingRabbitsRequired = value;
    }
    public get drawingLionsRequired(): boolean {
        return this._drawingLionsRequired;
    }
    public set drawingLionsRequired(value: boolean) {
        if(!value) {
            this.lions.forEach(elm=> elm.drawingRequired = false);
        }
        this._drawingLionsRequired = value;
    }

    private clearAllElements() {
        this.lions = [];
        this.carrots = [];
        this.lakes = [];
        this.rabbits = [];
    }

    private removeElemsFromGroup(group: PlaygroundElm[]) {
        let groupDrawingRequired = false;
        let index = -1;

        while((index = group.findIndex(elm=>elm.markForDeletion == true)) > -1){
            const elemType = group[index].type;
            const elemId = group[index].id;
            
            //before a lion is removed, it needs to be removed from the player.
            if(elemType == "Lion") this.settings.deleteLionFromPlayer(elemId);

            group.splice(index, 1);

            //each time that a carrot is deleted, a new one is added to the playground
            if (elemType == "Carrot") this.addCarrot();
            
            if(!groupDrawingRequired) groupDrawingRequired = true;
        }

        return groupDrawingRequired;
    }

    public removeAllElmsMarkedForDeletion() {
        if(this.removeElemsFromGroup(this.lakes)){
            this.drawingLakesRequired = true;
        }
        if(this.removeElemsFromGroup(this.carrots)){
            this.drawingCarrotsRequired = true;
        }
        if(this.removeElemsFromGroup(this.rabbits)){
            this.drawingRabbitsRequired = true;
        }
        if(this.removeElemsFromGroup(this.lions)){
            this.drawingLionsRequired = true;
        }
    }

    private createAllElements(): boolean {
        const maxReboots = 10;
        let createElements = true;
        let rebootsCounter = 0;
        try {
            do {
                rebootsCounter++;
                this.clearAllElements();
                if (this.createGroupOfElems('Lake', this.settings.nbrOfLakes, new Size(400, 400), this.lakes)) { continue; };
                if (this.createGroupOfElems('Carrot', this.settings.nbrOfCarrots, new Size(50, 50), this.carrots)) { continue; };
                if (this.createGroupOfElems('Rabbit', this.settings.nbrOfRabbits, new Size(50, 50), this.rabbits)) { continue; };
                if (this.createGroupOfElems('Lion', this.settings.nbrOfLions, new Size(50, 50), this.lions)) { continue; };
                createElements = false;
            }
            while (createElements && rebootsCounter <= maxReboots)

            if (rebootsCounter >= maxReboots) {
                throw console.error("unable to generate playground");
            }
            this.assignLionsToPlayers();
        }
        catch (error
        ) {
            console.error("unable to generate playground objects");
            return false;
        }

        return true;
    }

    private assignLionsToPlayers() {
        this.lions.forEach((lion, index) => {

            if (this.settings.players[index]) {
                this.settings.players[index].lion = lion;
            }
        });
    }

    private createPlaygroundElm(id, size, type) {

        switch (type) {
            case 'Lake':
                return new Lake(id, null, size);
            case 'Carrot':
                return new Carrot(id, null, size);
            case 'Rabbit':
                return new Rabbit(id, null, size);
            case 'Lion':
                return new Lion(++this._elementsCounter, null, size);
            default:
                throw new Error("not supported element");
        }
    }

    private createGroupOfElems(type: string, totalElms: number, elmSize: Size, arr: any[]): boolean {
        let counter = 0;
        const maxRndGenerationIterations = 10;
        let rndPositionCounter = 0;
        const rndPositionGenerator = new RndPosition(this.size.w, this.size.h, elmSize);

        try {
            while (counter++ < totalElms) {

                const playgroundElem = this.createPlaygroundElm(++this._elementsCounter, elmSize, type);

                do {
                    rndPositionCounter++;
                    playgroundElem.initialPosition = rndPositionGenerator.generatePosition();
                }
                while (this.collidesWithElements(playgroundElem) && rndPositionCounter < maxRndGenerationIterations);

                if (this.collidesWithElements(playgroundElem)) { return true; }

                arr.push(playgroundElem);
            }
        } catch (error) {
            console.error("unable to generate elms", error);
        }

        return false;
    }

    private collidesWithElements(elem: PlaygroundElm) {
        if (elem) {
            return CollisionDetection.collidesWithElemInArray(elem, this.lakes) ||
                CollisionDetection.collidesWithElemInArray(elem, this.carrots) ||
                CollisionDetection.collidesWithElemInArray(elem, this.lions) ||
                CollisionDetection.collidesWithElemInArray(elem, this.rabbits);
        }
        return false;
    }

    private checkCollisionByTriggerType(arrTriggers, arrTargets){
        arrTriggers.forEach(triggerElem => {
            arrTargets.forEach(collidedElem=>{
                if(CollisionDetection.objectsCollision(triggerElem, collidedElem)){
                    collidedElem.collitionDetected = true;
                    triggerElem.executeCollisionWith(collidedElem.type);
                };
            });
        });
    }

    //only object that implement the interface move can trigger a collition
    //therefore only lions and rabbits are evaluated
    public checkCollisions(){
        this.checkCollisionByTriggerType(this.rabbits, [...this.lakes, ...this.carrots]);
        this.checkCollisionByTriggerType(this.lions, [...this.lakes, ...this.carrots, ...this.rabbits]);
    }
    
    public updatePosition():void{
        this.lions.forEach(lion=> lion.updatePosition(this.size));
        this.rabbits.forEach(lion=> lion.updatePosition(this.size));
    }

    public updateRabbitsTarget(){
        this.rabbits.forEach(
            rabbit=> rabbit.updateTarget(this.lakes, this.carrots, this.lions)
        );
    }

    pause() {
        console.log("pause");
    }

    endGame() {
        console.log("endGame");
    }

    resume() {
        console.log("resume");
    }

    reactToKey() {
        console.log("pause");
    }

    getPlaygroundElms() {
        const playgroundElms = [];

        this.lakes.forEach(lake => playgroundElms.push(lake));
        this.carrots.forEach(carrot => playgroundElms.push(carrot));
        this.rabbits.forEach(rabbit => playgroundElms.push(rabbit));
        this.lions.forEach(lion => playgroundElms.push(lion));

        return playgroundElms;
    }

    getPrintables() {
        const printables: Printable[] = [];

        this.getPlaygroundElms().forEach(playgroundElm => {
            playgroundElm.objAsPrintable().forEach(printable => {
                printables.push(printable);
            });
        }
        )
        return printables;
    }

    public updateDrawingRequirement():void{
        if(!this.drawingLakesRequired)
        this.drawingLakesRequired = this.lakes.some(elm=>{
            return elm.markForDeletion == true || elm.drawingRequired});

        if(!this.drawingCarrotsRequired)
        this.drawingCarrotsRequired = this.carrots.some(elm=>{
            return elm.markForDeletion == true || elm.drawingRequired});
   
        if(!this.drawingRabbitsRequired)
        this.drawingRabbitsRequired = this.rabbits.some(elm=>{
            return elm.markForDeletion == true || elm.drawingRequired});

        if(!this.drawingLionsRequired)
        this.drawingLionsRequired = this.lions.some(elm=>{
            return elm.markForDeletion == true || elm.drawingRequired});

    }

    private addCarrot(){
        if(this.carrots.length < this.settings.nbrOfCarrots ){
            this.createGroupOfElems('Carrot', this.settings.nbrOfCarrots, new Size(50, 50), this.carrots);
        }
    }

}
