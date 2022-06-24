window.onload = function(){
    var el = document.querySelectorAll('h1');
    console.log(el);
    // for(var i=0;i<el.length;i++){
    //      el[i].style.color = 'white';
    // }
}

window.addEventListener('click', function(e){
    var l = document.querySelector('h1');
    // l.textContent="About";
    // console.log(e.clientX);
    // console.log(e.clientY);
    // e.clientX;
    // e.clientY;
    // var body = document.body;
    // body.innerHTML="";
})

var user = {
    name : "Bob",
    greet : function(){
        window.prompt("hi");
    }
}

// setInterval(user.greet, 1000);