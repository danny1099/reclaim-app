"use client";
import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

const CountUp = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || !ref.current) return;
    if (reduceMotion) {
      ref.current.textContent = String(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = String(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [inView, value, reduceMotion]);

  return (
    <span className="tabular-nums">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
};

export const Stats = () => {
  const t = useTranslations("marketing.stats");

  const items: ReadonlyArray<StatItem> = [
    { value: 70, suffix: "%", label: t("items.recovery") },
    { value: 3, suffix: "", label: t("items.emails") },
    { value: 5, suffix: " min", label: t("items.setup") },
    { value: 2, suffix: "", label: t("items.gateways") },
  ];

  return (
    <section className="border-border/60 border-b">
      <dl className="bg-border/60 mx-auto grid w-full max-w-6xl grid-cols-2 gap-px lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="bg-background flex flex-col items-center gap-1 px-4 py-10 text-center md:py-14">
            <dt className="text-2xs text-muted-foreground order-2">{item.label}</dt>
            <dd className="order-1 text-4xl font-bold tracking-tight md:text-5xl">
              <CountUp value={item.value} suffix={item.suffix} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
