export class Size {
    private _h: number;
    private _w: number;
    private _minW = 0;
    private _minH = 0;

    constructor(_w: number = 0, _h: number = 0) {
        this.w = _w;
        this.h = _h;
    }

    public set w(_w: number) {
        if (_w >= this._minW) {
            this._w = _w;
        }
    }

    public set h(_h: number) {
        if (_h >= this._minH) {
            this._h = _h;
        }
    }

    public get w(): number {
        return this._w;
    }

    public get h(): number {
        return this._h;
    }
}
