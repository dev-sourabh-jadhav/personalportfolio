$(document).ready(function () {
    emailjs.init("lkshqwzAqIBEhFqq6"); // Replace with your Public Key

    $("#sendMessage").on("click", function (event) {
        event.preventDefault(); // Prevent page reload

        let name = $("#name").val().trim();
        let phone = $("#phone").val().trim();
        let email = $("#email").val().trim();
        let subject = $("#subject").val().trim();
        let message = $("#message").val().trim();

        // Basic validation
        if (name === "" || email === "" || message === "") {
            Swal.fire({
                toast: true,
                position: "top-start",
                icon: "warning",
                title: "Please fill in all required fields!",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
            });
            return;
        }

        // Show "Sending..." alert
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

        // Send email to admin
        $.ajax({
            url: "https://api.emailjs.com/api/v1.0/email/send",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                service_id: "service_bhqskev",
                template_id: "template_f6vikvu",
                user_id: "lkshqwzAqIBEhFqq6",
                template_params: templateParams,
            }),
            success: function (response) {
                console.log("Admin Email Sent", response);

                // Now send a "Thank You" email to the user
                sendThankYouEmail(email, name, phone, subject, message);
            },
            error: function (error) {
                Swal.fire({
                    toast: true,
                    position: "top-end",
                    icon: "error",
                    title: "Failed to send your message. Please try again.",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                });

                console.log("FAILED...", error);
            },
        });
    });

    // Function to send a Thank You email
    function sendThankYouEmail(email, name, phone, subject, message) {
        let thankYouParams = {
            user_name: name,
            user_phone: phone,
            user_email: email,
            subject: subject,
            message: message,
        };

        $.ajax({
            url: "https://api.emailjs.com/api/v1.0/email/send",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                service_id: "service_bhqskev",
                template_id: "template_f6vikvu",
                user_id: "lkshqwzAqIBEhFqq6",
                template_params: thankYouParams,
            }),
            success: function (response) {
                Swal.fire({
                    icon: "success",
                    title: "Message Sent Successfully!",
                    text: "We will get back to you soon.",
                    showConfirmButton: true,
                });

                console.log("Thank You Email Sent", response);

                // Clear form fields
                $("#name, #phone, #email, #subject, #message").val("");
            },
            error: function (error) {
                console.log("Failed to send Thank You email", error);
            },
        });
    }
});
