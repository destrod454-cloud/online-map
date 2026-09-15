document.addEventListener("DOMContentLoaded", () => {

    const emailStep = document.getElementById("emailStep");
    const verificationStep = document.getElementById("verificationStep");
    const passwordStep = document.getElementById("passwordStep");
    const successStep = document.getElementById("successStep");

    const emailForm = document.getElementById("emailForm");
    const verificationForm = document.getElementById("verificationForm");
    const passwordForm = document.getElementById("passwordForm");

    const emailInput = document.getElementById("email");
    const emailDisplay = document.getElementById("emailDisplay");
    const verificationCode = document.getElementById("verificationCode");

    const resendCode = document.getElementById("resendCode");
    const changeEmail = document.getElementById("changeEmail");

    const newPassword = document.getElementById("newPassword");
    const confirmPassword = document.getElementById("confirmPassword");

    const toggleNewPassword = document.getElementById("toggleNewPassword");
    const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");


    /* =========================
       SHOW ONLY ONE STEP
    ========================= */

    function showStep(step) {

        emailStep.classList.remove("active");
        verificationStep.classList.remove("active");
        passwordStep.classList.remove("active");
        successStep.classList.remove("active");

        step.classList.add("active");
    }


    /* =========================
       CREATE VERIFICATION CODE
    ========================= */

    function generateCode() {

        return Math.floor(
            100000 + Math.random() * 900000
        ).toString();

    }


    /* =========================
       SEND VERIFICATION CODE
    ========================= */

    emailForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const email = emailInput.value.trim();

        if (!email) {
            alert("Please enter your email address.");
            return;
        }


        if (!emailInput.checkValidity()) {
            alert("Please enter a valid email address.");
            return;
        }


        const code = generateCode();

        localStorage.setItem("resetEmail", email);
        localStorage.setItem("resetCode", code);

        emailDisplay.textContent = email;


        /*
            DEMO ONLY

            In the real system, this code would be
            sent to the user's email through a backend.
        */

        alert(
            "Verification code sent!\n\n" +
            "Demo verification code: " + code
        );


        showStep(verificationStep);

        verificationCode.focus();

    });


    /* =========================
       VERIFY CODE
    ========================= */

    verificationForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const enteredCode =
            verificationCode.value.trim();

        const savedCode =
            localStorage.getItem("resetCode");


        if (!enteredCode) {

            alert("Please enter the verification code.");

            return;
        }


        if (enteredCode.length !== 6) {

            alert("Verification code must contain 6 digits.");

            return;
        }


        if (enteredCode !== savedCode) {

            alert("Incorrect verification code. Please try again.");

            return;
        }


        localStorage.setItem(
            "resetVerified",
            "true"
        );


        showStep(passwordStep);

        newPassword.focus();

    });


    /* =========================
       RESEND CODE
    ========================= */

    resendCode.addEventListener("click", () => {

        const email =
            localStorage.getItem("resetEmail");


        if (!email) {

            showStep(emailStep);

            return;
        }


        const newCode = generateCode();

        localStorage.setItem(
            "resetCode",
            newCode
        );


        alert(
            "A new verification code has been sent!\n\n" +
            "Demo verification code: " + newCode
        );

    });


    /* =========================
       CHANGE EMAIL
    ========================= */

    changeEmail.addEventListener("click", () => {

        verificationCode.value = "";

        localStorage.removeItem("resetCode");

        showStep(emailStep);

        emailInput.focus();

    });


    /* =========================
       RESET PASSWORD
    ========================= */

    passwordForm.addEventListener("submit", (e) => {

        e.preventDefault();

        const password =
            newPassword.value;

        const confirm =
            confirmPassword.value;


        if (password.length < 6) {

            alert(
                "Password must be at least 6 characters long."
            );

            return;
        }


        if (password !== confirm) {

            alert(
                "Passwords do not match."
            );

            return;
        }


        const email =
            localStorage.getItem("resetEmail");


        /*
            Save the new password.

            This supports the simple localStorage
            demo version of the project.
        */

        const users =
            JSON.parse(
                localStorage.getItem("coouUsers")
            ) || [];


        const userIndex =
            users.findIndex(
                user =>
                    user.email &&
                    user.email.toLowerCase() ===
                    email.toLowerCase()
            );


        if (userIndex !== -1) {

            users[userIndex].password = password;

            localStorage.setItem(
                "coouUsers",
                JSON.stringify(users)
            );

        }


        /*
            Also save the reset password separately
            so the demo can still remember it even
            if the signup structure is different.
        */

        localStorage.setItem(
            "resetPassword",
            password
        );


        localStorage.removeItem("resetCode");
        localStorage.removeItem("resetVerified");


        showStep(successStep);

    });


    /* =========================
       PASSWORD VISIBILITY
    ========================= */

    toggleNewPassword.addEventListener("click", () => {

        if (newPassword.type === "password") {

            newPassword.type = "text";

            toggleNewPassword.innerHTML =
                '<i class="fa-solid fa-eye-slash"></i>';

        } else {

            newPassword.type = "password";

            toggleNewPassword.innerHTML =
                '<i class="fa-solid fa-eye"></i>';

        }

    });


    toggleConfirmPassword.addEventListener("click", () => {

        if (confirmPassword.type === "password") {

            confirmPassword.type = "text";

            toggleConfirmPassword.innerHTML =
                '<i class="fa-solid fa-eye-slash"></i>';

        } else {

            confirmPassword.type = "password";

            toggleConfirmPassword.innerHTML =
                '<i class="fa-solid fa-eye"></i>';

        }

    });


    /* =========================
       ONLY ALLOW NUMBERS
       IN VERIFICATION CODE
    ========================= */

    verificationCode.addEventListener("input", () => {

        verificationCode.value =
            verificationCode.value
                .replace(/\D/g, "")
                .slice(0, 6);

    });

});