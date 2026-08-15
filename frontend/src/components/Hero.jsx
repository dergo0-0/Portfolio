import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import RotatingText from './RotatingText';
import { useLang } from '../i18n-context';

export default function Hero() {
  const { t } = useLang();
  const titleRef = useRef(null);
  const wordRefs = useRef([]);
  const underlineRef = useRef(null);
  const dotRef = useRef(null);

  const words = String(t('hero.title')).split(' ');
  const accentWord = String(t('hero.titleAccent')).toUpperCase();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (reduce) return;
      const titleWords = wordRefs.current.filter(Boolean);
      if (titleWords.length) {
        gsap.fromTo(
          titleWords,
          { yPercent: 115, opacity: 0, rotation: 5 },
          {
            yPercent: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.85,
            stagger: 0.11,
            ease: 'power3.out',
            delay: 0.25,
          },
        );
      }
      const line = underlineRef.current?.querySelector('.hero-underline__line');
      if (line) {
        gsap.fromTo(
          line,
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.9, ease: 'power2.out', delay: 1.25 },
        );
      }
      if (dotRef.current) {
        gsap.fromTo(
          dotRef.current,
          { scale: 0, opacity: 0, transformOrigin: 'center' },
          { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(3)', delay: 2.1 },
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="hero" id="top">
      <span className="hero-tag">{t('hero.eyebrow')}</span>

      <h1 ref={titleRef} className="hero-title">
        {words.map((word, i) => (
          <span key={`${word}-${i}`}>
            <span
              ref={(el) => {
                wordRefs.current[i] = el;
              }}
              className={`hero-title__word${word.toUpperCase() === accentWord ? ' hero-title__word--accent' : ''}`}
            >
              {word}
            </span>
            {i < words.length - 1 ? ' ' : null}
          </span>
        ))}
      </h1>

      <svg ref={underlineRef} className="hero-underline" viewBox="0 0 340 26" aria-hidden="true">
        <path
          className="hero-underline__line"
          d="M 8 17 Q 70 8 130 13 T 250 11 Q 300 10 332 14"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset="1"
          fill="none"
          stroke="var(--signal)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle ref={dotRef} className="hero-underline__dot" cx="332" cy="14" r="6" fill="var(--gold)" />
      </svg>

      <div className="hero-rota">
        <span className="hero-rota__mark">*</span>
        <RotatingText items={t('hero.rotating')} />
      </div>

      <div className="hero-meta">
        {t('hero.meta').map((item) => (
          <div className="hero-meta__item" key={item.label}>
            <span className="hero-meta__label">{item.label}</span>
            <span className="hero-meta__value">{item.value}</span>
          </div>
        ))}
        <span className="hero-scroll">
          <span className="hero-scroll__line" />
          {t('hero.scroll')}
        </span>
      </div>
    </div>
  );
}
