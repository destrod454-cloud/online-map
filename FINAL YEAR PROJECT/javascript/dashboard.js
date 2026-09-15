document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       PROFILE DROPDOWN
    ========================= */

    const profileToggle = document.getElementById("profileToggle");
    const profileWrapper = document.querySelector(".profile-wrapper");
    const profileOptions = document.querySelectorAll(".profile-option");

    if (profileToggle && profileWrapper) {

        profileToggle.addEventListener("click", (e) => {
            e.stopPropagation();

            profileWrapper.classList.toggle("open");
        });

        document.addEventListener("click", (e) => {

            if (!profileWrapper.contains(e.target)) {
                profileWrapper.classList.remove("open");
            }

        });
    }


    /* =========================
       DEMO PROFILE SWITCHING
    ========================= */

    const profileName = document.getElementById("profileName");
    const profileRole = document.getElementById("profileRole");
    const sidebarRole = document.getElementById("sidebarRole");

    profileOptions.forEach(option => {

        option.addEventListener("click", () => {

            const role = option.dataset.role;

            if (profileRole) {
                profileRole.textContent = role;
            }

            if (sidebarRole) {
                sidebarRole.textContent = role;
            }

            if (profileName) {

                if (role === "Student") {
                    profileName.textContent = "Student";
                }

                else if (role === "Visitor") {
                    profileName.textContent = "Visitor";
                }

                else if (role === "Admin") {
                    profileName.textContent = "Admin";
                }

            }

            profileWrapper.classList.remove("open");

        });

    });


    /* =========================
       WELCOME POPUP
    ========================= */

    const welcomePopup = document.getElementById("welcomePopup");
    const closeWelcome = document.getElementById("closeWelcome");

    if (closeWelcome && welcomePopup) {

        closeWelcome.addEventListener("click", () => {
            welcomePopup.classList.remove("show");
        });

    }


    /* =================================================
       RATING BAR SCROLL ANIMATION
    ================================================= */

    const ratingsCard = document.querySelector(".ratings-card");
    const ratingBars = document.querySelectorAll(".rating-bar > div");

    if (ratingsCard && ratingBars.length) {

        let ratingsAnimated = false;

        const animateRatings = () => {

            if (ratingsAnimated) return;

            ratingsAnimated = true;

            ratingBars.forEach((bar, index) => {

                /*
                    Get the percentage from the
                    inline style in the HTML.

                    Example:
                    style="width: 78%;"
                */

                const targetWidth = bar.style.width;

                // Reset first
                bar.style.width = "0";

                // Small delay between each bar
                setTimeout(() => {

                    bar.style.width = targetWidth;

                }, index * 120);

            });

        };


        const ratingsObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animateRatings();

                        ratingsObserver.unobserve(ratingsCard);

                    }

                });

            },
            {
                threshold: 0.25
            }
        );


        ratingsObserver.observe(ratingsCard);

    }

});