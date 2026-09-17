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
    }, 3000);
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

const menuBtn = document.querySelector(".menu");
const navMenu = document.querySelector(".nav nav");

menuBtn?.addEventListener("click", () => {
  const open = navMenu?.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(Boolean(open)));
});

document.querySelectorAll(".nav nav a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu?.classList.remove("open");
    menuBtn?.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    navMenu?.classList.remove("open");
    menuBtn?.setAttribute("aria-expanded", "false");
  }
});

const contactForm = document.querySelector(".contact-form");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const nome =
    document.querySelector("#nome")?.value?.trim() || "Não informado";
  const email =
    document.querySelector("#email")?.value?.trim() || "Não informado";
  const assunto =
    document.querySelector("#assunto")?.value?.trim() || "Mensagem do site";
  const mensagem = document.querySelector("#mensagem")?.value?.trim() || "";

  const subject = encodeURIComponent(`Contato - ${assunto}`);
  const body = encodeURIComponent(
    `Nome: ${nome}\nE-mail: ${email}\nAssunto: ${assunto}\n\nMensagem:\n${mensagem}`,
  );

  window.location.href = `mailto:contato@tecnologiaefe.org?subject=${subject}&body=${body}`;
});

const setScroll = () =>
  document.documentElement.style.setProperty(
    "--scrollY",
    `${window.scrollY}px`,
  );

setScroll();
window.addEventListener("scroll", setScroll, { passive: true });
