import { useCallback, useEffect, useMemo, useState } from 'react';
import { LanguageContext } from './i18n-context';

const translations = {
  uk: {
    nav: {
      name: 'СЕРГІЙ ДЕЙНЕГА',
      status: 'відкритий до роботи',
      contact: 'контакти',
    },
    hero: {
      eyebrow: 'с. Піщане · фронтенд · 11 клас',
      title: 'КОД — МОЄ МИСТЕЦТВО',
      titleAccent: 'МИСТЕЦТВО',
      rotating: ['фронтенд-розробник', 'UI/UX-дизайнер', 'учень 11 класу'],
      meta: [
        { label: 'Спеціалізація', value: 'Frontend · UI/UX' },
        { label: 'Досвід', value: '2 робочі проєкти' },
        { label: 'База', value: 'с. Піщане, UA' },
        { label: 'Статус', value: 'Учень 11 класу' },
      ],
      scroll: 'гортай вниз',
    },
    marquee: ['frontend', 'ui/ux', 'react', 'адаптив', 'графіті', 'чистий код'],
    about: {
      label: 'про мене',
      title: 'ТЕГ:',
      titleAccent: 'FRONTEND',
      paragraphs: [
        'Я — Сергій Дейнега, учень 11-го класу та починаючий фронтенд-розробник із села Піщане.',
        'Код для мене — те саме графіті: залишаю свій тег у кожному пікселі. Люблю адаптивні інтерфейси, які однаково гарно виглядають на телефоні та моніторі.',
      ],
      teamBefore: 'Працюю в команді з',
      teamName: 'Олексієм',
      teamAfter: '— працюємо варіативно: разом робимо реальні проєкти.',
      stats: [
        { value: '11', label: 'клас' },
        { value: '2', label: 'робочі проєкти' },
        { value: '80%', label: 'фронтенду Vector' },
        { value: '5', label: 'днів на концепт' },
      ],
    },
    stack: {
      label: 'інструменти',
      title: 'МІЙ СТЕК',
      items: ['React', 'JavaScript', 'HTML5', 'CSS3', 'GSAP', 'Vite', 'npm', 'Git', 'Responsive UI', 'UI/UX'],
    },
    projects: {
      label: 'архів тег',
      title: 'ПРОЄКТИ',
      status: { live: 'на живу', done: 'зроблено' },
      list: [
        {
          id: '01',
          name: 'Vector',
          tagline: 'Платформа для проведення турнірів',
          desc: 'Desktop та mobile адаптація зроблена мною. Близько 80% фронтенду — на мені.',
          tech: ['React', 'Adaptive UI', 'Desktop / Mobile'],
          status: 'done',
        },
        {
          id: '02',
          name: 'Scalaris',
          tagline: 'Mobile first, гарно адаптований під ПК',
          desc: 'Основний UX/UI зроблений та адаптований мною від мобільного до десктопу. У складі проєкту — концепт Nike Run Club.',
          tech: ['Mobile-first', 'UX/UI', 'Responsive'],
          status: 'done',
        },
      ],
      concept: {
        tag: 'концепт → Scalaris',
        name: 'Nike Run Club',
        tagline: 'Веб-застосунок, що збирає людей разом',
        desc: 'Люди бачать одне одного на мапі та пропонують спільну прогулянку. Зроблено за 5 днів у межах проєкту Scalaris.',
        tech: ['Map', 'Real-time', '5 днів'],
      },
    },
    contact: {
      label: 'контакти',
      title: 'МАЄШ ІДЕЮ?',
      subtitle: 'Намалюємо її разом. Пиши куди зручно:',
      copy: 'копіювати',
      copied: 'скопійовано!',
      links: [
        { label: 'Telegram', value: 'richDergo', href: 'https://t.me/richDergo' },
        { label: 'Instagram', value: 'btwdergo', href: 'https://instagram.com/btwdergo' },
        { label: 'GitHub', value: 'Dergo0-0', href: 'https://github.com/Dergo0-0' },
        { label: 'Email', value: 'wallmartbag1991@gmail.com', href: 'mailto:wallmartbag1991@gmail.com' },
      ],
      footer: '© 2026 Сергій Дейнега · зроблено з фарбою та кодами',
    },
  },
  en: {
    nav: {
      name: 'SERHII DEINEHA',
      status: 'open to work',
      contact: 'contact',
    },
    hero: {
      eyebrow: 'Pishchane · frontend · grade 11',
      title: 'CODE IS MY TAG',
      titleAccent: 'TAG',
      rotating: ['frontend developer', 'UI/UX designer', '11th grade student'],
      meta: [
        { label: 'Specialization', value: 'Frontend · UI/UX' },
        { label: 'Experience', value: '2 shipped projects' },
        { label: 'Base', value: 'Pishchane, UA' },
        { label: 'Status', value: '11th grade student' },
      ],
      scroll: 'scroll down',
    },
    marquee: ['frontend', 'ui/ux', 'react', 'responsive', 'graffiti', 'clean code'],
    about: {
      label: 'about me',
      title: 'TAG:',
      titleAccent: 'FRONTEND',
      paragraphs: [
        "I'm Serhii Deineha — an 11th grade student and a starting frontend developer from Pishchane.",
        'For me code is like graffiti: I leave my tag in every pixel. I love adaptive interfaces that look equally good on a phone and a monitor.',
      ],
      teamBefore: 'I work in a team with',
      teamName: 'Oleksii',
      teamAfter: '— we work flexibly: together we ship real projects.',
      stats: [
        { value: '11', label: 'grade' },
        { value: '2', label: 'shipped projects' },
        { value: '80%', label: 'of Vector frontend' },
        { value: '5', label: 'days for a concept' },
      ],
    },
    stack: {
      label: 'tools',
      title: 'MY STACK',
      items: ['React', 'JavaScript', 'HTML5', 'CSS3', 'GSAP', 'Vite', 'npm', 'Git', 'Responsive UI', 'UI/UX'],
    },
    projects: {
      label: 'tag archive',
      title: 'PROJECTS',
      status: { live: 'live', done: 'done' },
      list: [
        {
          id: '01',
          name: 'Vector',
          tagline: 'Tournament hosting platform',
          desc: 'Desktop and mobile adaptation done by me. About 80% of the frontend is on my shoulders.',
          tech: ['React', 'Adaptive UI', 'Desktop / Mobile'],
          status: 'done',
        },
        {
          id: '02',
          name: 'Scalaris',
          tagline: 'Mobile first, well adapted for desktop',
          desc: 'The core UX/UI was designed and adapted by me from mobile to desktop. Includes the Nike Run Club concept.',
          tech: ['Mobile-first', 'UX/UI', 'Responsive'],
          status: 'done',
        },
      ],
      concept: {
        tag: 'concept → Scalaris',
        name: 'Nike Run Club',
        tagline: 'A web app that brings people together',
        desc: 'People see each other on a live map and offer a shared walk. Built in 5 days as part of the Scalaris project.',
        tech: ['Map', 'Real-time', '5 days'],
      },
    },
    contact: {
      label: 'contact',
      title: 'GOT AN IDEA?',
      subtitle: "Let's paint it together. Hit me up anywhere:",
      copy: 'copy',
      copied: 'copied!',
      links: [
        { label: 'Telegram', value: 'richDergo', href: 'https://t.me/richDergo' },
        { label: 'Instagram', value: 'btwdergo', href: 'https://instagram.com/btwdergo' },
        { label: 'GitHub', value: 'Dergo0-0', href: 'https://github.com/Dergo0-0' },
        { label: 'Email', value: 'wallmartbag1991@gmail.com', href: 'mailto:wallmartbag1991@gmail.com' },
      ],
      footer: '© 2026 Serhii Deineha · made with paint & code',
    },
  },
};

function getInitialLang() {
  try {
    const saved = localStorage.getItem('pf-lang');
    if (saved === 'uk' || saved === 'en') return saved;
  } catch {
    /* ignore */
  }
  return 'uk';
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  const toggle = useCallback(() => {
    setLang((current) => (current === 'uk' ? 'en' : 'uk'));
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('pf-lang', lang);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = lang;
    document.title = lang === 'uk' ? 'Сергій Дейнега — фронтенд-розробник' : 'Serhii Deineha — Frontend Developer';
  }, [lang]);

  const t = useCallback(
    (key) => {
      const parts = String(key).split('.');
      let node = translations[lang];
      for (const part of parts) {
        node = node?.[part];
      }
      return node ?? key;
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, toggle, t }), [lang, toggle, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
