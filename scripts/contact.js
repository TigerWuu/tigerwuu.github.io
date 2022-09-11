let gogo = document.querySelector(".gogo");

function sendEmail() {
    let mailTo = document.querySelector(".mailTo")
    let inputForm = document.querySelector(".contactForm");

    let name = inputForm.querySelector("#InputName").value;
    // let email = inputForm.querySelector("#InputEmail").value;
    let content = inputForm.querySelector("#Textarea").value;

    let to = "tiger871108@gmail.com";
    let subject = "Information from tiger-web";
    let body = "Hi, I am "+ name +" : " + "%0A" + content;

    mailTo.href="mailto:"+to+"?subject="+subject+"&body="+body;
    mailTo.click();

    /*
    Email.send({
      Host: "smtp.gmail.com",
      Username: email,
      Password: pw,
      To: 'tiger871108@gmail.com',
      From: email,
      Subject: "Sending Email using javascript",
      Body: "Hi, I am "+ name +" : " + content,
    })
    .then(function (message) {
      alert("mail sent successfully")
    });
    */
}

gogo.addEventListener("click", sendEmail);

