import {Pipe} from "./Pipe.js";
import {Sprite} from "../base/Sprite.js";

export class PipeUp extends Pipe{
    constructor(top){
        const image = Sprite.getImage('pipeup');
        super(image,top);
    }
    draw(){
        this.y = this.top - this.height;
        super.draw();
    }
}