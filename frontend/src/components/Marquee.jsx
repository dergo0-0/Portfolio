import { useLang } from '../i18n-context';

const Marquee = () => {
  const { t } = useLang();
  const items = t('marquee');

  const row = [...items, ...items, ...items, ...items];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {row.map((item, i) => (
          <span className="marquee__item" key={`${item}-${i}`}>
            <span className="marquee__text">{item}</span>
            <span className="marquee__star">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0L9.5 6.5L16 8L9.5 9.5L8 16L6.5 9.5L0 8L6.5 6.5Z" />
              </svg>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
