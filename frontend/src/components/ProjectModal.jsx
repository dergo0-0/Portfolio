import { useEffect, useState } from 'react';
import './ProjectModal.css';

export default function ProjectModal({ project, onClose }) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!project) return undefined;
    setActive(0);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  const close = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  if (!project) return null;

  const images = project.images || [];

  return (
    <div className={`project-modal${visible ? ' project-modal--open' : ''}`} onClick={close}>
      <div className="project-modal__inner" onClick={(e) => e.stopPropagation()}>
        <button className="project-modal__close" onClick={close} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="3" y1="3" x2="13" y2="13" />
            <line x1="13" y1="3" x2="3" y2="13" />
          </svg>
        </button>

        <div className="project-modal__viewer">
          {images.map((img, i) => (
            <img
              key={img.src}
              className={`project-modal__img${i === active ? ' project-modal__img--active' : ''}`}
              src={img.src}
              alt={`${project.name} — ${img.label}`}
            />
          ))}
        </div>

        {images.length > 1 && (
          <div className="project-modal__tabs">
            {images.map((img, i) => (
              <button
                key={img.src}
                className={`project-modal__tab${i === active ? ' project-modal__tab--active' : ''}`}
                onClick={() => setActive(i)}
              >
                {img.label}
              </button>
            ))}
          </div>
        )}

        <div className="project-modal__info">
          <span className="project-modal__id">{project.id}</span>
          <h3 className="project-modal__name">{project.name}</h3>
          <p className="project-modal__tagline">{project.tagline}</p>
        </div>
      </div>
    </div>
  );
}