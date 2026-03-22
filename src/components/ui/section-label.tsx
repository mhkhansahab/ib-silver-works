"use client";

import { useEffect, useState } from "react";

export function SectionLabel() {
  const [current, setCurrent] = useState("The Weight of Value");

  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const name = entry.target.getAttribute("data-section");
            if (name) setCurrent(name);
          }
        }
      },
      { threshold: 0.3 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="section-label hidden md:block" aria-hidden="true">
      {current}
    </div>
  );
}
