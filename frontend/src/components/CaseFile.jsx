import GlareHover from './GlareHover';
import { useLang } from '../i18n-context';

export default function CaseFile({ id, name, tagline, desc, tech, status, link = '#contact', images, onProjectClick }) {
  const { t } = useLang();
  const statusLabel = t(`projects.status.${status}`) || status;

  const handleClick = (e) => {
    if (images && images.length && onProjectClick) {
      e.preventDefault();
      onProjectClick({ id, name, tagline, images });
    }
  };

  return (
    <article className="case" onClick={handleClick}>
      <GlareHover
        width="100%"
        height="100%"
        background="transparent"
        borderColor="transparent"
        borderRadius="0px"
        glareColor="#FF4B2E"
        glareOpacity={0.15}
        glareAngle={-30}
        glareSize={175}
        transitionDuration={700}
        playOnce={false}
        className="case-glare"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        <span />
      </GlareHover>

      <a className="case__link" href={link} aria-label={name} />

      <div className="case__head">
        <span className="case__num">{id}</span>
        <span className={`stamp stamp--${status}`}>{statusLabel}</span>
      </div>

      <h3 className="case__name">{name}</h3>
      <p className="case__tagline">{tagline}</p>
      <p className="case__desc">{desc}</p>

      <div className="case__foot">
        <div className="case__tech">
          {tech.map((item) => (
            <span className="chip chip--small" key={item}>
              {item}
            </span>
          ))}
        </div>
        <span className="case__arrow">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="13" x2="13" y2="3" />
            <polyline points="6,3 13,3 13,10" />
          </svg>
        </span>
      </div>
    </article>
  );
}
