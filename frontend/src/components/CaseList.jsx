import CaseFile from './CaseFile';
import SplitText from './SplitText';
import Reveal from './Reveal';
import { useLang } from '../i18n-context';

export default function CaseList() {
  const { t } = useLang();
  const projects = t('projects.list');
  const concept = t('projects.concept');

  return (
    <section className="projects" id="projects">
      <div className="section-label">
        {t('projects.label')} — {projects.length.toString().padStart(2, '0')}
      </div>
      <SplitText className="projects__title" as="h2" text={t('projects.title')} stagger={0.03} />

      <Reveal className="cases" stagger={0.14} rotate={0} threshold={0.05}>
        {projects.map((project) => (
          <CaseFile key={project.id} {...project} link="#contact" />
        ))}
      </Reveal>

      <Reveal className="concept-card" stagger={0.1} rotate={0} threshold={0.1}>
        <span className="concept-card__tape" />
        <span className="concept-card__tag">{concept.tag}</span>
        <h3 className="concept-card__name">{concept.name}</h3>
        <p className="concept-card__tagline">{concept.tagline}</p>
        <p className="concept-card__desc">{concept.desc}</p>
        <svg className="concept-card__doodle" viewBox="0 0 220 90" aria-hidden="true">
          <path
            className="concept-card__route"
            d="M 24 68 Q 70 40 96 58 T 170 30 Q 186 22 198 24"
            pathLength="1"
          />
          <circle className="concept-card__pin" cx="24" cy="68" r="6" />
          <circle className="concept-card__pin concept-card__pin--go" cx="198" cy="24" r="6" />
        </svg>
        <div className="concept-card__tech">
          {concept.tech.map((item) => (
            <span className="chip chip--small" key={item}>
              {item}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
