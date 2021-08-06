import { Divider } from '@chakra-ui/layout';

import Hero from '../components/hero';
import ExploreSection from '../components/explore-section';

const Homepage = () => (
  <div>
    <Hero/>
    <Divider/>
    <ExploreSection/>
  </div>
);

export default Homepage;