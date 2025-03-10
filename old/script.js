document.addEventListener("DOMContentLoaded", function () {
    const header = document.querySelector("header");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
        if (window.scrollY > lastScrollY) {
            header.style.transform = "translateY(-100%)";
        } else {
            header.style.transform = "translateY(0)";
        }
        lastScrollY = window.scrollY;
    });

    const footerTab = document.querySelector(".footer-tab");
    footerTab.addEventListener("click", () => {
        window.location.href = "#contact";
    });
});
