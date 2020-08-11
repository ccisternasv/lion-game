import { Point } from './point';

export class TargetElm {
    private _refPosition: Point;
    private _dx: number;
    private _dy: number;
    private _hypothenus: number;
    private _type: string;
    private _posibleTypes: string[];

    constructor() {

    }

    public get refPosition(): Point {
        return this._refPosition;
    }
    public set refPosition(value: Point) {
        this._refPosition = value;
    }
    public get dx(): number {
        return this._dx;
    }
    public set dx(value: number) {
        this._dx = value;
    }
    public get dy(): number {
        return this._dy;
    }
    public set dy(value: number) {
        this._dy = value;
    }
    public get hypothenus(): number {
        return this._hypothenus;
    }
    public set hypothenus(value: number) {
        this._hypothenus = value;
    }
    public get type(): string {
        return this._type;
    }
    public set type(value: string) {
        this._type = value;
    }
    public get posibleTypes(): string[] {
        return this._posibleTypes;
    }
    public set posibleTypes(value: string[]) {
        this._posibleTypes = value;
    }

    public calcDistance(){
        return true;
    }
}
