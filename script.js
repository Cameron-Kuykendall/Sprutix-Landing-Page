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

  // Support form submit handler (adds client-side validation and confirmation)
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("support-form");
    if (!form) return;
    const status = document.getElementById("form-status");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const account = form.account ? form.account.value.trim() : "";

      if (!name || !email || !message) {
        if (status) {
          status.style.color = "crimson";
          status.textContent = "Please complete the required fields.";
        }
        return;
      }

      if (form.action && form.action.startsWith("mailto:")) {
        const to = form.action;
        const subject = encodeURIComponent(`Support request from ${name}${account ? ' (Acct: ' + account + ')' : ''}`);
        const bodyLines = [
          `Name: ${name}`,
          `Contact email: ${email}`,
          account ? `Account: ${account}` : null,
          "",
          "Message:",
          `${message}`,
        ].filter(Boolean);
        const body = encodeURIComponent(bodyLines.join('\n'));
        const mailto = `${to}?subject=${subject}&body=${body}`;
        window.location.href = mailto;
        if (status) {
          status.style.color = "#0f9d07";
          status.textContent = "Opening your email client to send the message...";
        }
        return;
      }

      if (status) {
        status.style.color = "#0f9d07";
        status.textContent = "Sending…";
      }

      // Simulate send for non-mailto actions
      setTimeout(function () {
        if (status) {
          status.style.color = "#0f9d07";
          status.textContent = "Thanks — your message was received. We'll reply soon.";
        }
        form.reset();
      }, 700);
    });
  });
