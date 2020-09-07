import { Keyboard } from './keyboard';
import { Lion } from '../playground/playgroundElms/lion';

export class Player {
    private _id: number;
    private _name: String;
    private _keyboard: Keyboard;
    private _lion: Lion;
    //playing
    private _active: boolean;

    constructor(id:number, keyboardControls:String[]){
        this._id = id;
        this.name = "Player "+ id;
        this._keyboard = new Keyboard(keyboardControls);
        //while playing, a lion is assigned
        this.lion = null;
        this._active = true;
    }

    public get id(): number {
        return this._id;
    }
    public get name(): String {
        return this._name;
    }
    public set name(value: String) {
        this._name = value;
    }
    public get keyboard(): Keyboard {
        return this._keyboard;
    }
    public get lion(): Lion {
        return this._lion;
    }
    public set lion(value: Lion) {
        this._lion = value;
    }
    public get active(): boolean {
        return this._active;
    }
    public set active(value: boolean) {
        this._active = value;
    }

    public reactToKeyInstr(key:string){
        const instr = this.keyboard.getInstrFromKey(key);
         if(instr != -1 && this.lion){
             this.lion.reactToInstr(instr);
         }
    }

    public reactToBtnInstr(instr:number){
        if(instr != -1 && this.lion){
            this.lion.reactToInstr(instr);
        }
    }
}
