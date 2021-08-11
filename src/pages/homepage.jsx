import { useEffect } from 'react';
import { connect } from 'react-redux';

import { clearSearchResults, clearSearchQuery } from '../redux/library/library.actions';

import { Divider } from '@chakra-ui/layout';

import Hero from '../components/hero-section';
import ExploreSection from '../components/explore-section';
import FeaturesSection from '../components/features-section';

const HomePage = ({ clearSearchQuery, clearSearchResults }) => {
  useEffect(() => {
    clearSearchResults();
    clearSearchQuery()
  }, []);

  return (
    <div>
      <Hero />
      <Divider />
      <ExploreSection />
      <Divider />
      <FeaturesSection />
    </div>
  )
};

const mapDispatchToProps = dispatch => ({
  clearSearchResults: () => dispatch(clearSearchResults()),
  clearSearchQuery: () => dispatch(clearSearchQuery())
});

export default connect(null, mapDispatchToProps)(HomePage);