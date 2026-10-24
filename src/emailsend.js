$(document).ready(function () {
    emailjs.init("BZ6C-eVvASh9oUOyt");

    const SERVICE_ID = "service_5uenqyf";
    const ADMIN_TEMPLATE = "template_f6vikvu";
    const REPLY_TEMPLATE = "";   // paste your auto-reply template ID here (see below)

    const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

    const toast = (icon, title) =>
        Swal.fire({ toast: true, position: "top-start", icon, title, showConfirmButton: false, timer: 3000 });

    $("#sendMessage").on("click", function (event) {
        event.preventDefault();

        const params = {
            user_name: $("#name").val().trim(),
            user_phone: $("#phone").val().trim(),
            user_email: $("#email").val().trim(),
            subject: $("#subject").val().trim(),
            message: $("#message").val().trim(),
        };

        if (!params.user_name || !params.user_email || !params.message) {
            return toast("warning", "Please fill in all required fields!");
        }
        if (!isEmail(params.user_email)) {
            return toast("error", "Enter a valid email like name@example.com");
        }

        const $btn = $(this).prop("disabled", true);

        Swal.fire({
            title: "Sending...",
            text: "Please wait while we send your message.",
            icon: "info",
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => Swal.showLoading(),
        });

        // 1) Message to you (admin)
        emailjs.send(SERVICE_ID, ADMIN_TEMPLATE, params)
            .then(function (response) {
                console.log("Admin email sent", response);

                Swal.fire({
                    icon: "success",
                    title: "Message Sent Successfully!",
                    text: "I will get back to you soon.",
                });
                $("#name, #phone, #email, #subject, #message").val("");

                // 2) Thank-you to the visitor (runs in the background, optional)
                if (REPLY_TEMPLATE) {
                    emailjs.send(SERVICE_ID, REPLY_TEMPLATE, params)
                        .then((r) => console.log("Thank-you email sent", r))
                        .catch((e) => console.log("Thank-you email failed", e));
                }
            })
            .catch(function (error) {
                console.log("FAILED...", error);
                Swal.fire({
                    icon: "error",
                    title: "Failed!",
                    text: (error && error.text) || "Failed to send your message.",
                });
            })
            .finally(() => $btn.prop("disabled", false));
    });
});