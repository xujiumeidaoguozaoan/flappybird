import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {Director} from "./js/Director.js";
import {BackGround} from "./js/runtime/BackGround.js";
import {DataStore} from "./js/base/DataStore.js";
import {Birds} from "./js/player/Birds.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";

export class Main {
    constructor() {
        // this.canvas = wx.createCanvas();
        this.canvas = document.getElementById('game');
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourceLoader.create();
        loader.onLoaded(map => this.onResourceFirstLoaded(map));
    }

    onResourceFirstLoaded(map) {
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        this.init();
    }

    init() {

        this.director.isGameOver = false;

        this.dataStore
            .put("pipe", [])
            .put('background', BackGround)
            .put('birds', Birds)
            .put('score', Score)
            .put('startButton', StartButton);
        this.registerEvent();
        this.director.createPipe();
        this.director.run();
    }

    registerEvent() {
        this.canvas.addEventListener('touchstart',e=>{
            //屏蔽js事件冒泡
            e.preventDefault();
            if(this.director.isGameOver){
                // console.log("游戏开始");
                this.init();
            }else{
                this.director.birdsEvent();
            }
        });
        // wx.onTouchStart(() => {
        //     if (this.director.isGameOver) {
        //         console.log("游戏开始");
        //         this.init();
        //     } else {
        //         this.director.birdsEvent();
        //     }
        // });
    }
}