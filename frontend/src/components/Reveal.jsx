import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

const Reveal = ({ children, as: Tag = 'div', className = '', stagger = 0.12, delay = 0, distance = 42, rotate = 1, threshold = 0.15 }) => {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.children).filter(
      (el) => !(el.classList && el.classList.contains('reveal-skip')),
    );
    if (!items.length) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      gsap.set(items, { opacity: 1, y: 0, rotate: 0 });
      return;
    }

    gsap.set(items, { opacity: 0, y: distance, rotate });

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 0.9,
            stagger,
            delay,
            ease: 'power3.out',
            overwrite: 'auto',
          });
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(root);
    return () => io.disconnect();
  }, [children, stagger, delay, distance, rotate, threshold]);

  return (
    <Tag ref={rootRef} className={`reveal ${className}`.trim()}>
      {children}
    </Tag>
  );
};

export default Reveal;
