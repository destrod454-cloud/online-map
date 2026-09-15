document.addEventListener("DOMContentLoaded", () => {

    const preloader = document.getElementById("preloader");
    const visitorButton = document.getElementById("visitorLogin");
    const studentButton = document.getElementById("studentLogin");
    const studentForm = document.getElementById("studentForm");


    /* =========================
       INITIAL PAGE PRELOADER
    ========================= */

    window.addEventListener("load", () => {

        if (preloader) {

            // Hide immediately when the page is ready
            preloader.classList.add("hide");

            // Remove from the page after the fade animation
            setTimeout(() => {
                preloader.style.display = "none";
            }, 200);

        }

    });


    /* =========================
       VISITOR LOGIN
    ========================= */

    if (visitorButton) {

        visitorButton.addEventListener("click", () => {

            localStorage.setItem("userName", "Visitor");
            localStorage.setItem("userRole", "Visitor");

            showButtonLoader(
                visitorButton,
                "Opening Campus Map..."
            );

            setTimeout(() => {

                window.location.href = "dashboard.html";

            }, 1800);

        });

    }


    /* =========================
       STUDENT LOGIN
    ========================= */

    if (studentForm) {

        studentForm.addEventListener("submit", (event) => {

            event.preventDefault();


            const studentID =
                document.getElementById("student-id").value.trim();

            const password =
                document.getElementById("password").value.trim();


            /* =========================
               VALIDATION
            ========================= */

            if (studentID === "") {

                showInputError(
                    document.getElementById("student-id"),
                    "Please enter your Student ID."
                );

                return;
            }


            if (password === "") {

                showInputError(
                    document.getElementById("password"),
                    "Please enter your password."
                );

                return;
            }


            /* =========================
               SAVE LOGIN INFORMATION
            ========================= */

            localStorage.setItem("userName", studentID);
            localStorage.setItem("userRole", "Student");


            /* =========================
               LOGIN ANIMATION
            ========================= */

            showButtonLoader(
                studentButton,
                "Signing you in..."
            );


            setTimeout(() => {

                window.location.href = "dashboard.html";

            }, 2000);

        });

    }


    /* =========================
       INPUT FOCUS ANIMATION
    ========================= */

    const inputs =
        document.querySelectorAll(".input-group input");


    inputs.forEach(input => {

        input.addEventListener("focus", () => {

            input.parentElement.classList.add(
                "input-focused"
            );

        });


        input.addEventListener("blur", () => {

            input.parentElement.classList.remove(
                "input-focused"
            );

        });

    });


    /* =========================
       REMOVE ERROR WHEN TYPING
    ========================= */

    inputs.forEach(input => {

        input.addEventListener("input", () => {

            input.classList.remove("input-error");


            const error =
                input.parentElement.querySelector(
                    ".error-message"
                );


            if (error) {
                error.remove();
            }

        });

    });


    /* =========================
       BUTTON LOADER
    ========================= */

    function showButtonLoader(button, message) {

        button.disabled = true;

        button.classList.add("loading");

        button.innerHTML =
            '<span class="small-spinner"></span>' +
            '<span>' + message + '</span>';

    }


    /* =========================
       INPUT ERROR
    ========================= */

    function showInputError(input, message) {

        input.classList.add("input-error");

        input.focus();


        const existingError =
            input.parentElement.querySelector(
                ".error-message"
            );


        if (existingError) {
            existingError.remove();
        }


        const error =
            document.createElement("small");


        error.className = "error-message";

        error.textContent = message;


        input.parentElement.appendChild(error);


        /* Shake animation */

        input.parentElement.classList.add("shake");


        setTimeout(() => {

            input.parentElement.classList.remove(
                "shake"
            );

        }, 400);

    }


    /* =========================
       FORGOT PASSWORD
    ========================= */

    const forgotPassword =
        document.querySelector(".forgot-password");


    if (forgotPassword) {

        forgotPassword.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                alert(
                    "Password recovery will be available here."
                );

            }
        );

    }


    /* =========================
       SIGN UP
    ========================= */

    const signupLink =
        document.querySelector(".signup-link");


    if (signupLink) {

        signupLink.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                window.location.href =
                    "signup.html";

            }
        );

    }

});