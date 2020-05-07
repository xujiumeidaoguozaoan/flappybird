import {Pipe} from "./Pipe.js";
import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class PipeDown extends Pipe{
    constructor(top){
        const image = Sprite.getImage('pipedown');
        super(image,top);
    }
    draw(){
        let gap = window.innerHeight / 5;
        this.y = this.top + gap;
        super.draw();
    }
}
