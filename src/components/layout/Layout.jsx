import Navbar from './Navbar';
import Footer from './Footer';
import { NoiseOverlay } from '../ui/NoiseOverlay';

export default function Layout({ children }) {
  return (
    <>
      <NoiseOverlay />
      <Navbar />
      <main className="pt-[72px]">
        {children}
      </main>
      <Footer />
    </>
  );
}
