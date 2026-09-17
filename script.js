const glow = document.querySelector(".cursor-glow");

window.addEventListener("pointermove", (e) => {
  glow?.animate(
    { left: `${e.clientX}px`, top: `${e.clientY}px` },
    { duration: 700, fill: "forwards" },
  );

  document.querySelectorAll("[data-parallax]").forEach((el) => {
    const d = Number(el.dataset.parallax);
    el.style.transform = `translate(${((e.clientX - innerWidth / 2) * d) / 45}px,${((e.clientY - innerHeight / 2) * d) / 45}px)`;
  });
});

const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    }),
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((x) => io.observe(x));

const progress = document.querySelector(".progress");

window.addEventListener("scroll", () => {
  const h = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${Math.min(100, (scrollY / h) * 100)}%`;
});

const track = document.querySelector(".project-track");
const dots = [...document.querySelectorAll(".dots b")];

if (track && dots.length) {
  const cards = [...track.children];
  const gap = 24;
  let currentIndex = 0;
  let autoSlide;

  const getCardWidth = () => {
    const firstCard = cards[0];
    if (!firstCard) return 0;
    const styles = getComputedStyle(track);
    const gapValue = Number.parseFloat(styles.gap || gap) || gap;
    return firstCard.getBoundingClientRect().width + gapValue;
  };

  const updateDots = () => {
    dots.forEach((dot, index) => {
      dot.classList.toggle("on", index === currentIndex);
    });
  };

  const goToCard = (index) => {
    const total = cards.length;
    currentIndex = (index + total) % total;

    track.scrollTo({
      left: currentIndex * getCardWidth(),
      behavior: "smooth",
    });

    updateDots();
  };

  const startAutoSlide = () => {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
      goToCard(currentIndex + 1);
    }, 20000);
  };

  document.querySelector(".next")?.addEventListener("click", () => {
    goToCard(currentIndex + 1);
    startAutoSlide();
  });

  document.querySelector(".prev")?.addEventListener("click", () => {
    goToCard(currentIndex - 1);
    startAutoSlide();
  });

  track.addEventListener("mouseenter", () => clearInterval(autoSlide));
  track.addEventListener("mouseleave", startAutoSlide);

  window.addEventListener("resize", () => {
    goToCard(currentIndex);
  });

  updateDots();
  startAutoSlide();
}

const menu = document.querySelector(".menu");

menu?.addEventListener("click", () => {
  document.querySelector(".nav nav")?.classList.toggle("open");
});

const setScroll = () =>
  document.documentElement.style.setProperty(
    "--scrollY",
    `${window.scrollY}px`,
  );

setScroll();
window.addEventListener("scroll", setScroll, { passive: true });
