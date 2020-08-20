import { timeStamp } from 'console';
import { Lake } from '../playground/playgroundElms/lake';
import { promise } from 'protractor';

export class ImagesLoader {

    private _lions: HTMLImageElement[];
    private _rabbit: HTMLImageElement;
    private _carrot:HTMLImageElement;
    private _lake:HTMLImageElement;
    private _lakeBg:HTMLImageElement;

    private _lionsSrcs:string[];
    private _rabbitSrc:string;
    private _carrotSrc:string;
    private _lakeSrc:string;
    private _lakeBgSrc:string;

    private _imgsLoaded: boolean;


    constructor(){
        const baseImgsSrcPath = "../../../assets/images/lion_game/";
        this._lions = [];
        this._lions[0] = new Image();
        this._lions[1] = new Image();
        this._rabbit = new Image();
        this._carrot = new Image();
        this._lake = new Image();
        this._lakeBg = new Image();

        this._lionsSrcs = [];
        this._lionsSrcs[0]= baseImgsSrcPath +"lion.svg";
        this._lionsSrcs[1]= baseImgsSrcPath +"lion_blue.svg";
        this._rabbitSrc = baseImgsSrcPath +"rabbit.svg";
        this._carrotSrc = baseImgsSrcPath +"carrot.svg";
        this._lakeSrc = baseImgsSrcPath +"lake.svg";
        this._lakeBgSrc = baseImgsSrcPath +"lake_drought.svg";

        this.imgsLoaded = false;
    }

    public getlion(lion:number): HTMLImageElement {
        return this._lions[lion];
    }
    public get rabbit(): HTMLImageElement {
        return this._rabbit;
    }
    public get carrot(): HTMLImageElement {
        return this._carrot;
    }
    public get lake(): HTMLImageElement {
        return this._lake;
    }
    public get lakeBg(): HTMLImageElement {
        return this._lakeBg;
    }
    public get imgsLoaded(): boolean {
        return this._imgsLoaded;
    }
    public set imgsLoaded(value: boolean) {
        this._imgsLoaded = value;
    }

    public loadImages():Promise<boolean>{
        let promises = [];
        try{
            
            promises.push(this.createPromise(this._lions[0], this._lionsSrcs[0]));
            promises.push(this.createPromise(this._lions[1], this._lionsSrcs[1]));
            promises.push(this.createPromise(this._rabbit, this._rabbitSrc));
            promises.push(this.createPromise(this._carrot, this._carrotSrc));
            promises.push(this.createPromise(this._lake, this._lakeSrc));
            promises.push(this.createPromise(this._lakeBg, this._lakeBgSrc));
            
            return Promise.all(promises)
            .then(()=>{ 
                this.imgsLoaded = true;
                return true;})
            .catch(()=>{return false;});
        }
        catch(error){
            return Promise.reject(()=> false);
        }
    }

    private createPromise(obj, src){
        return new Promise((resolve, reject)=>{
            obj.onload = resolve;
            obj.onerror = reject;
            window.setTimeout(()=>{
                obj.src = src;
                obj.width = 100;
                obj.height = 100;
            }, 0);
        })
    }
}
