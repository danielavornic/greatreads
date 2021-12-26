import { Divider } from '@chakra-ui/layout';

import Hero from '../components/homepage/hero';
import FeaturesSection from '../components/homepage/features-section';

const HomePage = () => (
  <div>
    <Hero />
    <Divider mb={{ base: 20, md: 24 }} pt={{ base: 20, md: 24 }} />
    <FeaturesSection />
  </div>
);

export default HomePage;
