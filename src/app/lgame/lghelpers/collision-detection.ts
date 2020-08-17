import { PlaygroundElm } from '../playground/playgroundElms/playground-elm';

export class CollisionDetection {

        //receives two object to compare and returns a boolean: true when objects collide.
        static objectsCollision(firstObj:PlaygroundElm, secondObj:PlaygroundElm) {

            //vertical collision (two conditions):
            let vCollision =
                ((firstObj.currentPosition.y <= secondObj.currentPosition.y)
                    && (firstObj.currentPosition.y + firstObj.currentSize.h >= secondObj.currentPosition.y))
                ||
                ((firstObj.currentPosition.y >= secondObj.currentPosition.y)
                    && (firstObj.currentPosition.y <= secondObj.currentPosition.y + secondObj.currentSize.h));
    
            //horizontal collision (two conditions)
            let hCollision =
                ((firstObj.currentPosition.x <= secondObj.currentPosition.x)
                    && (firstObj.currentPosition.x + firstObj.currentSize.w >= secondObj.currentPosition.x))
                ||
                ((firstObj.currentPosition.x >= secondObj.currentPosition.x)
                    && (firstObj.currentPosition.x <= secondObj.currentPosition.x + secondObj.currentSize.w));
    
            return vCollision && hCollision;
        }

        static objectsCollisionWithProximity(firstObj, secondObj) {
            //determine proximity allowed
            const allowedProximity = firstObj.allowedProximity();
    
            //vertical collision (two conditions):
            let vCollision =
                ((firstObj.currentPosition.y - allowedProximity.v <= secondObj.currentPosition.y)
                    && (firstObj.currentPosition.y + firstObj.currentSize.h + allowedProximity.v >= secondObj.currentPosition.y))
                ||
                ((firstObj.currentPosition.y - allowedProximity.v >= secondObj.currentPosition.y)
                    && (firstObj.currentPosition.y - allowedProximity.v <= secondObj.currentPosition.y + secondObj.currentSize.h));
    
            //horizontal collision (two conditions)
            let hCollision =
                ((firstObj.currentPosition.x - allowedProximity.h <= secondObj.currentPosition.x)
                    && (firstObj.currentPosition.x + allowedProximity.h + firstObj.currentSize.w >= secondObj.currentPosition.x))
                ||
                ((firstObj.currentPosition.x - allowedProximity.h >= secondObj.currentPosition.x)
                    && (firstObj.currentPosition.x - allowedProximity.h <= secondObj.currentPosition.x + secondObj.currentSize.w));
    
            return vCollision && hCollision;
        }

        static borderCollision(obj) {
            if (!obj) {
                return false;
            }
            //bottom collision:
            let bCol = obj.currentPosition.y + obj.velocity.vY + obj.currentSize.h >= obj.ctx.height;
            //top collision:
            let tCol = obj.currentPosition.y + obj.velocity.vY < 0;
            //left collision:
            let lCol = obj.currentPosition.x + obj.velocity.vX < 0;
            //right collision:
            let rCol = obj.currentPosition.x + obj.velocity.vX + obj.currentSize.w >= obj.ctx.width;
    
            return bCol || tCol || lCol || rCol;
        }

        static collidesWithElemInArray(newElm:PlaygroundElm, arr:PlaygroundElm[]){

            return arr.some(elemFromArr=>{
                //TODO COLLISION
                return CollisionDetection.objectsCollision(newElm, elemFromArr);
            })
        }
}
