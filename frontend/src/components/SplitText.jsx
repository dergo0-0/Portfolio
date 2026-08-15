import { Fragment, useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

const SplitText = ({
  text,
  as: Tag = 'h2',
  className = '',
  delay = 0,
  stagger = 0.04,
  duration = 0.7,
  threshold = 0.3,
  once = true,
}) => {
  const rootRef = useRef(null);
  const charsRef = useRef([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const chars = charsRef.current.filter(Boolean);
    if (!chars.length) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      gsap.set(chars, { yPercent: 0, opacity: 1, rotation: 0 });
      return undefined;
    }

    gsap.set(chars, { yPercent: 110, opacity: 0, rotation: 6 });

    const play = () => {
      gsap.to(chars, {
        yPercent: 0,
        opacity: 1,
        rotation: 0,
        duration,
        stagger,
        delay,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    if (once) {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            play();
            io.disconnect();
          }
        },
        { threshold },
      );
      io.observe(root);
      return () => io.disconnect();
    }

    play();
    return undefined;
  }, [text, delay, stagger, duration, threshold, once]);

  const words = String(text).split(' ');

  return (
    <Tag ref={rootRef} className={`split-text ${className}`.trim()} aria-label={text}>
      {words.map((word, wi) => (
        <Fragment key={`${word}-${wi}`}>
          <span className="split-text__word" aria-hidden="true">
            {word.split('').map((char, ci) => (
              <span
                key={`${char}-${ci}`}
                ref={(el) => {
                  charsRef.current[wi * 1000 + ci] = el;
                }}
                className="split-text__char"
              >
                {char}
              </span>
            ))}
          </span>
          {wi < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </Tag>
  );
};

export default SplitText;
