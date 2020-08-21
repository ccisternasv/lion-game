import { Component, OnInit, ViewChild, ElementRef, HostListener, Input } from '@angular/core';
import { Game } from './game';
import { Settings } from '../settings/settings';
import { CtxAnimation } from './ctx-animation';
import { Size } from '../lghelpers/size';
import { Point } from '../lghelpers/point';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.css']
})
export class PlaygroundComponent implements OnInit {

  @ViewChild("lgamecanvasbg", { static: true })
  lgamecanvasbg: ElementRef<HTMLCanvasElement>;
  @ViewChild("lgamecanvaslakes", { static: true })
  lgamecanvaslakes: ElementRef<HTMLCanvasElement>;
  @ViewChild("lgamecanvascarrots", { static: true })
  lgamecanvascarrots: ElementRef<HTMLCanvasElement>;
  @ViewChild("lgamecanvasrabbits", { static: true })
  lgamecanvasrabbits: ElementRef<HTMLCanvasElement>;
  @ViewChild("lgamecanvaslions", { static: true })
  lgamecanvaslions: ElementRef<HTMLCanvasElement>;

  private _settings: Settings;


  private _game: Game;
  private _context: CtxAnimation;
  private _drawing: boolean;

  private _requestedAnimationFrameId:number;

  constructor() {
    this._game = null;
    this._context = null;
    this.drawing = true;
  }
@Input("settings")
  public get settings(): Settings {
    return this._settings;
  }

  public set settings(value: Settings) {
    this._settings = value;
  }
  public get drawing(): boolean {
    return this._drawing;
  }
  public set drawing(value: boolean) {
    this._drawing = value;
  }

  play(){
      this.animate();
  }
  
  draw(){
    if(this.drawing) {
          this._game.removeAllElmsMarkedForDeletion();
          this._context.draw(this._game);
          this._requestedAnimationFrameId = window.requestAnimationFrame(this.draw.bind(this));
        }
         else{
           this.cancelAnimationFrame();
         }
      }

  public animate(){
    this._context.ready.then(()=>{
      this.draw();
      window.setTimeout(()=> this._game.lions[0].markForDeletion=true, 1000);
      window.setTimeout(()=> this.cancelAnimationFrame(), 5000);

    });
  }

  private cancelAnimationFrame(){
    window.cancelAnimationFrame(this._requestedAnimationFrameId);
  }

  ngAfterViewInit() {
    const ctxBg = this.lgamecanvasbg.nativeElement.getContext('2d');
    const ctxLakes = this.lgamecanvaslakes.nativeElement.getContext('2d');
    const ctxCarrots = this.lgamecanvascarrots.nativeElement.getContext('2d');
    const ctxRabbits = this.lgamecanvasrabbits.nativeElement.getContext('2d');
    const ctxLions = this.lgamecanvaslions.nativeElement.getContext('2d');

    const canvasSize = new Size(this.lgamecanvasbg.nativeElement.offsetWidth,  this.lgamecanvasbg.nativeElement.offsetHeight);
    this.setCanvasSize(canvasSize);
    this._game = new Game(this.settings, canvasSize );

    this._context = new CtxAnimation(ctxBg, ctxLakes, ctxCarrots, ctxRabbits, ctxLions, canvasSize);
    this._context.ready.then(()=>{
      this.animate();
    });
  }

  setCanvasSize(size:Size){
    this.lgamecanvasbg.nativeElement.width  = size.w;
    this.lgamecanvasbg.nativeElement.height=size.h;
    
    this.lgamecanvaslakes.nativeElement.width  = size.w;
    this.lgamecanvaslakes.nativeElement.height=size.h;

    this.lgamecanvascarrots.nativeElement.width  = size.w;
    this.lgamecanvascarrots.nativeElement.height=size.h;

    this.lgamecanvasrabbits.nativeElement.width  = size.w;
    this.lgamecanvasrabbits.nativeElement.height=size.h;

    this.lgamecanvaslions.nativeElement.width  = size.w;
    this.lgamecanvaslions.nativeElement.height=size.h;
  }

  reactToInst(instr:string){
    console.log(instr);
  }

  ngOnInit() {

  }

}
