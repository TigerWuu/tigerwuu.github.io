import Component from "./component.js";
import Banner from "./banner.js";
import Grid from "./grid.js";
import Reset from "./reset.js";
import "./title.js";

import "./main.css";

class Main extends Component{
    constructor(root){
        super(root);
        this.firstTurn = "X";
        this.banner = new Banner(root.querySelector(Banner.getRoot()), this.firstTurn);
        this.banner.displayTurn();

        this.grid = new Grid(root.querySelector(Grid.getRoot()), this.firstTurn);
        this.grid.reg("gridClick", this.handleGridClick.bind(this));
        this.grid.reg("gameFinished", this.handleGameFinished.bind(this));

        this.reset = new Reset(root.querySelector(Reset.getRoot()));
        this.reset.reg("resetClick", this.handleResetClick.bind(this));
    }

    static getRoot(){
        return ".main";
    }
    
    handleGridClick(turn){
        this.banner.setTurn(turn);
        this.banner.displayTurn();
    }

    handleGameFinished(winner){
        this.banner.setWinner(winner);
        // this.banner.reset();
        this.grid.reset();
    }

    handleResetClick(){
        this.banner.reset();
        this.grid.reset();
    }
}

window.onload = function(){
    var main = new Main(document.querySelector(Main.getRoot())); 
} 