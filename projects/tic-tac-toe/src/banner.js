import Component from "./component.js"

import "./banner.css";

export default class Banner extends Component{
    constructor(root, firstTurn){
        super(root)
        this.turn = firstTurn;
        this.xBox = this.root.querySelector(".X");
        this.oBox = this.root.querySelector(".O");
        this.score = {
            "X" : this.root.querySelector("#scoreX"),    
            "O" : this.root.querySelector("#scoreO"),    
        }
        this.winTimes = {
            "X" : 0,
            "O" : 0,
        }
    }

    static getRoot(){
        return ".banner";
    }

    getTurn(){
        return this.turn;
    }

    setTurn(turn){
        this.turn = turn;
    }

    setWinner(winner){
        if (winner === "X" || winner === "O"){
            this.winTimes[winner]+=1;
            this.score[winner].textContent = this.winTimes[winner];
        }
    }
    displayTurn(){
        if (this.getTurn() === "X"){
            this.xBox.classList.add("turnMark");
            this.oBox.classList.remove("turnMark");
        }
        else{
            this.xBox.classList.remove("turnMark");
            this.oBox.classList.add("turnMark");
            // this.box = this.root.querySelector(".O");
            // this.box.style.border = "red solid 3px";
            // this.box.style.borderRadius = "1rem";
      
        }
    }

    reset(){
        this.displayTurn();
        this.winTimes["X"] = 0;
        this.winTimes["O"] = 0;
        this.score["X"].textContent = 0;
        this.score["O"].textContent = 0;
    }
}