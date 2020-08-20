import { Player } from './player';

export class Settings {
    private _nbrOfCarrots: number;
    private _minNbrOfCarrots:number;
    private _maxNbrOfCarrots:number;

    private _nbrOfLions: number;
    private _minNbrOfLions:number;
    private _maxNbrOfLions:number;

    private _nbrOfLakes: number;
    private _minNbrOfLakes:number;
    private _maxNbrOfLakes:number;

    private _nbrOfRabbits: number;
    private _minNbrOfRabbits:number;
    private _maxNbrOfRabbits:number;

    private _level: number;
    private _supportedLevels:number[];

    private _players: Player[];
    private _minNbrOfPlayer:number;
    private _maxNbrOfPlayer:number;

    constructor(){
        this._minNbrOfCarrots=1;
        this._maxNbrOfCarrots= 10;
        this.nbrOfCarrots = this._minNbrOfCarrots;

        this._minNbrOfLions = 1;
        this._maxNbrOfLions = 2;
        this.nbrOfLions = this._minNbrOfLions;

        this._minNbrOfLakes = 1;
        this._maxNbrOfLakes = 8;
        this.nbrOfLakes = this._minNbrOfLakes;

        this._minNbrOfRabbits = 1;
        this._maxNbrOfRabbits = 8;
        this.nbrOfRabbits = this._minNbrOfRabbits;

        this._supportedLevels= [1,2,3,4,5,6];

        this._minNbrOfPlayer = 1;
        this._maxNbrOfPlayer = 2;

        this.setDefaultValues();

        const defaultKeyboard = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];
        this._players = [];
        this._players.push(new Player(1, defaultKeyboard));
    }

    public get nbrOfCarrots(): number {
        return this._nbrOfCarrots;
    }
    public set nbrOfCarrots(value: number) {
        if(value>= this._minNbrOfCarrots && value <= this._maxNbrOfCarrots){
            this._nbrOfCarrots = value;
        }
    }

    public get nbrOfLions(): number {
        return this._nbrOfLions;
    }
    public set nbrOfLions(value: number) {
        if(value>= this._minNbrOfLions && value <= this._maxNbrOfLions){
        this._nbrOfLions = value;
        }
    }
    public get nbrOfLakes(): number {
        return this._nbrOfLakes;
    }
    public set nbrOfLakes(value: number) {
        if(value>= this._minNbrOfLakes && value <= this._maxNbrOfLakes){
        this._nbrOfLakes = value;
        }
    }
    public get nbrOfRabbits(): number {
        return this._nbrOfRabbits;
    }
    public set nbrOfRabbits(value: number) {
        if(value>= this._minNbrOfRabbits && value <= this._maxNbrOfRabbits){
        this._nbrOfRabbits = value;
        }
    }
    public get level(): number {
        return this._level;
    }
    public set level(value: number) {
        if(this._supportedLevels.indexOf(value)> -1){
        this._level = value;
        }
    }
    public get players(): Player[] {
        return this._players;
    }

    public getPlayer(id:number): Player{
        const targetIndex = this.players.findIndex(player=>{
            return player.id== id;
        });

        if(targetIndex >-1){
            return this._players[targetIndex];
        }

        return null;
    }

    public addPlayer(player: Player) {
        if(this._players.length < this._maxNbrOfPlayer){
            this._players.push(player);
        }
    }

    public deletePlayer(id:number){
        if(this._players.length > this._minNbrOfPlayer){
            let refIndx = this._players.findIndex(player=> {return player.id == id});

            if(refIndx >-1){
                this._players.splice(refIndx, 1);
            }
        }
    }

    private setDefaultValues(){
        this.nbrOfCarrots = 5;
        this.nbrOfLions =1;
        this.nbrOfLakes = 2;
        this.nbrOfRabbits = 3;
    }
    
}
