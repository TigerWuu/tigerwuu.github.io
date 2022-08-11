// let gogo = document.querySelector(".gogo");

function sendEmail() {
    let inputForm = document.querySelector(".contactForm");

    let name = inputForm.querySelector("#InputName").value;
    console.log(name);
    let email = inputForm.querySelector("#InputEmail").value;
    console.log(email);
    let pw= inputForm.querySelector("#InputPW").value;
    console.log(pw);
    let content = inputForm.querySelector("#Textarea").value;
    console.log(content);

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
}

// gogo.addEventListener("click", sendEmail);

