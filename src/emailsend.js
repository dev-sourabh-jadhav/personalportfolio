$(document).ready(function () {

    // ✅ Initialize with your NEW Public Key
    emailjs.init("BZ6C-eVvASh9oUOyt");

    $("#sendMessage").on("click", function (event) {
        event.preventDefault();

        let name = $("#name").val().trim();
        let phone = $("#phone").val().trim();
        let email = $("#email").val().trim();
        let subject = $("#subject").val().trim();
        let message = $("#message").val().trim();

        // ✅ Validation
        if (name === "" || email === "" || message === "") {
            Swal.fire({
                toast: true,
                position: "top-start",
                icon: "warning",
                title: "Please fill in all required fields!",
                showConfirmButton: false,
                timer: 3000,
            });
            return;
        }

        // ✅ Loading alert
        Swal.fire({
            title: "Sending...",
            text: "Please wait while we send your message.",
            icon: "info",
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        let templateParams = {
            user_name: name,
            user_phone: phone,
            user_email: email,
            subject: subject,
            message: message,
        };

        // ✅ Send email to ADMIN
        emailjs.send("service_5uenqyf", "template_f6vikvu", templateParams)
            .then(function (response) {
                console.log("Admin Email Sent", response);

                // ✅ Send Thank You email
                sendThankYouEmail(templateParams);
            })
            .catch(function (error) {
                Swal.fire({
                    icon: "error",
                    title: "Failed!",
                    text: "Failed to send your message.",
                });

                console.log("FAILED...", error);
            });
    });

    // ✅ Thank You Email Function
    function sendThankYouEmail(params) {

        emailjs.send("service_5uenqyf", "template_f6vikvu", params)
            .then(function (response) {

                Swal.fire({
                    icon: "success",
                    title: "Message Sent Successfully!",
                    text: "We will get back to you soon.",
                });

                console.log("Thank You Email Sent", response);

                // ✅ Clear form
                $("#name, #phone, #email, #subject, #message").val("");
            })
            .catch(function (error) {
                console.log("Thank You Email Failed", error);
            });
    }

});