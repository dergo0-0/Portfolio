import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import OptionWheel from './OptionWheel';
import SplitText from './SplitText';
import Reveal from './Reveal';
import { useLang } from '../i18n-context';

function LogoBadge({ logo, accent }) {
  return (
    <svg className="cert-card__logo" width="56" height="56" viewBox="0 0 56 56" fill="none">
      <rect width="56" height="56" rx="14" fill={accent} opacity="0.14" />
      <rect x="1" y="1" width="54" height="54" rx="13" stroke={accent} strokeOpacity="0.45" />
      <text x="28" y="36" textAnchor="middle" fontFamily="'Sivar Pro','Russo One',sans-serif" fontSize="16" fill={accent} fontWeight="700">
        {logo}
      </text>
    </svg>
  );
}

export default function Certificates() {
  const { t } = useLang();
  const data = t('certificates');
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef(null);
  const indexRef = useRef(0);

  const wheelItems = useMemo(() => {
    const reps = 5;
    const base = data.wheel;
    return Array.from({ length: reps }).flatMap(() => base);
  }, [data.wheel]);

  const wheelDefault = Math.floor(wheelItems.length / 2) + Math.floor(data.list.length / 2);

  const current = data.list[index] || data.list[0];

  const handleChange = useCallback((i) => {
    if (i === indexRef.current) return;
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      if (i === indexRef.current) return;
      indexRef.current = i;
      setFading(true);
      window.setTimeout(() => {
        setIndex(i);
        setFading(false);
      }, 120);
    }, 260);
  }, []);

  const handleWheelChange = useCallback(
    (i) => {
      handleChange(i % data.list.length);
    },
    [handleChange, data.list.length],
  );

  const step = useCallback(
    (dir) => {
      const n = data.list.length;
      handleChange((indexRef.current + dir + n) % n);
    },
    [data.list.length, handleChange],
  );

  useEffect(() => {
    setFading(false);
    return () => window.clearTimeout(timerRef.current);
  }, []);

  return (
    <section className="certificates" id="certificates">
      <div className="section-label">
        {t('certificates.label')} — {data.list.length.toString().padStart(2, '0')}
      </div>
      <SplitText className="certificates__title" as="h2" text={t('certificates.title')} stagger={0.03} />

      <div className="certificates__grid">
        <Reveal className="certificates__wheel-wrap" stagger={0.1} rotate={0} threshold={0.1}>
          <div className="certificates__wheel">
            <OptionWheel
              items={wheelItems}
              defaultSelected={wheelDefault}
              onChange={handleWheelChange}
              textColor="rgba(151, 144, 125, 0.3)"
              activeColor="#e8512c"
              side="left"
              fontSize={3.4}
              spacing={1.8}
              curve={2}
              tilt={6}
              blur={1.5}
              fade={0.21}
              smoothing={240}
              inset={60}
              loop
              draggable
              soundUrl={`${import.meta.env.BASE_URL}sounds/click-soft.wav`}
              soundVolume={0.5}
            />
          </div>
        </Reveal>

        <Reveal className="certificates__panel" stagger={0.12} rotate={0} threshold={0.1}>
          <div className={`cert-card${fading ? ' cert-card--fading' : ''}`}>
            <div className="cert-card__top">
              <LogoBadge logo={current.logo} accent="#e8512c" />
              <div className="cert-card__head">
                <h3 className="cert-card__name">{current.name}</h3>
                <div className="cert-card__sub">
                  <span>{current.issuer}</span>
                  <span className="cert-card__dot">•</span>
                  <span>{current.year}</span>
                </div>
              </div>
            </div>
            <p className="cert-card__desc">{current.desc}</p>
            <div className="cert-card__tech">
              {current.tech.map((item) => (
                <span className="chip chip--small" key={item}>
                  {item}
                </span>
              ))}
            </div>
            <div className="cert-card__line" />
            <a className="cert-card__open" href={`${import.meta.env.BASE_URL}certificates/${current.fileName}`} target="_blank" rel="noreferrer">
              {t('certificates.open')}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="13" x2="13" y2="3" />
                <polyline points="6,3 13,3 13,10" />
              </svg>
            </a>
          </div>

          <div className="cert-nav">
            <button className="cert-nav__btn" type="button" onClick={() => step(-1)} aria-label="Previous">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="10,13 5,8 10,3" />
              </svg>
            </button>
            <span className="cert-nav__count">
              {String(index + 1).padStart(2, '0')} / {data.list.length.toString().padStart(2, '0')}
            </span>
            <button className="cert-nav__btn" type="button" onClick={() => step(1)} aria-label="Next">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6,13 11,8 6,3" />
              </svg>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}