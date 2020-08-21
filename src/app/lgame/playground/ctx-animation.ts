import { ImagesLoader } from '../lghelpers/images-loader';
import { Rabbit } from './playgroundElms/rabbit';
import { Lion } from './playgroundElms/lion';
import { Carrot } from './playgroundElms/carrot';
import { Lake } from './playgroundElms/lake';
import { Size } from '../lghelpers/size';
import { Game } from './game';

export class CtxAnimation {
    private _ctxBg: CanvasRenderingContext2D;
    private _ctxLakes: CanvasRenderingContext2D;
    private _ctxCarrots: CanvasRenderingContext2D;
    private _ctxRabbits: CanvasRenderingContext2D;
    private _ctxLions: CanvasRenderingContext2D;
    private _canvasSize: Size;

    private _imageLoader: ImagesLoader;
    public ready: Promise<boolean>;

    constructor(ctxBg: CanvasRenderingContext2D,
        ctxLakes: CanvasRenderingContext2D,
        ctxCarrots: CanvasRenderingContext2D,
        ctxRabbits: CanvasRenderingContext2D,
        ctxLions: CanvasRenderingContext2D,
        canvasSize:Size
        ) {
        this.ctxBg = ctxBg;
        this.ctxLakes = ctxLakes;
        this.ctxCarrots = ctxCarrots;
        this.ctxRabbits = ctxRabbits;
        this.ctxLions = ctxLions;
        this.canvasSize = canvasSize;

        this.ready = new Promise((resolve, reject)=>{

            this._imageLoader = new ImagesLoader();
            resolve(this._imageLoader.loadImages())
        }
        )
    }

    public get ctxBg(): CanvasRenderingContext2D {
        return this._ctxBg;
    }
    public set ctxBg(value: CanvasRenderingContext2D) {
        this._ctxBg = value;
    }
    public get ctxLakes(): CanvasRenderingContext2D {
        return this._ctxLakes;
    }
    public set ctxLakes(value: CanvasRenderingContext2D) {
        this._ctxLakes = value;
    }    
    public get ctxCarrots(): CanvasRenderingContext2D {
        return this._ctxCarrots;
    }
    public set ctxCarrots(value: CanvasRenderingContext2D) {
        this._ctxCarrots = value;
    }
    public get ctxRabbits(): CanvasRenderingContext2D {
        return this._ctxRabbits;
    }
    public set ctxRabbits(value: CanvasRenderingContext2D) {
        this._ctxRabbits = value;
    }
    public get ctxLions(): CanvasRenderingContext2D {
        return this._ctxLions;
    }
    public set ctxLions(value: CanvasRenderingContext2D) {
        this._ctxLions = value;
    }
    public get canvasSize(): Size {
        return this._canvasSize;
    }
    public set canvasSize(value: Size) {
        this._canvasSize = value;
    }
    private clearCanvas(context:CanvasRenderingContext2D){
        context.clearRect(0,0,this.canvasSize.w, this.canvasSize.h);
    }

    private drawLions(lions: Lion[]): void {
        let index = 0;
        const iterations = lions.length;
        this.clearCanvas(this.ctxLions);

        console.log("drawing lions");

        for(index; index<iterations; index++){
            this.ctxLions.drawImage(this._imageLoader.getlion(index),
            lions[index].currentPosition.x, 
            lions[index].currentPosition.y,
            lions[index].initialSize.w,
            lions[index].initialSize.h);

            // if(lions[index].collides){
            //     console.log(lions[index].collides);
            //     this._ctxBg.beginPath();
            //     this._ctxBg.rect(lions[index].currentPosition.x, lions[index].currentPosition.y, lions[index].initialSize.w, lions[index].initialSize.h);
            //     this._ctxBg.stroke();
            // }
        }
    }

    private drawRabbits(rabbits: Rabbit[]): void {
        let index = 0;
        const iterations = rabbits.length;
        
        this.clearCanvas(this.ctxRabbits);
 
        for(index; index<iterations; index++){
            this.ctxRabbits.drawImage(this._imageLoader.rabbit,
            rabbits[index].currentPosition.x, 
            rabbits[index].currentPosition.y,
            rabbits[index].initialSize.w,
            rabbits[index].initialSize.h);
        }
     }

    private drawCarrots(carrots: Carrot[]): void {
        let index = 0;
        const iterations = carrots.length;
                
        this.clearCanvas(this.ctxCarrots);
 
        for(index; index<iterations; index++){
            this.ctxCarrots.drawImage(this._imageLoader.carrot,
            carrots[index].currentPosition.x, 
            carrots[index].currentPosition.y,
            carrots[index].initialSize.w,
            carrots[index].initialSize.h);
        }
    }

    private drawLakes(lakes: Lake[]): void {
        let index = 0;
        const iterations = lakes.length;

        this.clearCanvas(this.ctxLakes);
        console.log(" clear lakes", iterations);
        
        for(index; index<iterations; index++){
            //dry background
            this.ctxLakes.drawImage(
                this._imageLoader.lakeBg,
                lakes[index].currentPosition.x, 
                lakes[index].currentPosition.y, 
                lakes[index].currentSize.w,
                lakes[index].currentSize.h);
            this.ctxLakes.drawImage(
                this._imageLoader.lake,
                lakes[index].initialPosition.x, 
                lakes[index].initialPosition.y, 
                lakes[index].initialSize.w,
                lakes[index].initialSize.h);
        }
     }

    public draw(game:Game) {
        if(this._imageLoader.imgsLoaded){
            if(game.drawingLakesRequired) {
                this.drawLakes(game.lakes);
                game.drawingLakesRequired = false;
            }
            if(game.drawingCarrotsRequired) {
                this.drawCarrots(game.carrots);
                game.drawingCarrotsRequired = false;
            }
            if(game.drawingRabbitsRequired) {
                this.drawRabbits(game.rabbits);
                game.drawingRabbitsRequired= false;
            }
            if(game.drawingLionsRequired) {
                this.drawLions(game.lions);
                game.drawingLionsRequired =false;
            }
            return true;
        }
        else{
            console.error("error!", this._imageLoader);
            return false;
        }
    }
}
