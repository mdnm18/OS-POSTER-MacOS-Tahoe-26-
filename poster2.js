document.addEventListener("DOMContentLoaded", () => {
  const poster = document.querySelector(".poster");
  const cursor = document.getElementById("liquid-cursor");

  // --- Liquid Cursor Logic ---
  let mouse = { x: -100, y: -100 };
  let pos = { x: 0, y: 0 };
  const speed = 0.1; // Lower is slower

  const updatePosition = () => {
    pos.x += (mouse.x - pos.x) * speed;
    pos.y += (mouse.y - pos.y) * speed;
    cursor.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(1)`;
  };

  const loop = () => {
    updatePosition();
    requestAnimationFrame(loop);
  };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  if (poster) {
    poster.addEventListener("mouseenter", () => {
      cursor.style.opacity = "1";
      cursor.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(1.5)`;
    });
    poster.addEventListener("mouseleave", () => {
      cursor.style.opacity = "0";
      cursor.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(0)`;
    });
  }

  requestAnimationFrame(loop);

  // --- 3D Parallax Hover Effect ---
  if (poster) {
    poster.addEventListener("mousemove", (e) => {
      const { left, top, width, height } = poster.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / (width / 2);
      const y = (e.clientY - top - height / 2) / (height / 2);

      const rotateX = y * -10; // Max rotation 10 degrees
      const rotateY = x * 10; // Max rotation 10 degrees

      poster.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    poster.addEventListener("mouseleave", () => {
      poster.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });
  }

  // --- On-Scroll Fade-in Animations ---
  const animatedSections = document.querySelectorAll(".animated-section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the element is visible
    }
  );

  animatedSections.forEach((section) => {
    observer.observe(section);
  });
});
