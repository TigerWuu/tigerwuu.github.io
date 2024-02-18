
function imgToGif(img, gif, flag){
    let el = document.querySelector(flag);
    el.addEventListener("mouseover", addHoverGif);
    el.addEventListener("mouseout", addOutImg);

    function addHoverGif(){
        el.setAttribute("src", gif);
    }

    function addOutImg(){
        el.setAttribute("src", img);
    }
}

let img_FM = "./../images/projects/FM.jpg";
let gif_FM = "./../images/projects/Animation1.gif";
let flag_FM = ".FM-hover";
imgToGif(img_FM, gif_FM, flag_FM);

let img_HT = "./../images/projects/HT.jpg";
let gif_HT = "./../images/projects/OPEN.gif";
let flag_HT = ".HT-hover";
imgToGif(img_HT, gif_HT, flag_HT);

let img_ACS = "./../images/projects/ACS.jpg";
let gif_ACS = "./../images/projects/ACS_tracking.gif";
let flag_ACS = ".ACS-hover";
imgToGif(img_ACS, gif_ACS, flag_ACS);

let img_UAV = "./../images/projects/UAV1.png";
let gif_UAV = "./../images/projects/UAV4.png";
let flag_UAV = ".UAV-hover";
imgToGif(img_UAV, gif_UAV, flag_UAV);