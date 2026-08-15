import { useRef, useState } from 'react';
import SplitText from './SplitText';
import Reveal from './Reveal';
import { useLang } from '../i18n-context';

function ContactRow({ item }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  const copy = async (e) => {
    e.preventDefault();
      try {
        await navigator.clipboard.writeText(item.value);
      } catch {
        const input = document.createElement('textarea');
        input.value = item.value;
        document.body.appendChild(input);
        input.select();
        try {
          document.execCommand('copy');
        } catch {
          /* ignore */
        }
        input.remove();
      }
    setCopied(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="contact-row">
      <span className="contact-row__label">{item.label}</span>
      <a className="contact-row__value" href={item.href} target="_blank" rel="noreferrer">
        {item.value}
        <span className="contact-row__ext">↗</span>
      </a>
      <button
        className={`copy-btn ${copied ? 'copy-btn--done' : ''}`}
        type="button"
        onClick={copy}
        title={t('contact.copy')}
        aria-label={`${t('contact.copy')} ${item.value}`}
      >
        {copied ? t('contact.copied') : t('contact.copy')}
      </button>
    </div>
  );
}

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="footer" id="contact">
      <div className="section-label">{t('contact.label')}</div>
      <SplitText className="footer__title" as="h2" text={t('contact.title')} stagger={0.04} />
      <p className="footer__subtitle">{t('contact.subtitle')}</p>

      <Reveal className="contact-list" stagger={0.1} rotate={0}>
        {t('contact.links').map((item) => (
          <ContactRow item={item} key={item.label} />
        ))}
      </Reveal>

      <div className="footer__bottom">
        <span className="footer__tag">DERGO</span>
        <span>{t('contact.footer')}</span>
      </div>
    </footer>
  );
}
