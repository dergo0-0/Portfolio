import CaseFile from './CaseFile';
import projects from '../data/projects.json';

export default function CaseList() {
  return (
    <>
      <div className="section-label">
        Архів проєктів — {projects.length.toString().padStart(2, '0')} справи
      </div>
      <div className="cases">
        {projects.map((project) => (
          <CaseFile key={project.id} {...project} />
        ))}
      </div>
    </>
  );
}
