export class Point {
    private _x: number;
    private _y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    public set x(_x: number) {
            //avoid -0
        this._x = _x == 0 ? Math.abs(_x) : _x;
    }

    public set y(_y: number) {
            //avoid -0
            this._y = _y == 0 ? Math.abs(_y) : _y;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public update(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    //1: x, y
    //2: -x, y
    //3: -x, -y
    //4: x, -y
    private getQuadrant(): number {
        const negativeX = Math.sign(this.x) == -1;
        const negativeY = Math.sign(this.y) == -1;

        return negativeX ? negativeY ? 3 : 2 : negativeY ? 4 : 1;
    }

    private whatToVerifyByQuadrant(quadrant: number): string[] {
        const verifications = ["minX", "minY", "maxX", "maxY"];
        const toVerify = [];

        switch (quadrant) {
            case 1:
                toVerify.push(verifications[2]);
                toVerify.push(verifications[3]);
                break;
            case 2:
                toVerify.push(verifications[0]);
                toVerify.push(verifications[3]);
                break;
            case 3:
                toVerify.push(verifications[0]);
                toVerify.push(verifications[1]);
                break;
            case 4:
                toVerify.push(verifications[1]);
                toVerify.push(verifications[2]);
                break;
            default:
                throw new Error("Unable to determine");
        }
        return toVerify;
    }

    public checkOutOfBounds(minX:number, minY:number, maxX:number, maxY:number): boolean {
        const overMaxX = this.x > maxX;
        const overMaxY = this.y > maxY;
        const underMinX = this.x < minX;
        const underMinY = this.y < minY;

        return overMaxX || overMaxY || underMinX || underMinY;
    }



    private correctCoordinate(minX:number, minY:number, maxX:number, maxY:number, slope:number, yIntercept:number, verificate:string): Point {
        const point:Point = new Point(NaN, NaN);

        //TODO: fix
        // switch (verificate) {
        //     case 'minX':
        //         point.x = minX;
        //         point.y = point.getYOfX(point.x);
        //         break;
        //     case 'minY':
        //         point.y = minY;
        //         point.x = point.getXOfY(point.y);
        //         break;
        //     case 'maxX':
        //         point.x = maxX;
        //         point.y = point.getYOfX(point.x);
        //         break;
        //     case 'maxY':
        //         point.x = maxY;
        //         point.y = point.getXOfY(point.x);
        //         break;
        //     default:
        //         break;
        // }

        return point;
    }

    public assestCoordinate(minX:number, minY:number, maxX:number, maxY:number, slope:number, yIntercept:number): Point {

        if (!this.checkOutOfBounds(minX, minY, maxX, maxY)) {
            console.log('valid');
            return this;
        }
        else {
            const quadrant = this.getQuadrant();
            const verificationTab = this.whatToVerifyByQuadrant(quadrant);
            let i = 0;
            console.log(verificationTab);
            for (i; i < verificationTab.length; i++) {
                const newPoint:Point = this.correctCoordinate(minX, minY, maxX, maxY, slope, yIntercept, verificationTab[i]);
                if (!newPoint.checkOutOfBounds(minX, minY, maxX, maxY)) {
                    return newPoint;
                }
            }
            return null;
        }
    }
}
