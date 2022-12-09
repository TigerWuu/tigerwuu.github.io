
function hoverView(flag){
    let el = document.querySelectorAll(flag);
    el.forEach(addEvent);

    function addEvent(event){
        event.addEventListener("mouseover", addClass);
        event.addEventListener("mouseout", removeClass);
        function addClass(){
            event.classList.add("animate__bounce");
            event.classList.add("animate__animated");
        }

        function removeClass(){
            event.classList.remove("animate__bounce");
            event.classList.remove("animate__animated");
        }
    }
}

let flagView = ".outer-button";
hoverView(flagView);