import Layout from '../components/layout/Layout';
import Hero from '../components/sections/Hero';
import ServicesGrid from '../components/sections/ServicesGrid';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import WhyUs from '../components/sections/WhyUs';
import Testimonials from '../components/sections/Testimonials';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <ServicesGrid />
      <FeaturedProjects />
      <WhyUs />
      <Testimonials />
    </Layout>
  );
}
