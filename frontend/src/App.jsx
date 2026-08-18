import { lazy, Suspense } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import ClickSpark from './components/ClickSpark';
import ColorBends from './components/ColorBends';
import './styles/index.css';

const About = lazy(() => import('./components/About'));
const Stack = lazy(() => import('./components/Stack'));
const Certificates = lazy(() => import('./components/Certificates'));
const CaseList = lazy(() => import('./components/CaseList'));
const Footer = lazy(() => import('./components/Footer'));

export default function App() {
  return (
    <ClickSpark sparkColor="#e8512c" sparkSize={12} sparkRadius={18} sparkCount={10} duration={450}>
      <div className="site-bg" aria-hidden="true">
        <ColorBends
          colors={['#d2561f', '#f47a1f', '#c9a14a']}
          rotation={-15}
          speed={0.1}
          scale={2}
          frequency={1.5}
          warpStrength={1}
          mouseInfluence={1}
          noise={0.15}
          parallax={0.25}
          iterations={1}
          intensity={0.6}
          bandWidth={2}
          transparent
        />
      </div>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Suspense fallback={null}>
          <About />
          <Stack />
          <Certificates />
          <CaseList />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </ClickSpark>
  );
}