export class Keyboard {
    //supported controls
    private _up: String;
    private _left: String;
    private _down: String;
    private _right: String;

    constructor(controls:String[]) {
        this.up = controls[0];
        this.right = controls[1];
        this.down = controls[2];
        this.left = controls[3];
    }

    getInstrFromKey(key: String):number {
        switch (key) {
            case this.up:
                return 0;
            case this.right:
                return 1;
            case this.down:
                return 2;
            case this.left:
                return 3;
            default:
                return -1;
        }
    }

    public get up(): String {
        return this._up;
    }
    public set up(value: String) {
        this._up = value;
    }
    public get left(): String {
        return this._left;
    }
    public set left(value: String) {
        this._left = value;
    }
    public get down(): String {
        return this._down;
    }
    public set down(value: String) {
        this._down = value;
    }
    public get right(): String {
        return this._right;
    }
    public set right(value: String) {
        this._right = value;
    }
}
