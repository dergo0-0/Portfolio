import { useLang } from '../i18n-context';

export default function Nav() {
  const { lang, toggle, t } = useLang();

  return (
    <nav className="nav">
      <a className="nav-brand" href="#top">
        <span className="nav-brand__tag">DERGO</span>
        <span className="nav-brand__sub">{t('nav.name')}</span>
      </a>

      <div className="nav-right">
        <button
          className="lang-toggle"
          type="button"
          onClick={toggle}
          title={lang === 'uk' ? 'Switch to English' : 'Перемкнути на українську'}
          aria-label={lang === 'uk' ? 'Switch to English' : 'Перемкнути на українську'}
        >
          {lang === 'uk' ? 'EN' : 'UA'}
        </button>
        <a className="nav-cta" href="#contact">
          {t('nav.contact')}
        </a>
      </div>
    </nav>
  );
}
