import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Stack from './components/Stack';
import Certificates from './components/Certificates';
import CaseList from './components/CaseList';
import Footer from './components/Footer';
import ClickSpark from './components/ClickSpark';
import ColorBends from './components/ColorBends';
import './styles/index.css';

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
        <About />
        <Stack />
        <Certificates />
        <CaseList />
      </main>
      <Footer />
    </ClickSpark>
  );
}
