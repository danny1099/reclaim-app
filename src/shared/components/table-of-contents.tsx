"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/shared/utils";

export interface TocSection {
  id: string;
  label: string;
  number: string;
}

interface TableOfContentsProps {
  sections: TocSection[];
  ariaLabel: string;
  onThisPage: string;
}

export const TableOfContents = ({ sections, ariaLabel, onThisPage }: TableOfContentsProps) => {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headings = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => el !== null);

    if (headings.length === 0) return;

    const visibleHeadings = new Map<string, IntersectionObserverEntry>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibleHeadings.set(entry.target.id, entry);
        }

        const inView = Array.from(visibleHeadings.values())
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (inView.length > 0) {
          setActiveId(inView[0].target.id);
          return;
        }

        const scrolled = Array.from(visibleHeadings.values())
          .filter((entry) => entry.boundingClientRect.top < 0)
          .sort((a, b) => b.boundingClientRect.top - a.boundingClientRect.top);

        if (scrolled.length > 0) {
          setActiveId(scrolled[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: [0, 1] }
    );

    for (const heading of headings) observerRef.current.observe(heading);

    return () => observerRef.current?.disconnect();
  }, [sections]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      event.preventDefault();
      const target = document.getElementById(id);
      if (!target) return;

      const offset = 96;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
      history.replaceState(null, "", `#${id}`);
      setActiveId(id);
    },
    [reduceMotion]
  );

  return (
    <nav aria-label={ariaLabel} className="text-2xs">
      <p className="text-muted-foreground mb-3 font-semibold tracking-widest uppercase">{onThisPage}</p>
      <ol className="border-border/60 flex flex-col gap-0.5 border-l">
        {sections.map((section, index) => {
          const isActive = activeId === section.id;
          return (
            <li key={section.id} className="relative">
              <motion.span
                aria-hidden
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  scaleY: isActive ? 1 : 0.4,
                }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="bg-tertiary absolute top-2 bottom-2 -left-px w-px origin-top"
              />
              <a
                href={`#${section.id}`}
                onClick={(event) => handleClick(event, section.id)}
                className={cn(
                  "flex items-baseline gap-2.5 py-1.5 pr-2 pl-4 transition-colors",
                  isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground/80"
                )}
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={cn(
                    "text-3xs shrink-0 font-mono tabular-nums transition-colors",
                    isActive ? "text-tertiary" : "text-muted-foreground/60"
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="leading-snug text-pretty">{section.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
