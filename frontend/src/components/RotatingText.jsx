import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';

const RotatingText = ({ items = [], className = '', interval = 2400 }) => {
  const [index, setIndex] = useState(0);
  const currentRef = useRef(null);

  useEffect(() => {
    if (items.length < 2) return undefined;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [items.length, interval]);

  useEffect(() => {
    const el = currentRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      gsap.set(el, { y: 0, opacity: 1 });
      return;
    }
    const tl = gsap.timeline();
    tl.to(el, { yPercent: -35, opacity: 0, duration: 0.28, ease: 'power2.in' })
      .set(el, { yPercent: 35 })
      .to(el, { yPercent: 0, opacity: 1, duration: 0.42, ease: 'power3.out' });
    return () => {
      tl.kill();
    };
  }, [index]);

  const label = items[index] || items[0] || '';

  return (
    <span className={`rotating-text ${className}`.trim()}>
      <span className="rotating-text__clip" aria-live="polite">
        <span ref={currentRef} className="rotating-text__item">
          {label}
        </span>
      </span>
    </span>
  );
};

export default RotatingText;
