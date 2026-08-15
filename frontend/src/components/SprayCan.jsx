import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsap';

const SprayCan = ({ className = '' }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return undefined;

    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set('.draw', { strokeDashoffset: 0 });
        gsap.set('.pop', { scale: 1, opacity: 1 });
        return;
      }

      const draws = gsap.utils.toArray('.draw');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svg,
          start: 'top 85%',
          end: 'top 15%',
          scrub: 1.4,
        },
      });
      tl.to(draws, { strokeDashoffset: 0, duration: 0.4, ease: 'none', stagger: 0.07 }, 0)
        .fromTo(
          '.pop',
          { scale: 0, opacity: 0, transformOrigin: 'center' },
          { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)', stagger: 0.05 },
          draws.length * 0.07 + 0.25,
        );

      const idle = gsap.fromTo(
        svg,
        { rotation: -2, y: 0 },
        { rotation: 2, y: -7, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: -1 },
      );
      idle.pause();

      ScrollTrigger.create({
        trigger: svg,
        start: 'top 55%',
        toggleActions: 'play none none none',
        onEnter: () => idle.play(),
      });
    }, svg);

    return () => ctx.revert();
  }, []);

  return (
    <svg
      ref={svgRef}
      className={`spray-can ${className}`.trim()}
      viewBox="0 0 420 420"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className="draw draw--glow"
        d="M 232 106 C 250 40, 130 20, 92 74 C 56 126, 92 190, 150 172 C 190 160, 214 130, 206 104"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
        fill="none"
        stroke="#c9a14a"
        strokeWidth="30"
        opacity="0.16"
        strokeLinecap="round"
      />

      <path
        className="draw draw--trail"
        d="M 232 106 Q 250 72 212 54"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
        fill="none"
        stroke="#e8512c"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        className="draw draw--trail"
        d="M 212 54 Q 160 30 112 54"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
        fill="none"
        stroke="#e8512c"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        className="draw draw--trail"
        d="M 112 54 Q 72 88 88 124"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
        fill="none"
        stroke="#e8512c"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        className="draw draw--trail"
        d="M 88 124 Q 96 174 142 168"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
        fill="none"
        stroke="#e8512c"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        className="draw draw--trail"
        d="M 142 168 Q 184 158 204 128"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
        fill="none"
        stroke="#e8512c"
        strokeWidth="13"
        strokeLinecap="round"
      />
      <path
        className="draw draw--trail"
        d="M 204 128 Q 212 108 200 96"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
        fill="none"
        stroke="#e8512c"
        strokeWidth="13"
        strokeLinecap="round"
      />

      <path
        className="draw draw--outline"
        d="M 175 160 V 348 Q 175 368 195 368"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
        fill="none"
        stroke="#f0ecdf"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        className="draw draw--outline"
        d="M 195 368 H 275 Q 295 368 295 348"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
        fill="none"
        stroke="#f0ecdf"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        className="draw draw--outline"
        d="M 295 348 V 160"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
        fill="none"
        stroke="#f0ecdf"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        className="draw draw--outline"
        d="M 295 160 Q 295 160 275 160 H 195 Q 175 160 175 160"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
        fill="none"
        stroke="#f0ecdf"
        strokeWidth="11"
        strokeLinecap="round"
      />

      <path
        className="draw draw--cap"
        d="M 196 152 H 274"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
        fill="none"
        stroke="#c9a14a"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        className="draw draw--cap"
        d="M 274 152 L 262 174 H 208 L 196 152"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
        fill="none"
        stroke="#c9a14a"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        className="draw draw--nozzle"
        d="M 216 116 H 238"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
        fill="none"
        stroke="#e8512c"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        className="draw draw--nozzle"
        d="M 238 116 L 234 152 H 220 L 216 116"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
        fill="none"
        stroke="#e8512c"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <path
        className="draw draw--label"
        d="M 205 226 H 275"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
        fill="none"
        stroke="#c9a14a"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        className="draw draw--label"
        d="M 205 254 H 255"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
        fill="none"
        stroke="#f0ecdf"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        className="draw draw--label"
        d="M 205 282 H 275"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
        fill="none"
        stroke="#c9a14a"
        strokeWidth="9"
        strokeLinecap="round"
      />

      <path
        className="draw draw--drip"
        d="M 206 362 V 378"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
        fill="none"
        stroke="#e8512c"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        className="draw draw--drip"
        d="M 244 364 V 376"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
        fill="none"
        stroke="#e8512c"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        className="draw draw--drip"
        d="M 284 362 V 372"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset="1"
        fill="none"
        stroke="#e8512c"
        strokeWidth="8"
        strokeLinecap="round"
      />

      <path className="pop" d="M 66 40 l 7 14 14 7 -14 7 -7 14 -7 -14 -14 -7 14 -7 Z" fill="#c9a14a" />
      <circle className="pop" cx="352" cy="118" r="6" fill="#e8512c" />
      <circle className="pop" cx="62" cy="232" r="4" fill="#f0ecdf" />
      <path className="pop" d="M 326 296 l 5 10 10 5 -10 5 -5 10 -5 -10 -10 -5 10 -5 Z" fill="#c9a14a" />
      <circle className="pop" cx="382" cy="244" r="5" fill="#e8512c" />
      <circle className="pop" cx="118" cy="322" r="4" fill="#c9a14a" />
      <circle className="pop" cx="302" cy="378" r="5" fill="#f0ecdf" />
      <circle className="pop" cx="200" cy="76" r="4" fill="#c9a14a" />
    </svg>
  );
};

export default SprayCan;
