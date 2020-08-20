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

    isSupportedKey(key: String) {
        return this.up == key || this.right == key || this.down == key || this.left ==key;
    }

    getInstrFromKey(key: String) {
        switch (key) {
            case this.up:
                return "up";
            case this.right:
                return "right";
            case this.down:
                return "down";
            case this.left:
                return "left";
            default:
                return "not supported";
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
