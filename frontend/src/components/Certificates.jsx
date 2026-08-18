import { useState, useCallback } from 'react';
import OptionWheel from './OptionWheel';
import SplitText from './SplitText';
import Reveal from './Reveal';
import { useLang } from '../i18n-context';

export default function Certificates() {
  const { t } = useLang();
  const data = t('certificates');
  const [index, setIndex] = useState(0);
  const [iframeKey, setIframeKey] = useState(0);

  const current = data.list[index] || data.list[0];

  const handleChange = useCallback((i) => {
    setIndex(i);
    setIframeKey((k) => k + 1);
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
              textColor="rgba(151, 144, 125, 0.35)"
              activeColor="#f0ecdf"
              side="left"
              fontSize={3.4}
              spacing={1.7}
              curve={1}
              tilt={7}
              blur={4}
              fade={0.3}
              minOpacity={0}
              smoothing={280}
              inset={70}
              loop
            />
          </div>
        </Reveal>

        <Reveal className="certificates__panel" stagger={0.12} rotate={0} threshold={0.1}>
          <div className="cert-card" key={current.id}>
            <div className="cert-card__head">
              <span className="cert-card__id">{current.id}</span>
              <span className="stamp stamp--done">certified</span>
            </div>
            <h3 className="cert-card__name">{current.name}</h3>
            <p className="cert-card__desc">{current.desc}</p>
            <div className="cert-card__meta">
              <span className="cert-card__issuer">{current.issuer}</span>
              <span className="cert-card__year">{current.year}</span>
            </div>
            <div className="cert-card__tech">
              {current.tech.map((item) => (
                <span className="chip chip--small" key={item}>
                  {item}
                </span>
              ))}
            </div>
            <a className="cert-card__open" href={current.file} target="_blank" rel="noreferrer">
              {t('certificates.open')}
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="13" x2="13" y2="3" />
                <polyline points="6,3 13,3 13,10" />
              </svg>
            </a>
            <iframe
              key={iframeKey}
              className="cert-card__preview"
              src={`${import.meta.env.BASE_URL}certificates/${current.fileName}`}
              title={current.name}
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
