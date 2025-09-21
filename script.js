// Simple slideshow logic
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slideshow-img");
  const dots = document.querySelectorAll(".dot");
  let current = 0;
  function showSlide(idx) {
    slides.forEach((img, i) => {
      img.classList.toggle("active", i === idx);
      dots[i].classList.toggle("active", i === idx);
    });
    current = idx;
  }
  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => showSlide(i));
  });
  let interval = setInterval(nextSlide, 3200);
  // Pause auto-advance on user interaction, then resume
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      clearInterval(interval);
      interval = setInterval(nextSlide, 3200);
    });
  });
  showSlide(0);
});
