import { Divider } from '@chakra-ui/layout';

import Hero from '../components/hero-section';
import ExploreSection from '../components/explore-section';
import FeaturesSection from '../components/features-section';

const Homepage = () => (
  <div>
    <Hero/>
    <Divider/>
    <ExploreSection/>
    <Divider/>
    <FeaturesSection/>
  </div>
);

export default Homepage;