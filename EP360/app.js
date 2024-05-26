document.addEventListener("DOMContentLoaded", function () {
  // Home Section Swiper
  var homeSwiper = new Swiper(".home-slider", {
    loop: true,
    grabCursor: true,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // Review Section Swiper
  var reviewSwiper = new Swiper(".review-slider", {
    loop: true,
    grabCursor: true,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // Menu Bars Toggle
  let menu = document.querySelector("#menu-bars");
  let navbar = document.querySelector(".navbar");

  menu.onclick = () => {
    menu.classList.toggle("fa-times");
    navbar.classList.toggle("active");
  };

  window.onscroll = () => {
    menu.classList.remove("fa-times");
    navbar.classList.remove("active");
  };
});
document.addEventListener("DOMContentLoaded", function () {
  var swiper = new Swiper(".home-slider", {
    slidesPerView: "auto",
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});
