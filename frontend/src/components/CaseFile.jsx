export default function CaseFile({ id, title, tags, status, link }) {
  const statusLabel = {
    live: 'live',
    progress: 'in progress',
    archived: 'archived',
  }[status];

  return (
    <a className="case" href={link}>
      <span className="num">{id}</span>
      <span className="title">{title}</span>
      <span className="tags">{tags.join(' · ')}</span>
      <span className={`stamp ${status}`}>{statusLabel}</span>
    </a>
  );
}
