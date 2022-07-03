
let background = document.querySelector(".content-background")

function changeBackground(backgroundImg, flag){
    let el = document.querySelector(flag);
    let sec = "0.7s";
    el.addEventListener("mouseover", addHoverBackground);
    el.addEventListener("mouseout", addOutBackground);

    function addHoverBackground(){
        background.style.background = "url('" + backgroundImg + "') no-repeat center";
        background.style.backgroundSize = "cover";
        background.style.transition = sec;
    }

    function addOutBackground(){
        background.style.background = "url('../images/deep-ocean.jpg') no-repeat center";
        background.style.backgroundSize = "cover";
        background.style.transition = sec;
    }
}

let img_about = "./../images/home/about.jpg";
let flag_about = ".about-hover";
changeBackground(img_about, flag_about)

let img_projects = "./../images/home/projects.jpg";
let flag_projects = ".projects-hover";
changeBackground(img_projects, flag_projects)

let img_activities = "./../images/home/activities.jpg";
let flag_activities = ".activities-hover";
changeBackground(img_activities, flag_activities)

let img_hobbies = "./../images/home/hobbies.jpg";
let flag_hobbies = ".hobbies-hover";
changeBackground(img_hobbies, flag_hobbies)

let img_contact = "./../images/home/contact.jpg";
let flag_contact = ".contact-hover";
changeBackground(img_contact, flag_contact)
