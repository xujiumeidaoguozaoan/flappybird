import {DataStore} from "./base/DataStore.js";
import {PipeUp} from "./runtime/PipeUp.js";
import {PipeDown} from "./runtime/PipeDown.js";

export class Director{

    static getInstance(){
        if(!Director.instance){
            Director.instance = new Director();
        }
        return Director.instance;
    }
    constructor(){
        this.dataStore = DataStore.getInstance();
        this.moveSpeed = 2;
    }
    createPipe(){
        const minTop = window.innerHeight/8;
        const maxTop = window.innerHeight/2;
        const top = minTop + Math.random()*(maxTop - minTop);
        this.dataStore.get('pipe').push(new PipeUp(top));
        this.dataStore.get('pipe').push(new PipeDown(top));
    }
    birdsEvent(){
        this.dataStore.get('birds').time = 0;
    }
    static isStrike(bird,pipe){
        let s = false;
        if(bird.top>pipe.bottom||
            bird.bottom<pipe.top||
            bird.right<pipe.left||
            bird.left>pipe.right){
            s = true;
        }
        return !s;
    }
    // 碰撞检测
    check(){
        const birds = this.dataStore.get('birds');
        const pipes = this.dataStore.get('pipe');
        const score = this.dataStore.get('score');
        if(birds.birdY + birds.birdHeight >= window.innerHeight){
            this.isGameOver = true;
            return ;
        }

        const birdsBorder = {
            top: birds.birdY,
            bottom:birds.birdY+birds.birdHeight,
            left:birds.birdX,
            right:birds.birdX+birds.birdWidth,
        };
        const length = pipes.length;
        for(let i=0;i<length;i++){
            const pipe = pipes[i];
            const pipeBorder = {
                top:pipe.y,
                bottom:pipe.y+pipe.height,
                left:pipe.x,
                right:pipe.x+pipe.width,
            };
            if(Director.isStrike(birdsBorder,pipeBorder)){
                this.isGameOver = true;
                return;
            }
        }
        // 加分
        if(birds.birdX > pipes[0].x+pipes[0].width
            &&score.isScore){
            score.scoreNumber++;
            score.isScore = false;
        }
    }
    run(){
        this.check();
        if(!this.isGameOver){
            this.dataStore.get('background').draw();
            const pipe = this.dataStore.get('pipe');
            //回收pipe
            if( pipe[0].x + pipe[0].width <= 0  &&
                pipe.length === 4){
                pipe.shift();
                pipe.shift();
                //开启加分项
                this.dataStore.get('score').isScore = true;
            }
            //创建pipe
            if(pipe[0].x <= (window.innerWidth - pipe[0].width)/2 &&
                pipe.length === 2){
                this.createPipe();
            }
            this.dataStore.get('pipe').forEach(function(value,index,array){
                value.draw();
            });
            this.dataStore.get('score').draw();
            this.dataStore.get('birds').draw();

            //启动帧
            let timer = requestAnimationFrame(() => this.run());
            this.dataStore.put('timer',timer);
        }else{
            // game over 清楚变量
            this.dataStore.get('startButton').draw();
            cancelAnimationFrame(this.dataStore.get('timer'));
            this.dataStore.destory();
            // wx.triggerGC();
        }
    }
}