import { useState, useCallback } from 'react';
import CaseFile from './CaseFile';
import SplitText from './SplitText';
import Reveal from './Reveal';
import ProjectModal from './ProjectModal';
import { useLang } from '../i18n-context';

export default function CaseList() {
  const { t } = useLang();
  const projects = t('projects.list');
  const [selected, setSelected] = useState(null);

  const open = useCallback((project) => {
    if (project.images && project.images.length) setSelected(project);
  }, []);

  const close = useCallback(() => setSelected(null), []);

  return (
    <section className="projects" id="projects">
      <div className="section-label">
        {t('projects.label')} — {projects.length.toString().padStart(2, '0')}
      </div>
      <SplitText className="projects__title" as="h2" text={t('projects.title')} stagger={0.03} />

      <Reveal className="cases" stagger={0.14} rotate={0} threshold={0.05}>
        {projects.map((project) => (
          <CaseFile key={project.id} {...project} onProjectClick={open} />
        ))}
      </Reveal>

      <ProjectModal project={selected} onClose={close} />
    </section>
  );
}
