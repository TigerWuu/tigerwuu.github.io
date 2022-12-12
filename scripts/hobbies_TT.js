
function scrollView(flag, A1, A2){
    let el = document.querySelectorAll(flag);
    let trigger = window.innerHeight;
    el.forEach(addEvent);

    function addEvent(event){

        window.addEventListener("scroll", addAnimation);
        function addAnimation(){
            let topPoint = event.getBoundingClientRect().top;
            if (topPoint < trigger){
                event.classList.add(A1);
                event.classList.add(A2);
            }
            else{
                event.classList.remove(A1);
                event.classList.remove(A2);
            }
        }
    }
}

let flagScroll = ".card-deck";
scrollView(flagScroll, "animate__fadeInRight","animate__animated");

let flagScrollText = "h3"
scrollView(flagScrollText, "animate__fadeIn","animate__animated");