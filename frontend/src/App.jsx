import { lazy, Suspense } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import ClickSpark from './components/ClickSpark';
import SectionBoundary from './components/SectionBoundary';
import './styles/index.css';

const ColorBends = lazy(() => import('./components/ColorBends'));

const About = lazy(() => import('./components/About'));
const Stack = lazy(() => import('./components/Stack'));
const Certificates = lazy(() => import('./components/Certificates'));
const CaseList = lazy(() => import('./components/CaseList'));
const Footer = lazy(() => import('./components/Footer'));

export default function App() {
  return (
    <ClickSpark sparkColor="#e8512c" sparkSize={12} sparkRadius={18} sparkCount={10} duration={450}>
      <div className="site-bg" aria-hidden="true">
        <SectionBoundary>
          <Suspense fallback={null}>
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
          </Suspense>
        </SectionBoundary>
      </div>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <SectionBoundary>
          <Suspense fallback={null}>
            <About />
            <Stack />
          </Suspense>
        </SectionBoundary>
        <SectionBoundary>
          <Suspense fallback={null}>
            <Certificates />
          </Suspense>
        </SectionBoundary>
        <SectionBoundary>
          <Suspense fallback={null}>
            <CaseList />
          </Suspense>
        </SectionBoundary>
      </main>
      <SectionBoundary>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </SectionBoundary>
    </ClickSpark>
  );
}