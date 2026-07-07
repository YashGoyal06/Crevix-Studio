import Navbar from './Navbar';
import Footer from './Footer';
import { NoiseOverlay } from '../ui/NoiseOverlay';
import { AmbientBackground } from '../ui/AmbientBackground';

export default function Layout({ children }) {
  return (
    <>
      <AmbientBackground />
      <NoiseOverlay />
      <Navbar />
      <main className="relative z-10 pt-0">
        {children}
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}
