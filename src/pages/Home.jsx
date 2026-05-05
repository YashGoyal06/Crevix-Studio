import Layout from '../components/layout/Layout';
import Meta from '../components/ui/Meta';
import Hero from '../components/sections/Hero';
import ServicesGrid from '../components/sections/ServicesGrid';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import WhyUs from '../components/sections/WhyUs';
import Testimonials from '../components/sections/Testimonials';

export default function Home() {
  return (
    <Layout>
      <Meta 
        title="Premium Digital Studio" 
        description="Crevix Studio builds world-class digital experiences, SaaS dashboards, and authentic brand identities for elite clients."
      />
      <Hero />
      <ServicesGrid />
      <FeaturedProjects />
      <WhyUs />
      <Testimonials />
    </Layout>
  );
}
