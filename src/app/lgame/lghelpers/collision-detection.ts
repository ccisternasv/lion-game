import { PlaygroundElm } from '../playground/playgroundElms/playground-elm';
import { Point } from './point';
import { Size } from './size';

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

        //allowed proximity 2 times the size
        static objectsCollisionWithProximity(firstObj:PlaygroundElm, secondObj:PlaygroundElm) {
            //determine proximity allowed
            const allowedProximity = new Point(firstObj.currentSize.w *2, firstObj.currentSize.h *2);
    
            //vertical collision (two conditions):
            let vCollision =
                ((firstObj.currentPosition.y - allowedProximity.y <= secondObj.currentPosition.y)
                    && (firstObj.currentPosition.y + firstObj.currentSize.h + allowedProximity.y >= secondObj.currentPosition.y))
                ||
                ((firstObj.currentPosition.y - allowedProximity.y >= secondObj.currentPosition.y)
                    && (firstObj.currentPosition.y - allowedProximity.y <= secondObj.currentPosition.y + secondObj.currentSize.h));
    
            //horizontal collision (two conditions)
            let hCollision =
                ((firstObj.currentPosition.x - allowedProximity.x <= secondObj.currentPosition.x)
                    && (firstObj.currentPosition.x + allowedProximity.x + firstObj.currentSize.w >= secondObj.currentPosition.x))
                ||
                ((firstObj.currentPosition.x - allowedProximity.x >= secondObj.currentPosition.x)
                    && (firstObj.currentPosition.x - allowedProximity.x <= secondObj.currentPosition.x + secondObj.currentSize.w));
    
            return vCollision && hCollision;
        }

        static borderCollision(elem:PlaygroundElm, ctxSize:Size) {
            if (!elem) {
                return false;
            }
            //bottom collision:
            let bCol = elem.currentPosition.y + elem.currentSize.h >= ctxSize.h;
            //top collision:
            let tCol = elem.currentPosition.y < 0;
            //left collision:
            let lCol = elem.currentPosition.x < 0;
            //right collision:
            let rCol = elem.currentPosition.x + elem.currentSize.w >= ctxSize.w;
    
            return bCol || tCol || lCol || rCol;
        }

        static correctBorderCollision(elem:PlaygroundElm, ctxSize:Size){

            //bottom collision:
            if(elem.currentPosition.y + elem.currentSize.h >= ctxSize.h){
                elem.currentPosition.y = ctxSize.h - elem.currentSize.h;
            };
            //top collision:
            if(elem.currentPosition.y < 0){
                elem.currentPosition.y = 0;
            };
            //left collision:
            if(elem.currentPosition.x < 0){
                elem.currentPosition.x =0;
            };
            //right collision:
            if(elem.currentPosition.x + elem.currentSize.w >= ctxSize.w){
                elem.currentPosition.x = ctxSize.w - elem.currentSize.w;
            };
    
            return;
        }

        static collidesWithElemInArray(newElm:PlaygroundElm, arr:PlaygroundElm[]){

            return arr.some(elemFromArr=>{
                //TODO COLLISION
                return CollisionDetection.objectsCollision(newElm, elemFromArr);
            })
        }
}
