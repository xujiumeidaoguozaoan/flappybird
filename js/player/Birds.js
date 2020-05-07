import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

export class Birds extends Sprite{
    constructor(){
        const image = Sprite.getImage('birds');
        super(image,0,0,
            image.width,image.height,
            0,0,
            image.width,image.height);
        this.birdX = window.innerWidth/4;
        this.birdY = window.innerHeight/2;
        this.birdWidth = 42;
        this.birdHeight = 32;
        // this.index = 0;
        // this.count = 0;
        this.time = 0;
    }
    draw(){
        // const speed = 1;
        // this.count = this.count + speed;
        // if(this.index >= 2){
        //     this.count = 0;
        // }
        // this.index = this.count;

        const g = 0.98 / 10;
        const offsetUp = 20;
        const offsetY = (g * this.time * (this.time-offsetUp))/2;

        this.birdY = this.birdY + offsetY;
        this.time ++;

        super.draw(this.img,
            0,0,
            this.birdWidth,this.birdHeight,
            this.birdX,this.birdY,
            this.birdWidth,this.birdHeight);
    }
}