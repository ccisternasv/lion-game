export class Point {
    private _x: number;
    private _y: number;
    private _minX = 0;
    private _minY = 0;

    constructor(_x: number = 0, _y: number = 0) {
        this.x = _x;
        this.y = _y;
    }

    public set x(_x: number) {
        if (_x >= this._minX) {
            this._x = _x;
        }
    }

    public set y(_y: number) {
        if (_y >= this._minY) {
            this._y = _y;
        }
    }

    public get  x(): number {
        return this._x;
    }

    public get  y(): number {
        return this._y;
    }
}
