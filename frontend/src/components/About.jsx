import SplitText from './SplitText';
import Reveal from './Reveal';
import SprayCan from './SprayCan';
import { useLang } from '../i18n-context';

export default function About() {
  const { t } = useLang();

  return (
    <section className="about" id="about">
      <Reveal className="about__inner" stagger={0.1}>
        <div className="section-label">{t('about.label')}</div>

        <div className="about__grid">
          <div className="about__text">
            <div className="about__heading">
              <SplitText className="about__title" as="h2" text={t('about.title')} stagger={0.03} />
              <span className="about__title-accent">{t('about.titleAccent')}</span>
            </div>

            <div className="about__copy">
              {t('about.paragraphs').map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p>
                {t('about.teamBefore')}{' '}
                <a className="about__link" href="https://ttjelky.github.io/portfolio/" target="_blank" rel="noreferrer">
                  {t('about.teamName')}
                </a>{' '}
                {t('about.teamAfter')}
              </p>
            </div>

            <div className="about__stats">
              {t('about.stats').map((stat) => (
                <div className="stat-sticker" key={stat.label}>
                  <span className="stat-sticker__value">{stat.value}</span>
                  <span className="stat-sticker__label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <SprayCan className="about__art" />
        </div>
      </Reveal>
    </section>
  );
}
