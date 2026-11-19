import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const media = gsap.matchMedia();
const motionQuery = "(prefers-reduced-motion: no-preference)";

media.add(motionQuery, () => {
  const entrances = new Map<Element, gsap.core.Timeline>();
  const hero = document.querySelector<HTMLElement>(".hero");

  if (hero && hero.getBoundingClientRect().bottom > 0 && !hero.contains(document.activeElement)) {
    const title = gsap.timeline({ defaults: { ease: "power3.out" } });
    title.fromTo(
      "[data-hero-line]",
      { yPercent: 110, rotation: 4 },
      { yPercent: 0, rotation: 0, duration: 0.85, stagger: 0.12, clearProps: "transform" },
    ).fromTo(
      "[data-hero-copy]",
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, stagger: 0.09, clearProps: "transform,opacity" },
      0.35,
    );
    entrances.set(hero, title);
  }

  const station = document.querySelector<HTMLElement>(".workstation");
  if (station) {
    const layers = station.querySelectorAll("[data-assemble]");
    const screen = station.querySelector(".terminal-screen");
    const code = station.querySelectorAll(".terminal-code path");
    const meter = station.querySelector(".boot-meter");
    const cursor = station.querySelector(".terminal-cursor");
    const steam = station.querySelector(".coffee-steam");
    const boot = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.out", immediateRender: false },
    });
    boot.set(layers, { opacity: 0 }, 0).fromTo(layers,
      { y: (index) => index % 2 ? -26 : 30, opacity: 0, scale: 0.94, transformOrigin: "50% 50%" },
      { y: 0, opacity: 1, scale: 1, duration: 1.05, stagger: 0.14, ease: "back.out(1.3)" },
    ).set(screen, { scaleY: 0.015, opacity: 0.4, transformOrigin: "50% 50%" }, 0)
      .set(code, { scaleX: 0, transformOrigin: "0% 50%" }, 0)
      .set(meter, { scaleX: 0, transformOrigin: "0% 50%" }, 0)
      .to(meter, { scaleX: 1, duration: 0.75, ease: "steps(8)" }, 1.4)
      .to(screen, { scaleY: 1, opacity: 1, duration: 0.32, ease: "steps(8)" }, 2.2)
      .to(code, { scaleX: 1, duration: 0.2, stagger: 0.12, ease: "steps(6)" }, 2.6)
      .fromTo(cursor, { opacity: 1 }, { opacity: 0, duration: 0.35, repeat: 3, yoyo: true, ease: "steps(1)" }, 3.2)
      .fromTo(steam, { y: 0, opacity: 1 }, { y: -6, opacity: 0.3, duration: 0.8, repeat: 3, yoyo: true, ease: "sine.inOut" }, 1)
      .set([layers, screen, code, meter, cursor, steam], { clearProps: "transform,opacity,transformOrigin" });
    ScrollTrigger.create({ trigger: station, start: "top 90%", once: true, onEnter: () => boot.play() });
    entrances.set(station, boot);
  }

  document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
    // Restored scroll positions should not replay content already passed.
    if (element.getBoundingClientRect().bottom <= 0) return;
    const timeline = gsap.timeline({
      paused: true,
      defaults: { duration: 0.7, ease: "power3.out", immediateRender: false },
    });
    const siblings = element.parentElement?.children;
    const index = siblings ? Array.prototype.indexOf.call(siblings, element) : 0;

    if (element.matches(".window, .contact-banner")) {
      timeline.fromTo(element,
        { clipPath: "inset(0% 0% 100% 0%)", y: 18 },
        { clipPath: "inset(0% 0% 0% 0%)", y: 0, duration: 0.85 },
      );
    } else if (element.matches(".post-card, .capability")) {
      timeline.fromTo(element,
        { y: 38, rotation: index % 2 ? 2 : -2, opacity: 0 },
        { y: 0, rotation: 0, opacity: 1, delay: Math.min(index, 2) * 0.09 },
      );
    } else {
      timeline.fromTo(element, { y: 24, opacity: 0 }, { y: 0, opacity: 1 });
      const heading = element.querySelector("h1, h2");
      if (heading) {
        timeline.fromTo(heading,
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, clearProps: "clipPath" },
          0.1,
        );
      }
    }
    timeline.set(element, { clearProps: "transform,opacity,clipPath" });
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 92%",
      once: true,
      onEnter: () => {
        if (element.contains(document.activeElement)) timeline.progress(1).pause();
        else timeline.play();
      },
    });
    entrances.set(element, timeline);
    // Completing a pending entrance also prevents a later scroll from hiding it.
    timeline.eventCallback("onComplete", () => trigger.kill());
  });

  const bars = document.querySelectorAll(".equalizer i");
  if (bars.length) {
    gsap.fromTo(bars, { scaleY: 0.3, transformOrigin: "50% 100%" }, {
      scaleY: 1, duration: 0.22, stagger: 0.07, repeat: 5, yoyo: true,
      ease: "steps(3)", immediateRender: false, clearProps: "transform,transformOrigin",
      scrollTrigger: { trigger: ".status-strip", start: "top 92%", once: true },
    });
  }

  document.querySelectorAll<HTMLElement>("[data-scroll-art]").forEach((art) => {
    gsap.fromTo(art, { y: 18 }, {
      y: -18,
      ease: "none",
      immediateRender: false,
      scrollTrigger: {
        trigger: art.closest(".project-visual"),
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    });
  });

  const onFocus = (event: FocusEvent) => {
    const target = event.target;
    if (!(target instanceof Node)) return;
    entrances.forEach((timeline, element) => {
      if (element.contains(target)) timeline.progress(1).pause();
    });
  };
  document.addEventListener("focusin", onFocus);
  return () => document.removeEventListener("focusin", onFocus);
});

// No pointer-following motion on touch screens or narrow layouts.
media.add(`${motionQuery} and (hover: hover) and (pointer: fine) and (min-width: 900px)`, () => {
  const cleanups: (() => void)[] = [];
  const clamp = gsap.utils.clamp(-1, 1);

  function followPointer(element: HTMLElement, update: (x: number, y: number) => void) {
    let bounds: DOMRect | undefined;
    const enter = () => { bounds = element.getBoundingClientRect(); };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || element.matches(":focus-visible")) return;
      bounds ??= element.getBoundingClientRect();
      update(
        clamp((event.clientX - bounds.left) / bounds.width * 2 - 1),
        clamp((event.clientY - bounds.top) / bounds.height * 2 - 1),
      );
    };
    const reset = () => { bounds = undefined; update(0, 0); };
    element.addEventListener("pointerenter", enter);
    element.addEventListener("pointermove", move);
    element.addEventListener("pointerleave", reset);
    element.addEventListener("focusin", reset);
    cleanups.push(() => {
      element.removeEventListener("pointerenter", enter);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
      element.removeEventListener("focusin", reset);
    });
  }

  const station = document.querySelector<HTMLElement>(".workstation");
  if (station) {
    const layers = [...station.querySelectorAll<SVGElement>("[data-parallax]")].map((layer) => ({
      depth: Number(layer.dataset.parallax),
      x: gsap.quickTo(layer, "x", { duration: 0.7, ease: "power3.out" }),
      y: gsap.quickTo(layer, "y", { duration: 0.7, ease: "power3.out" }),
    }));
    followPointer(station, (x, y) => layers.forEach((layer) => {
      layer.x(x * layer.depth);
      layer.y(y * layer.depth * 0.65);
    }));
  }

  document.querySelectorAll<HTMLElement>("[data-depth]").forEach((panel) => {
    const art = panel.querySelector("svg, img");
    if (!art) return;
    gsap.set(art, { transformPerspective: 800, transformOrigin: "50% 50%" });
    const xTo = gsap.quickTo(art, "x", { duration: 0.55, ease: "power3.out" });
    const yTo = gsap.quickTo(art, "y", { duration: 0.55, ease: "power3.out" });
    const rotateX = gsap.quickTo(art, "rotationX", { duration: 0.55, ease: "power3.out" });
    const rotateY = gsap.quickTo(art, "rotationY", { duration: 0.55, ease: "power3.out" });
    followPointer(panel, (x, y) => {
      xTo(x * 9);
      yTo(y * 6);
      rotateX(y * -6);
      rotateY(x * 7);
    });
  });

  document.querySelectorAll<HTMLElement>(".button").forEach((button) => {
    // Individual translate composes with the existing pressed/hover transform.
    gsap.set(button, { "--magnet-x": "0px", "--magnet-y": "0px" });
    const xTo = gsap.quickTo(button, "--magnet-x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(button, "--magnet-y", { duration: 0.4, ease: "power3.out" });
    followPointer(button, (x, y) => { xTo(x * 5); yTo(y * 4); });
  });

  return () => cleanups.forEach((cleanup) => cleanup());
});
