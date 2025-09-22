// Simple slideshow logic with swipe/drag support
document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slideshow-img");
  const dots = document.querySelectorAll(".dot");
  const container = document.querySelector(".slideshow-container");
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
  function prevSlide() {
    showSlide((current - 1 + slides.length) % slides.length);
  }
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => showSlide(i));
  });
  let interval = setInterval(nextSlide, 5200);
  // Pause auto-advance on user interaction, then resume
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      clearInterval(interval);
      interval = setInterval(nextSlide, 3200);
    });
  });
  // Swipe/drag support
  let startX = null;
  let dragging = false;
  function onStart(e) {
    dragging = true;
    startX = e.touches ? e.touches[0].clientX : e.clientX;
  }
  function onMove(e) {
    if (!dragging) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const dx = x - startX;
    if (Math.abs(dx) > 40) {
      dragging = false;
      if (dx > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
      clearInterval(interval);
      interval = setInterval(nextSlide, 3200);
    }
  }
  function onEnd() {
    dragging = false;
  }
  if (container) {
    container.addEventListener("touchstart", onStart, { passive: true });
    container.addEventListener("touchmove", onMove, { passive: true });
    container.addEventListener("touchend", onEnd);
    container.addEventListener("mousedown", onStart);
    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseup", onEnd);
    container.addEventListener("mouseleave", onEnd);
  }
  showSlide(0);
});
