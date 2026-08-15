import SplitText from './SplitText';
import Reveal from './Reveal';
import { useLang } from '../i18n-context';

export default function Stack() {
  const { t } = useLang();

  return (
    <section className="stack" id="stack">
      <div className="section-label">{t('stack.label')}</div>
      <SplitText className="stack__title" as="h2" text={t('stack.title')} stagger={0.035} />

      <Reveal className="stack-box" stagger={0.04} rotate={0} distance={20} threshold={0.05}>
        {t('stack.items').map((item, i) => (
          <div className="stack-row" key={item}>
            <span className="stack-row__num">{String(i + 1).padStart(2, '0')}</span>
            <span className="stack-row__name">{item}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
