import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const sections = document.querySelectorAll("[data-scroll-section]");
    const items = document.querySelectorAll("[data-scroll-item]");

    if (!("IntersectionObserver" in window)) {
      sections.forEach((section) =>
        section.classList.add("section-visible")
      );

      items.forEach((item) =>
        item.classList.add("item-visible")
      );

      return;
    }

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-visible");
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("item-visible");
            itemObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    sections.forEach((section) => sectionObserver.observe(section));
    items.forEach((item) => itemObserver.observe(item));

    return () => {
      sectionObserver.disconnect();
      itemObserver.disconnect();
    };
  }, []);

  return null;
}