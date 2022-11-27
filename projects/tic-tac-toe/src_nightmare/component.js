
export default class Component{
    constructor(root){
        this.root = root;
        this.handlers = {};
    }

    reg(event, handler){
        this.handlers[event] = handler; // handler is a function
    }

    pub(event, ...args){
        // console.log(typeof(this.handlers[event]));
        this.handlers[event](...args);
    }
}
