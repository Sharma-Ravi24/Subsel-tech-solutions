/*==============================================================*/
// Contact Form JS
/*==============================================================*/
(function ($) {
    "use strict"; // Start of use strict
    $("#contactForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            formError();
            submitMSG(false, "Did you fill in the form properly?");
        }
        else {
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm() {
        // Initiate Variables With Form Content
        var name = $("#name").val();
        var email = $("#email").val();
        var msg_subject = $("#msg_subject").val();
        var phone_number = $("#phone_number").val();
        var message = $("#message").val();
        var gridCheck = $("#gridCheck").val();

        $.ajax({
            type: "POST",
            url: "assets/php/form-process.php",
            data: "name=" + name + "&email=" + email + "&msg_subject=" + msg_subject + "&phone_number=" + phone_number + "&message=" + message +"&gridCheck=" + gridCheck,
            success : function(statustxt) {
                if (statustxt == "success"){
                    formSuccess();
                }
                else {
                    formError();
                    submitMSG(false,statustxt);
                }
            }
        });
    }
    function formSuccess(){
        $("#contactForm")[0].reset();
        submitMSG(true, "Message Submitted!")
    }
    function formError(){
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();
        });
    }
    function submitMSG(valid, msg){
        if(valid){
            var msgClasses = "h4 tada animated text-success";
        }
        else {
            var msgClasses = "h4 text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }

}(jQuery)); // End of use strict

function toggleContent(sectionId) {
    var dots = document.getElementById("dots-" + sectionId);
    var moreText = document.getElementById("more-" + sectionId);
    var btnText = document.getElementById("btn-" + sectionId);
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      moreText.style.display = "inline";
    }
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".read-btn");
  
    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        const moreText = this.previousElementSibling.querySelector(".more-text");
  
        if (moreText.style.display === "none" || moreText.style.display === "") {
          moreText.style.display = "inline";
          this.textContent = "Read Less";
        } else {
          moreText.style.display = "none";
          this.textContent = "Read More";
        }
      });
    });
  });
  