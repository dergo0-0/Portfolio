import { useState, useCallback, useEffect, useRef } from 'react';
import OptionWheel from './OptionWheel';
import SplitText from './SplitText';
import Reveal from './Reveal';
import { useLang } from '../i18n-context';

const ICONS = {
  '01': (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="6" fill="#e8512c" opacity="0.12" />
      <path d="M9 20V12l5-4 5 4v8" stroke="#e8512c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 20v-5h4v5" stroke="#e8512c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  '02': (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="6" fill="#e8512c" opacity="0.12" />
      <circle cx="11" cy="11" r="3" stroke="#e8512c" strokeWidth="1.5" />
      <circle cx="17" cy="11" r="3" stroke="#e8512c" strokeWidth="1.5" />
      <path d="M9 20c0-3.3 2.2-4 5-4s5 .7 5 4" stroke="#e8512c" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  '03': (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="6" fill="#e8512c" opacity="0.12" />
      <path d="M14 8l2 4 4.5.7-3.2 3.2.8 4.5L14 17.5l-4.1 2.9.8-4.5L7.5 12.7 12 12z" stroke="#e8512c" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  '04': (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="6" fill="#e8512c" opacity="0.12" />
      <path d="M10 20h8M14 8v8M10 12h8" stroke="#e8512c" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

export default function Certificates() {
  const { t } = useLang();
  const data = t('certificates');
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef(null);
  const indexRef = useRef(0);

  const current = data.list[index] || data.list[0];

  const handleChange = useCallback((i) => {
    if (i === indexRef.current) return;
    window.clearTimeout(timerRef.current);
    setFading(true);
    timerRef.current = window.setTimeout(() => {
      indexRef.current = i;
      setIndex(i);
      setFading(false);
    }, 180);
  }, []);

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
              items={data.wheel}
              defaultSelected={0}
              onChange={handleChange}
              textColor="rgba(151, 144, 125, 0.28)"
              activeColor="#4f46e5"
              side="left"
              fontSize={3.4}
              spacing={1.8}
              curve={1}
              tilt={7}
              blur={2}
              fade={0.28}
              minOpacity={0.02}
              smoothing={220}
              inset={70}
              loop
            />
          </div>
        </Reveal>

        <Reveal className="certificates__panel" stagger={0.12} rotate={0} threshold={0.1}>
          <div className={`cert-card${fading ? ' cert-card--fading' : ''}`}>
            <div className="cert-card__icon">
              {ICONS[current.id] || ICONS['04']}
            </div>
            <div className="cert-card__header">
              <h3 className="cert-card__name">{current.name}</h3>
            </div>
            <div className="cert-card__sub">
              <span>{current.issuer}</span>
              <span className="cert-card__dot">•</span>
              <span>{current.year}</span>
            </div>
            <p className="cert-card__desc">{current.desc}</p>
            <div className="cert-card__line" />
            <a className="cert-card__open" href={`${import.meta.env.BASE_URL}certificates/${current.fileName}`} target="_blank" rel="noreferrer">
              {t('certificates.open')}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="13" x2="13" y2="3" />
                <polyline points="6,3 13,3 13,10" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
