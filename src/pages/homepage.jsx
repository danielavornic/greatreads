import { Divider } from '@chakra-ui/layout';

import Hero from '../components/homepage/hero';
import FeaturesSection from '../components/homepage/features-section';

const HomePage = () => (
  <div>
    <Hero />
    <Divider />
    <FeaturesSection />
  </div>
);

export default HomePage;
