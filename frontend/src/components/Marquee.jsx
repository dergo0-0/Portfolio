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
            <span className="marquee__star">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
