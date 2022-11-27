import Component from "./component.js";

import "./reset.css";

export default class Reset extends Component{
    constructor(root){
        super(root);
        var button = root.querySelector("button");
        button.addEventListener("click", this.handleButtonClick.bind(this));
        
    }

    static getRoot(){
        return ".reset";
    }

    handleButtonClick(){
        this.pub("resetClick");
    }
}