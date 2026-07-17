import Layout from '../components/layout/Layout';
import Meta from '../components/ui/Meta';
import HeroNew from '../components/sections/HeroNew';
import ServicesNew  from '../components/sections/ServicesNew';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import WhyUsNew from '../components/sections/WhyUsNew';
import Testimonials from '../components/sections/Testimonials';
export default function Home() {
  return (
    <Layout>
      <Meta 
        title="Premium Digital Studio" 
        description="Crevix Studio builds world-class digital experiences, SaaS dashboards, and authentic brand identities for elite clients."
      />
      <HeroNew />
      <ServicesNew />
      <FeaturedProjects />
      <WhyUsNew />
      <Testimonials />
    </Layout>
  );
}
