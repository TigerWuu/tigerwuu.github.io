import Component from "./component.js"
import Cell from "./cell.js"

import "./grid.css";

export default class Grid extends Component{
    constructor(root, firstTurn){
        super(root);
        this.turn = firstTurn;
        this.winner = "";
        this.cells = [[],[],[]];
        this.winBanner = this.root.querySelector("div");
        
        var els = this.root.querySelectorAll(Cell.getRoot());
        for (var index=0; index< els.length; index++){
            var row = Math.floor(index/3);
            var col = index%3;

            var cell = new Cell(els[index]);
            cell.reg("cellClick", this.handleCellClick.bind(this));
            this.cells[row].push(cell);
        }
        this.rows = row+1;
        this.cols = col+1;
    }

    static getRoot(){
        return ".grid";
    }

    getTurn(){
        return this.turn;
    }

    setTurn(turn){
        this.turn = turn;
    }

    switchTurn(){
        if (this.getTurn()==="X"){
            this.setTurn("O");
        }
        else{
            this.setTurn("X");
        }
    }

    isCellOccupied(mark){
        if (mark != ""){
            return true;
        }        
        else{
            return false;
        }
    }

    // can be improved....
    isGameFinished(){
        var isFinished = false;
        var occupiedCount = 0;
        if (this.cells[0][0].getMark() != "" && this.cells[1][1].getMark() != "" && this.cells[2][2].getMark() != ""){
            if (this.cells[0][0].getMark() === this.cells[1][1].getMark() && this.cells[1][1].getMark() === this.cells[2][2].getMark()){
                isFinished = true;
                this.winner = this.cells[0][0].getMark();
                return isFinished;
            }
        } 
        for(var i=0; i<this.cells.length;i++){
            if (this.cells[i][0].getMark() != "" && this.cells[i][1].getMark() != "" && this.cells[i][2].getMark() != ""){
                if (this.cells[i][0].getMark() === this.cells[i][1].getMark() && this.cells[i][1].getMark() === this.cells[i][2].getMark()){
                    isFinished = true;
                    this.winner = this.cells[i][0].getMark();
                    return isFinished;
                }
            }
            if (this.cells[0][i].getMark() != "" && this.cells[1][i].getMark() != "" && this.cells[2][i].getMark() != ""){
                if (this.cells[0][i].getMark() === this.cells[1][i].getMark() && this.cells[1][i].getMark() === this.cells[2][i].getMark()){
                    isFinished = true;
                    this.winner = this.cells[0][i].getMark();
                    return isFinished;
                }
            }
        }
        if (this.cells[0][2].getMark() != "" && this.cells[1][1].getMark() != "" && this.cells[2][0].getMark() != ""){
            if (this.cells[0][2].getMark() === this.cells[1][1].getMark() && this.cells[1][1].getMark() === this.cells[2][0].getMark()){
                isFinished = true;
                this.winner = this.cells[1][1].getMark();
                return isFinished;
            }
        }

        // determine whether the game is over
        for (var i=0;i<this.cells.length;i++){
            for (var j=0;j<this.cells[0].length;j++){
                if (this.cells[i][j].getMark() != ""){
                    occupiedCount += 1;
                }
            }
        }
        if (occupiedCount === this.rows*this.cols){
            isFinished = true;
            this.winner = "It is a tie";
            return isFinished;
        }

        return isFinished;
    }

    getWinner(){
        return this.winner;
    }

    handleCellClick(setMark, mark){
        if(this.isCellOccupied(mark)){
            ;
        }
        else{
            setMark(this.getTurn());
            if(this.isGameFinished()){
                this.pub("gameFinished", this.getWinner());                
                this.winBanner.classList.add("winBanner");
                if (this.getWinner() === "It is a tie" ){
                    this.winBanner.textContent = this.getWinner();
                }
                else{
                    this.winBanner.textContent = this.getWinner() + " Wins!!!";
                }
                setTimeout(this.removeWinBanner.bind(this),3000);
            }
            else{
                this.switchTurn();
                this.pub("gridClick", this.getTurn());
            }
        }
    }

    removeWinBanner(){
        this.winBanner.classList.remove("winBanner");
        this.winBanner.textContent = "";
    }

    reset(){
        for(var i=0; i < this.cells.length; i++){
            for(var j=0; j< this.cells[0].length; j++){
                this.cells[i][j].reset();
            }
        }
        this.removeWinBanner();
    }


}